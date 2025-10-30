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

  // --- ONE-TIME: create the leads table
  app.post("/api/dev/create-leads-table", async (_req, res) => {
    try {
      await query(`
        DROP TABLE IF EXISTS public.leads CASCADE;
        CREATE TABLE public.leads (
          lead_id VARCHAR(255) PRIMARY KEY,
          full_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          age INTEGER,
          location VARCHAR(255),
          interest VARCHAR(255),
          source VARCHAR(100),
          priority VARCHAR(50),
          status VARCHAR(50) DEFAULT 'new',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
        CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
      `);
      res.json({ ok: true, message: "Leads table created successfully" });
    } catch (e: any) {
      console.error("POST /api/dev/create-leads-table error:", e);
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
  // CLINIC API ENDPOINTS
  // =========================

  // Clinic login endpoint
  app.post("/api/clinic/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ 
          success: false, 
          error: "Username and password are required" 
        });
      }

      console.log('🔵 Processing clinic login for:', username);

      // Call n8n webhook for authentication
      const webhookPayload = {
        username,
        password
      };

      console.log('📤 Calling n8n webhook for clinic login:', webhookPayload);

      const webhookResponse = await fetch('https://n8nottobon.duckdns.org/webhook/clinic_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
      });

      console.log('🔵 Webhook response status:', webhookResponse.status);

      if (!webhookResponse.ok) {
        console.error('❌ Webhook failed:', webhookResponse.statusText);
        return res.status(401).json({ 
          success: false, 
          error: 'Login failed. Please check your credentials.' 
        });
      }

      const responseData = await webhookResponse.json();
      console.log('✅ n8n response:', responseData);

      // Check if login was successful based on n8n response
      // Expected response formats: 
      // - [{ "success": true }] (array format)
      // - { "success": true } (object format)
      let isSuccess = false;
      
      if (Array.isArray(responseData)) {
        // Handle array format: [{ "success": true }]
        if (responseData.length > 0 && responseData[0].success === true) {
          isSuccess = true;
        }
      } else if (typeof responseData === 'object' && responseData !== null) {
        // Handle object format: { "success": true }
        if (responseData.success === true) {
          isSuccess = true;
        }
      }

      console.log('🔍 Login success status:', isSuccess);

      if (isSuccess) {
        return res.json({ 
          success: true, 
          username,
          message: 'Login successful' 
        });
      } else {
        return res.status(401).json({ 
          success: false, 
          error: 'Login failed. Please check your credentials.' 
        });
      }

    } catch (error) {
      console.error("❌ Error in clinic login:", error);
      res.status(500).json({ 
        success: false, 
        error: "Login failed. Please check your credentials." 
      });
    }
  });

  // =========================
  // LEADS API ENDPOINTS
  // =========================

  // Unified leads endpoint with action-based routing
  app.post("/api/leads", async (req, res) => {
    try {
      const { action } = req.body;

      // FETCH action - get all leads
      if (action === "fetch") {
        const { rows } = await query(
          `SELECT lead_id, full_name, email, phone, age, location, interest, source, priority, status, created_at 
           FROM leads ORDER BY created_at DESC`
        );
        console.log('✅ Fetched leads:', rows.length);
        return res.json(rows);
      }

      // INSERT action - create new lead
      if (action === "insert") {
        const { full_name, last_name, email, phone, age, location, interest, source, priority } = req.body;

        // Call n8n webhook for insert
        const webhookPayload = {
          action: "insert",
          full_name,
          last_name: last_name || '',
          email,
          phone,
          age: age ? parseInt(age) : null,
          location: location || '',
          interest: interest || '',
          source: source || 'Website',
          priority: priority || 'Medium'
        };

        console.log('📤 Calling n8n webhook (insert):', webhookPayload);

        const webhookResponse = await fetch('https://n8n.ottobon.in/webhook/lead_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (!webhookResponse.ok) {
          throw new Error(`n8n webhook failed: ${webhookResponse.statusText}`);
        }

        const leadData = await webhookResponse.json();
        console.log('✅ n8n response (insert):', leadData);

        // Store in database
        await query(`
          INSERT INTO leads (
            lead_id, full_name, email, phone, age, location, 
            interest, source, priority, status, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
          ON CONFLICT (lead_id) DO NOTHING
        `, [
          leadData.lead_id,
          leadData.full_name,
          leadData.email,
          leadData.phone,
          leadData.age,
          leadData.location || '',
          leadData.interest,
          leadData.source,
          leadData.priority,
          'new'
        ]);

        console.log('✅ Lead stored in database');
        return res.json(leadData);
      }

      // UPDATE action - update existing lead
      if (action === "update") {
        const { lead_id, full_name, last_name, email, phone, age, location, interest, source, priority } = req.body;

        // Call n8n webhook for update
        const webhookPayload = {
          action: "update",
          lead_id,
          full_name,
          last_name: last_name || '',
          email,
          phone,
          age: age ? parseInt(age) : null,
          location: location || '',
          interest: interest || '',
          source: source || 'Website',
          priority: priority || 'Medium'
        };

        console.log('📤 Calling n8n webhook (update):', webhookPayload);

        const webhookResponse = await fetch('https://n8n.ottobon.in/webhook/lead_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (!webhookResponse.ok) {
          throw new Error(`n8n webhook failed: ${webhookResponse.statusText}`);
        }

        const leadData = await webhookResponse.json();
        console.log('✅ n8n response (update):', leadData);

        // Update in database
        await query(`
          UPDATE leads SET
            full_name = $1,
            email = $2,
            phone = $3,
            age = $4,
            location = $5,
            interest = $6,
            source = $7,
            priority = $8,
            updated_at = NOW()
          WHERE lead_id = $9
        `, [
          leadData.full_name,
          leadData.email,
          leadData.phone,
          leadData.age,
          leadData.location || '',
          leadData.interest,
          leadData.source,
          leadData.priority,
          leadData.lead_id
        ]);

        console.log('✅ Lead updated in database');
        return res.json(leadData);
      }

      return res.status(400).json({ error: "Invalid action. Use 'fetch', 'insert', or 'update'" });

    } catch (error) {
      console.error("Error in leads API:", error);
      res.status(500).json({ error: "Failed to process lead request" });
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