// server/routes.ts
import type { Express } from "express";
import { db } from "@db";
import { createServer, type Server } from "http";
import { query } from "./db";
import { runMedcyDoctorsScrape } from "./scraper/medcyDoctors";

// Dev key for scraping - use environment variable in production
const DEV_SCRAPE_KEY = process.env.DEV_SCRAPE_KEY || "dev-scrape-2025";

export async function registerRoutes(app: Express): Promise<Server> {
  // =========================
  // API ROUTES (prefix with /api)
  // =========================

  // Health check to verify DB connectivity
  app.get("/api/health/db", async (_req, res) => {
    try {
      const r = await query<{ now: string }>("SELECT NOW() as now");
      res.json({ ok: true, now: r.rows[0].now });
    } catch (e: any) {
      console.error("DB error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // --- DEBUG: confirm SSL options on the pool
  app.get("/api/health/db/ssl", (_req, res) => {
    // @ts-ignore access internal
    const opts = (pool as any).options || {};
    res.json({ hasSsl: !!opts.ssl, rejectUnauthorized: opts.ssl?.rejectUnauthorized ?? null });
  });

  // --- DEBUG: inspect DATABASE_URL environment variable
  app.get("/api/health/db/env", (_req, res) => {
    const url = process.env.DATABASE_URL || "";
    try {
      const u = new URL(url);
      res.json({
        has_DATABASE_URL: !!url,
        protocol: u.protocol.replace(":", ""),
        host: u.hostname,
        port: u.port,
        db: u.pathname.replace("/", ""),
        user: u.username,
      });
    } catch {
      res.json({ has_DATABASE_URL: !!url, raw: url || "(empty)" });
    }
  });

  // --- DEBUG: what DB am I connected to?
  app.get("/api/health/db/info", async (_req, res) => {
    try {
      const { rows } = await query(`
        SELECT current_database() AS db,
               current_user AS usr,
               current_schema() AS sch
      `);
      res.json(rows[0]);
    } catch (e: any) {
      console.error("GET /api/health/db/info error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // --- DEBUG: list public tables
  app.get("/api/health/db/tables", async (_req, res) => {
    try {
      const { rows } = await query(
        `SELECT table_schema, table_name
         FROM information_schema.tables
         WHERE table_schema = 'public'
         ORDER BY table_name;`
      );
      res.json(rows);
    } catch (e: any) {
      console.error("GET /api/health/db/tables error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // --- ONE-TIME: create the table in *this* DB if missing
  app.post("/api/dev/create-scraped-table", async (_req, res) => {
    try {
      await query(`
        CREATE SCHEMA IF NOT EXISTS public;
        CREATE TABLE IF NOT EXISTS public.scraped_blogs (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          excerpt TEXT,
          content_html TEXT,
          source_url TEXT,
          image_url TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_scraped_blogs_slug ON public.scraped_blogs(slug);
      `);
      res.json({ ok: true });
    } catch (e: any) {
      console.error("POST /api/dev/create-scraped-table error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // --- Middleware to require a secret key
  const requireKey = (req: any, res: any, next: any) => {
    const key = (req.query.key as string) || (req.headers["x-api-key"] as string);
    if (process.env.SCRAPE_KEY && key === process.env.SCRAPE_KEY) return next();
    return res.status(403).json({ ok: false, error: "forbidden" });
  };

  // --- Scrape endpoint (GET for external schedulers, secured with requireKey)
  app.get("/api/dev/scrape/medcy", requireKey, async (req, res) => {
    try {
      const max = Number(req.query.max ?? "30");
      const out = await runMedcyScrape({ max: isNaN(max) ? 30 : max });
      res.json({ ok: true, ...out });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // --- DEV: scrape medcy doctors now
  app.get("/api/dev/scrape/medcy-doctors", requireKey, async (req, res) => {
    try {
      const max = Number(req.query.max ?? "50");
      const out = await runMedcyDoctorsScrape({ max: isNaN(max) ? 50 : max });
      res.json({ ok: true, ...out });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // =========================
  // DOCTOR API ENDPOINTS
  // =========================

  // PUBLIC: list doctors (simplified card list for your Experts page)
  app.get("/api/doctors", async (req, res) => {
    try {
      const { rows } = await query(
        `SELECT id, source_site, slug, name, designation, image_url
           FROM public.scraped_doctors
          WHERE source_site = 'medcyivf.in'
          ORDER BY name ASC`
      );
      res.json({ ok: true, results: rows });
    } catch (e: any) {
      console.error("GET /api/doctors error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // PUBLIC: doctor detail by slug
  app.get("/api/doctors/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const { rows } = await query(
        `SELECT id, source_site, slug, name, designation, specialties, qualifications,
                experience_years, languages, location, image_url, profile_url, about_html
           FROM public.scraped_doctors
          WHERE source_site = 'medcyivf.in' AND slug = $1
          LIMIT 1`,
        [slug]
      );
      if (rows.length === 0) return res.status(404).json({ ok: false, error: "not found" });
      res.json({ ok: true, doctor: rows[0] });
    } catch (e: any) {
      console.error("GET /api/doctors/:slug error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // =========================
  // BLOG API ENDPOINTS
  // =========================

  // 1) List blogs for the card grid
  app.get("/api/blogs", async (req, res) => {
    try {
      // optional pagination
      const limit = Math.min(parseInt(String(req.query.limit || "24"), 10), 100);
      const offset = Math.max(parseInt(String(req.query.offset || "0"), 10), 0);

      const { rows } = await query(
        `
        SELECT slug, title, COALESCE(excerpt, '') AS excerpt, image_url, created_at
        FROM public.scraped_blogs
        ORDER BY id DESC
        LIMIT $1 OFFSET $2
        `,
        [limit, offset]
      );
      res.json(rows);
    } catch (e: any) {
      console.error("GET /api/blogs error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // 2) Single blog by slug
  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const { rows } = await query(
        `
        SELECT id, slug, title, excerpt, content_html, source_url, created_at
        FROM public.scraped_blogs
        WHERE slug = $1
        LIMIT 1
        `,
        [req.params.slug]
      );

      if (!rows.length) return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    } catch (e: any) {
      console.error("GET /api/blogs/:slug error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // (Example) existing user storage routes could go here, using `storage`
  // app.get("/api/users/:id", async (req, res) => { ... })

  // =========================
  // HTTP SERVER
  // =========================
  const httpServer = createServer(app);
  return httpServer;
}