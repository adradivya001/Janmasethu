// server/scraper/medcyDoctors.ts
import { fetch } from "undici";
import * as cheerio from "cheerio";
import { XMLParser } from "fast-xml-parser";
import { createHash } from "crypto";
import { query } from "../db";

const SOURCE = "medcyivf.in";
const AGENT = "JanmaSethuBot/1.0 (+contact: your-email@example.com)";
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function sha(s: string) {
  return createHash("sha256").update((s || "").trim()).digest("hex");
}

function normalize(url: string) {
  try {
    const u = new URL(url);
    u.hash = "";
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(p => u.searchParams.delete(p));
    return u.toString();
  } catch {
    return url;
  }
}

async function getHtml(url: string) {
  const r = await fetch(url, { headers: { "user-agent": AGENT } });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return await r.text();
}

function isDoctorProfileUrl(url: string) {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith("medcyivf.in")) return false;
    // Accept typical WP patterns like /doctors/<slug>/, /doctor/<slug>/, /team/<slug>/
    const p = u.pathname.toLowerCase();
    return /\/doctor[s]?\/[^/]+\/?$/.test(p) || /\/team\/[^/]+\/?$/.test(p) || /\/our-doctors?\/[^/]+\/?$/.test(p);
  } catch {
    return false;
  }
}

async function collectFromSitemap(max = 50) {
  const start = "https://medcyivf.in/sitemap_index.xml";
  const xmlTxt = await getHtml(start);
  const parser = new XMLParser({ ignoreAttributes: false });
  const index = parser.parse(xmlTxt);

  const sitemaps = index.sitemapindex?.sitemap ?? [];
  const arr = Array.isArray(sitemaps) ? sitemaps : [sitemaps];

  const urls = new Set<string>();
  for (const sm of arr) {
    const loc = sm.loc;
    if (!loc) continue;
    // read each sub-sitemap and collect only doctor profile links
    const smXml = await getHtml(loc);
    const doc = parser.parse(smXml);
    const urlset = doc.urlset?.url ?? [];
    const list = Array.isArray(urlset) ? urlset : [urlset];
    for (const u of list) {
      const loc2 = u.loc;
      if (typeof loc2 === "string" && isDoctorProfileUrl(loc2)) {
        urls.add(normalize(loc2));
      }
    }
    if (urls.size >= max) break;
    await sleep(300);
  }
  return Array.from(urls).slice(0, max);
}

// Fallback: try to collect from some likely listing pages if sitemap misses
async function collectFromListings(max = 50) {
  const candidates = [
    "https://medcyivf.in/doctors/",
    "https://medcyivf.in/our-doctors/",
    "https://medcyivf.in/team/",
    "https://medcyivf.in/medical-team/",
  ];
  const urls = new Set<string>();
  for (const page of candidates) {
    try {
      const html = await getHtml(page);
      const $ = cheerio.load(html);
      $("a[href]").each((_i, a) => {
        const href = $(a).attr("href");
        if (href && isDoctorProfileUrl(href)) urls.add(normalize(href));
      });
    } catch { /* ignore */ }
  }
  return Array.from(urls).slice(0, max);
}

type Doctor = {
  source_site: string;            // "medcyivf.in"
  slug: string;
  name: string;
  designation?: string | null;
  specialties?: string[] | null;
  qualifications?: string | null;
  experience_years?: number | null;
  languages?: string[] | null;
  location?: string | null;
  image_url?: string | null;
  profile_url: string;
  about_html?: string | null;
};

function extractSlug(url: string) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function parseExperience(text: string): number | null {
  const m = text.match(/(\d+)\s*\+?\s*year/i);
  return m ? parseInt(m[1], 10) : null;
}

