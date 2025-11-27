
import { supabase } from "../supabaseClient";
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeDoctors() {
  const doctorUrls = [
    "https://medcyivf.in/doctors/dr-b-sireesha-rani/",
    "https://medcyivf.in/doctors/dr-v-padmja/",
    "https://medcyivf.in/doctors/dr-y-l-narasimha-rao/",
    "https://medcyivf.in/doctors/dr-srividya-chowdary/",
    "https://medcyivf.in/doctors/dr-elati-sindoori-reddy/",
    "https://medcyivf.in/doctors/dr-madhuri-sambangi/",
    "https://medcyivf.in/doctors/dr-mrudula-karri/",
    "https://medcyivf.in/doctors/dr-pavani/"
  ];

  const results: any[] = [];

  for (const url of doctorUrls) {
    try {
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);

      // Extract basic info
      const name = $("h1").text().trim() || $(".doctor-name").text().trim();
      const designation = $(".doctor-designation, .doctor-title").text().trim();
      const profile_image = $(".doctor-img img").attr("src") || $("img").first().attr("src") || null;
      
      // Extract content
      const contentHtml = $(".doctor-content, .entry-content").first().clone();
      contentHtml.find("script, style, noscript").remove();
      const about_html = contentHtml.html() || null;

      // Extract slug from URL
      const slug = url.split("/").filter(Boolean).pop() || "";

      // Try to extract specialties from content
      let specialties: string[] = [];
      $(".specialties, .doctor-specialties").find("li").each((_i, el) => {
        const spec = $(el).text().trim();
        if (spec) specialties.push(spec);
      });

      const doctorData = {
        source_site: "medcyivf.in",
        slug,
        name,
        designation: designation || null,
        specialties: specialties.length > 0 ? specialties : null,
        qualifications: null,
        experience_years: null,
        languages: null,
        location: null,
        image_url: profile_image,
        profile_url: url,
        about_html,
      };

      // ✅ INSERT INTO SUPABASE with proper conflict handling
      const { error } = await supabase
        .from("sakhi_scraped_doctors")
        .upsert(doctorData, { 
          onConflict: "source_site,slug",
          ignoreDuplicates: false 
        });

      results.push({
        url,
        ok: !error,
        error: error?.message || null,
        doctor: error ? null : name
      });

    } catch (err: any) {
      results.push({
        url,
        ok: false,
        error: err.message
      });
    }

    // Be polite to the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return { success: true, count: results.length, results };
}
