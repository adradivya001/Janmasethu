// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";  // your in-memory user storage (unchanged)
import { query } from "./db";         // our Postgres helper from server/db.ts

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

  // 1) List blogs for the card grid
  app.get("/api/blogs", async (req, res) => {
    try {
      // optional pagination
      const limit = Math.min(parseInt(String(req.query.limit || "24"), 10), 100);
      const offset = Math.max(parseInt(String(req.query.offset || "0"), 10), 0);

      const { rows } = await query(
        `
        SELECT slug, title, COALESCE(excerpt, '') AS excerpt, image_url, created_at
        FROM scraped_blogs
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
        SELECT id, slug, title, excerpt, content_html, image_url, source_url, created_at
        FROM scraped_blogs
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