async function scrapeDoctor(url: string): Promise<Doctor> {
  const html = await getHtml(url);
  const $ = cheerio.load(html);

  // Try common WP structures
  const name =
    $("h1.entry-title").first().text().trim() ||
    $("h1").first().text().trim() ||
    $('meta[property="og:title"]').attr("content") ||
    $("title").text().trim();

  // Often designation is a subtitle, small, or first strong near title
  const possibleDesignation =
    $(".entry-content strong").first().text().trim() ||
    $(".entry-content em").first().text().trim() ||
    $(".entry-subtitle").first().text().trim() ||
    $(".subtitle").first().text().trim() ||
    null;

  // About/Content (remove scripts/styles)
  const content = $(".entry-content").first().clone();
  if (content.length === 0) {
    // fallback to a generic post-content wrapper
    const fallback = $(".post-content, .content, article").first().clone();
    fallback.find("script, style, noscript").remove();
    const about_html = fallback.html() || null;
    // OG image or first image
    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      fallback.find("img").first().attr("src") ||
      null;

    return {
      source_site: SOURCE,
      slug: extractSlug(url),
      name,
      designation: possibleDesignation,
      specialties: null,
      qualifications: null,
      experience_years: null,
      languages: null,
      location: null,
      image_url: image,
      profile_url: normalize(url),
      about_html,
    };
  }

  // remove junk/interactive bits we don't want on our site
  content.find(`
    script, style, noscript,
    form, iframe, button, select, input, textarea,
    .appointment, [class*="appoint"], [id*="appoint"],
    .elementor-widget-form, .wpcf7, .g-recaptcha, .grecaptcha-badge,
    .wpforms-container, .booking, .book-appointment,
    .hs-form, .mktoForm, .contact-form
  `).remove();

  // Also: if there is any section whose heading contains "Appointment", drop that section
  content.find("h2,h3,h4").each((_i, h) => {
    const $h = $(h);
    const t = $h.text().toLowerCase();
    if (t.includes("appointment")) {
      // remove the heading and everything until the next heading (common WP layout)
      const toRemove = [$h.get(0)];
      let next = $h.next();
      while (next.length && !/H2|H3|H4/.test(next[0].tagName)) {
        toRemove.push(next.get(0));
        next = next.next();
      }
      toRemove.forEach(el => $(el).remove());
    }
  });

  // final safety: drop any element that has a submit button inside
  content.find(":has(button[type='submit']), :has(input[type='submit'])").remove();

  // Finally remove any empty wrappers left behind
  content.find("*").each((_i, el) => {
    const $el = $(el);
    if (!$el.text().trim() && $el.children().length === 0 && !$el.is("img,figure")) {
      $el.remove();
    }
  });

  // Pull specialties/qualifications heuristically (lists/labels common in WP profiles)
  const textContent = content.text().trim();
  const experience_years = parseExperience(textContent);

  // Try to parse headings like "Specialization", "Expertise", "Qualifications"
  const specialties: string[] = [];
  content.find("h2,h3,h4").each((_i, h) => {
    const head = $(h).text().toLowerCase().trim();
    if (/special/i.test(head) || /expert/i.test(head)) {
      const list = $(h).nextUntil("h2,h3,h4").find("li").map((_j, li) => $(li).text().trim()).get();
      if (list.length) specialties.push(...list);
    }
  });

  let qualifications: string | null = null;
  content.find("h2,h3,h4").each((_i, h) => {
    const head = $(h).text().toLowerCase().trim();
    if (/qualification|education/.test(head)) {
      const txt = $(h).nextUntil("h2,h3,h4").text().trim().replace(/\s+/g, " ");
      if (txt) qualifications = txt;
    }
  });

  const image =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content") ||
    content.find("img").first().attr("src") ||
    null;

  const about_html = content.html() || null;

  return {
    source_site: SOURCE,
    slug: extractSlug(url),
    name,
    designation: possibleDesignation,
    specialties: specialties.length ? specialties : null,
    qualifications,
    experience_years,
    languages: null,
    location: null,
    image_url: image,
    profile_url: normalize(url),
    about_html,
  };
}

async function upsertDoctor(d: Doctor) {
  const h = sha((d.about_html || "") + "|" + (d.name || "") + "|" + (d.designation || ""));

  await query(
    `
    INSERT INTO public.scraped_doctors
      (source_site, slug, name, designation, specialties, qualifications, experience_years, languages, location, image_url, profile_url, about_html, content_hash, last_scraped_at, last_changed_at)
    VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,NOW(),NOW())
    ON CONFLICT (source_site, slug) DO UPDATE
    SET
      name = EXCLUDED.name,
      designation = EXCLUDED.designation,
      specialties = EXCLUDED.specialties,
      qualifications = EXCLUDED.qualifications,
      experience_years = EXCLUDED.experience_years,
      languages = EXCLUDED.languages,
      location = EXCLUDED.location,
      image_url = EXCLUDED.image_url,
      profile_url = EXCLUDED.profile_url,
      last_scraped_at = NOW(),
      about_html = CASE
        WHEN public.scraped_doctors.content_hash IS DISTINCT FROM EXCLUDED.content_hash
        THEN EXCLUDED.about_html ELSE public.scraped_doctors.about_html END,
      content_hash = CASE
        WHEN public.scraped_doctors.content_hash IS DISTINCT FROM EXCLUDED.content_hash
        THEN EXCLUDED.content_hash ELSE public.scraped_doctors.content_hash END,
      last_changed_at = CASE
        WHEN public.scraped_doctors.content_hash IS DISTINCT FROM EXCLUDED.content_hash
        THEN NOW() ELSE public.scraped_doctors.last_changed_at END
    `,
    [
      d.source_site,
      d.slug,
      d.name,
      d.designation,
      d.specialties,
      d.qualifications,
      d.experience_years,
      d.languages,
      d.location,
      d.image_url,
      d.profile_url,
      d.about_html,
      h,
    ]
  );
}

export async function runMedcyDoctorsScrape({ max = 50 }: { max?: number } = {}) {
  let urls = await collectFromSitemap(max);
  if (urls.length === 0) {
    urls = await collectFromListings(max);
  }

  const results: Array<{ url: string; ok: boolean; error?: string }> = [];

  for (const url of urls) {
    try {
      const doc = await scrapeDoctor(url);
      await upsertDoctor(doc);
      results.push({ url, ok: true });
    } catch (e: any) {
      results.push({ url, ok: false, error: e.message });
    }
    await sleep(1000); // polite delay
  }

  return { count: results.length, results };
}
