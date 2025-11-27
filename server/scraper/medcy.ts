// server/scraper/medcy.ts
import { fetch } from "undici";
import * as cheerio from "cheerio";
import { createHash } from "crypto";

type ScrapedPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string;
  image_url: string | null;
  source_url: string;
};

const SLEEP_MS = 1200; // be polite to their server

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function hash(html: string) {
  return createHash("sha256").update(html.trim()).digest("hex");
}

function isMedcyPostUrl(url: string) {
  try {
    const u = new URL(url);
    // must be on medcyivf.in
    if (!/\.?medcyivf\.in$/i.test(u.hostname)) return false;
    // path must be like /blog/<slug>/ (one segment after /blog), not /blog/ itself
    const parts = u.pathname.split("/").filter(Boolean);
    const i = parts.indexOf("blog");
    return i >= 0 && parts.length === i + 2; // exactly /blog/<slug>
  } catch {
    return false;
  }
}

function getSlugFromUrl(url: string) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1]; // last segment
  } catch {
    return url;
  }
}

async function getHtml(url: string): Promise<string> {
  const r = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; JanmaSethuScraper/1.0; +https://example.com)",
      "accept": "text/html,application/xhtml+xml",
    },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return await r.text();
}

/** Extracts a single post page into ScrapedPost */
export async function scrapePost(postUrl: string): Promise<ScrapedPost> {
  const html = await getHtml(postUrl);
  const $ = cheerio.load(html);

  // Common WordPress selectors (try several fallbacks)
  const title =
    $("h1.entry-title").first().text().trim() ||
    $('meta[property="og:title"]').attr("content") ||
    $("title").text().trim();

  // main content
  const content =
    $(".entry-content").first() ||
    $(".post-content").first() ||
    $(".single-post .content").first() ||
    $("article").first();

  // featured/og image
  const ogImg =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content") ||
    content.find("img").first().attr("src") ||
    null;

  // Build a short excerpt (first paragraph text)
  const firstP =
    content.find("p").first().text().trim() ||
    $("p").first().text().trim() ||
    "";
  const excerpt = firstP ? firstP.slice(0, 240) : null;

  // Clean up content HTML (optional minimal)
  // Remove script/style
  content.find("script, style, noscript").remove();
  const content_html = content.html() || "";

  const slug = getSlugFromUrl(postUrl);

  return {
    title,
    slug,
    excerpt,
    content_html,
    image_url: ogImg || null,
    source_url: postUrl,
  };
}

/** Crawls the listing pages and returns a list of post URLs (deduped) */
export async function collectPostUrls(startUrl = "https://medcyivf.in/blog/", max = 12): Promise<string[]> {
  const html = await getHtml(startUrl);
  const $ = cheerio.load(html);

  const urls = new Set<string>();

  $("a").each((_i, a) => {
    const href = $(a).attr("href");
    if (href && href.startsWith("http") && isMedcyPostUrl(href)) {
      urls.add(href.split("#")[0]);
    }
  });

  return Array.from(urls).slice(0, max);
}

/** Upsert into sakhi_scraped_blogs by source_url */
async function upsert(post: ScrapedPost) {
  const content_hash = hash(post.content_html);
  const { pool } = await import("../db");

  await pool.query(
    `INSERT INTO sakhi_scraped_blogs
    (source_site, slug, title, excerpt, image_url, content_html, source_url, content_hash, created_at, last_scraped_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    ON CONFLICT (source_url) DO UPDATE
    SET title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        image_url = EXCLUDED.image_url,
        content_html = EXCLUDED.content_html,
        content_hash = EXCLUDED.content_hash,
        last_scraped_at = NOW()`,
    [
      'medcyivf.in',
      post.slug,
      post.title,
      post.excerpt,
      post.image_url,
      post.content_html,
      post.source_url,
      content_hash
    ]
  );
}

/** Main entry: crawl listing → scrape each post → upsert */
export async function runMedcyScrape({ max = 8 }: { max?: number } = {}) {
  const list = await collectPostUrls("https://medcyivf.in/blog/", max);
  const results: { url: string; ok: boolean; error?: string }[] = [];

  for (const url of list) {
    try {
      const post = await scrapePost(url);
      await upsert(post);
      results.push({ url, ok: true });
    } catch (e: any) {
      console.error(`Failed to scrape ${url}:`, e.message);
      results.push({ url, ok: false, error: e.message || String(e) });
    }
    await sleep(SLEEP_MS);
  }

  return { count: results.length, results };
}
