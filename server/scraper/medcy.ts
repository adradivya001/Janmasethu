// server/scraper/medcy.ts
import { fetch } from "undici";
import * as cheerio from "cheerio";
import { createHash } from "crypto";
import { query } from "../db";

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

  // Common WP blog listing anchors
  $("h2.entry-title a, article a[rel='bookmark'], .post h2 a, .blog a.more-link").each((_i, a) => {
    const href = $(a).attr("href");
    if (href && href.startsWith("http") && href.includes("/blog/")) {
      urls.add(href.split("#")[0]);
    }
  });

  // Also try general article links under /blog/
  $("a").each((_i, a) => {
    const href = $(a).attr("href");
    if (href && href.startsWith("http") && href.includes("/blog/")) {
      urls.add(href.split("#")[0]);
    }
  });

  return Array.from(urls).slice(0, max);
}

/** Upsert into public.scraped_blogs by slug */
async function upsert(post: ScrapedPost) {
  const content_hash = hash(post.content_html);

  await query(
    `
    INSERT INTO public.scraped_blogs
      (title, slug, excerpt, content_html, image_url, source_url, content_hash, last_scraped_at, last_changed_at)
    VALUES
      ($1,$2,$3,$4,$5,$6,$7, NOW(), NOW())
    ON CONFLICT (slug) DO UPDATE
    SET
      -- only rewrite content if hash changed
      title         = EXCLUDED.title,
      excerpt       = EXCLUDED.excerpt,
      image_url     = EXCLUDED.image_url,
      source_url    = EXCLUDED.source_url,
      last_scraped_at = NOW(),
      -- update these only when new content is different
      content_html  = CASE
                        WHEN public.scraped_blogs.content_hash IS DISTINCT FROM EXCLUDED.content_hash
                        THEN EXCLUDED.content_html
                        ELSE public.scraped_blogs.content_html
                      END,
      content_hash  = CASE
                        WHEN public.scraped_blogs.content_hash IS DISTINCT FROM EXCLUDED.content_hash
                        THEN EXCLUDED.content_hash
                        ELSE public.scraped_blogs.content_hash
                      END,
      last_changed_at = CASE
                        WHEN public.scraped_blogs.content_hash IS DISTINCT FROM EXCLUDED.content_hash
                        THEN NOW()
                        ELSE public.scraped_blogs.last_changed_at
                      END
    `,
    [
      post.title,
      post.slug,
      post.excerpt,
      post.content_html,
      post.image_url,
      post.source_url,
      content_hash,
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
      results.push({ url, ok: false, error: e.message || String(e) });
    }
    await sleep(SLEEP_MS);
  }

  return { count: results.length, results };
}
