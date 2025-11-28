
// server/scraper/doctors.ts
import axios from "axios";
import * as cheerio from "cheerio";
import crypto from "crypto";
import { supabase } from "../supabaseClient";

const MEDCY_BASE = "https://medcyivf.in";

function hashContent(html: string) {
  return crypto.createHash("sha256").update(html || "").digest("hex");
}

async function getDoctorUrls(): Promise<string[]> {
  const archiveUrl = `${MEDCY_BASE}/doctors/`;
  const res = await axios.get(archiveUrl);
  const $ = cheerio.load(res.data);

  const urls = new Set<string>();

  $("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.includes("/doctors/") && href !== "/doctors/") {
      const full = href.startsWith("http") ? href : MEDCY_BASE + href;
      urls.add(full.split("#")[0]);
    }
  });

  return Array.from(urls);
}

async function scrapeDoctor(url: string) {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const name = $(".doctor-title h1, h1.entry-title").first().text().trim();
  const designation = $(".doctor-title h2").first().text().trim();

  const image_url =
    $(".doctor-img img").attr("src") ||
    $(".wp-post-image").attr("src") ||
    "";

  const specialties: string[] = [];
  $(".doctor-details li")
    .filter((_, el) => $(el).text().toLowerCase().includes("special"))
    .each((_, el) => {
      specialties.push($(el).text().trim());
    });

  const qualifications = $(".doctor-details li")
    .filter((_, el) => $(el).text().toLowerCase().includes("mbbs") ||
      $(el).text().toLowerCase().includes("md") ||
      $(el).text().toLowerCase().includes("dnb"))
    .map((_, el) => $(el).text().trim())
    .get()
    .join(" | ");

  const about_html = $(".doctor-biography, .entry-content").html() || "";

  const slug = url.replace(MEDCY_BASE, "").replace(/^\/+|\/+$/g, "");
  const content_hash = hashContent(about_html + name + designation);

  return {
    source_site: "medcyivf.in",
    slug,
    name,
    designation,
    specialties,
    qualifications,
    experience_years: null, // could be parsed later
    languages: [],
    location: "",
    image_url,
    profile_url: url,
    about_html,
    content_hash,
    last_scraped_at: new Date().toISOString(),
  };
}

export async function scrapeAndStoreDoctors(limit?: number) {
  const urls = await getDoctorUrls();
  const selected = limit ? urls.slice(0, limit) : urls;

  const results: { url: string; ok: boolean; error?: string }[] = [];

  for (const url of selected) {
    try {
      const doc = await scrapeDoctor(url);

      const { error } = await supabase
        .from("sakhi_scraped_doctors")
        .upsert(doc, {
          onConflict: "source_site,slug",
        });

      if (error) {
        console.error("DB error for", url, error.message);
        results.push({ url, ok: false, error: error.message });
      } else {
        results.push({ url, ok: true });
      }

      await new Promise((r) => setTimeout(r, 800)); // polite delay
    } catch (e: any) {
      console.error("Scrape error for", url, e.message);
      results.push({ url, ok: false, error: e.message });
    }
  }

  return {
    success: true,
    inserted: {
      count: results.filter((r) => r.ok).length,
      results,
    },
  };
}
