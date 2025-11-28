// server/routes.ts
import type { Express } from "express";
import { db } from "@db";
import { createServer, type Server } from "http";
import { query } from "./db";
import { runMedcyDoctorsScrape } from "./scraper/medcyDoctors";
import { scrapeAndStoreDoctors } from "./scraper/doctors";
import { scrapeAndStoreBlogs } from "./scraper/medcy";
import { supabase } from "./supabaseClient";

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

  // --- DEBUG: inspect Supabase environment variables
  app.get("/api/health/db/env", (_req, res) => {
    res.json({
      has_SUPABASE_URL: !!process.env.SUPABASE_URL,
      has_SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
    });
  });

  // --- DEBUG: what DB am I connected to?
  app.get("/api/health/db/info", async (_req, res) => {
    try {
      const { error } = await supabase
        .from("sakhi_scraped_blogs")
        .select("id")
        .limit(1);

      if (error) {
        return res.status(500).json({ ok: false, error: error.message });
      }

      res.json({ ok: true, via: "supabase" });
    } catch (e: any) {
      console.error("GET /api/health/db/info error:", e);
      res.status(500).json({ ok: false, error: e.message });
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

  // Helper to check scrape key (returns boolean for inline checks)
  function checkScrapeKey(req: any, res: any): boolean {
    const key = req.query.key;
    if (!key || key !== process.env.SCRAPE_KEY) {
      res.status(401).json({ error: "unauthorized" });
      return false;
    }
    return true;
  }

  // --- Scrape endpoint (GET for external schedulers, secured with requireKey)
  app.get("/api/dev/scrape/medcy", requireKey, async (req, res) => {
    try {
      const { runMedcyScrape } = await import("./scraper/medcy");
      const max = Number(req.query.max ?? "8");
      const out = await runMedcyScrape({ max: isNaN(max) ? 8 : max });
      res.json({ ok: true, ...out });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message });
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

  // MANUAL / CRON: scrape doctors from Medcy
  app.get("/api/scrape/doctors", async (req, res) => {
    if (!checkScrapeKey(req, res)) return;
    try {
      const max = req.query.max ? Number(req.query.max) : undefined;
      const result = await scrapeAndStoreDoctors(max);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // MANUAL / CRON: scrape blogs from Medcy
  app.get("/api/scrape/blogs", async (req, res) => {
    if (!checkScrapeKey(req, res)) return;
    try {
      const max = req.query.max ? Number(req.query.max) : undefined;
      const result = await scrapeAndStoreBlogs(max);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Alternative route: Scrape doctors using axios/cheerio approach
  app.get("/api/scrape/doctors-v2", requireKey, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const result = await scrapeAndStoreDoctors(limit);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // POST endpoint: Manual trigger for doctor scraping
  app.post("/api/scrape/doctors", async (req, res) => {
    if (!checkScrapeKey(req, res)) return;
    try {
      const { max } = req.body;
      const result = await scrapeAndStoreDoctors(max);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // POST endpoint: Manual trigger for blog scraping
  app.post("/api/scrape/blogs", async (req, res) => {
    if (!checkScrapeKey(req, res)) return;
    try {
      const { max } = req.body;
      const result = await scrapeAndStoreBlogs(max);
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- DEV: strip appointment forms from existing database records (run once)
  app.post("/api/dev/doctors/strip-appointment", requireKey, async (req, res) => {
    try {
      const { stripAppointment } = await import("./scraper/doctorSanitizer");
      const { rows } = await query(
        "SELECT id, about_html FROM public.scraped_doctors WHERE source_site = 'medcyivf.in'"
      );

      let updated = 0;
      for (const row of rows) {
        const cleaned = stripAppointment(row.about_html || "");
        if (cleaned !== row.about_html) {
          await query(
            "UPDATE public.scraped_doctors SET about_html = $1, last_changed_at = NOW() WHERE id = $2",
            [cleaned, row.id]
          );
          updated++;
        }
      }

      res.json({ ok: true, updated, total: rows.length });
    } catch (e: any) {
      console.error("POST /api/dev/doctors/strip-appointment error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // =========================
  // STORIES API ENDPOINTS
  // =========================

  // Handle CORS preflight
  app.options("/api/success-stories", (_req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send();
  });

  // Get all stories
  app.get("/api/success-stories", async (_req, res) => {
    try {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      const { data, error } = await supabase
        .from("sakhi_success_stories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error /api/success-stories:", error);
        return res.status(500).json({ ok: false, error: error.message });
      }

      res.json(data ?? []);
    } catch (e: any) {
      console.error("GET /api/success-stories error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // Submit a new story
  app.post("/api/success-stories", async (req, res) => {
    try {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      const {
        name,
        location,
        duration,
        challenges,
        emotions,
        emotionDetails,
        treatments,
        outcome,
        outcomeDetails,
        messageToOthers,
        uploadedImage,
        isAnonymous
      } = req.body;

      // Map frontend data to exact database schema column names
      const storyData = {
        share_with_name: isAnonymous ? "Anonymous" : (name || "Anonymous"),
        name: isAnonymous ? null : name,
        city: location || null,
        duration: duration,
        challenges: challenges,
        emotions: emotions,
        emotionDetails: emotionDetails || null,
        treatments_explored: treatments,
        outcome: outcome,
        outcome_description: outcomeDetails || null,
        message_of_hope: messageToOthers || null,
        image_url: uploadedImage || null,
        consent_accepted: true,
        created_at: new Date().toISOString()
      };

      // Insert story into Supabase
      const { data, error } = await supabase
        .from("sakhi_success_stories")
        .insert([storyData])
        .select();

      if (error) {
        console.error("Supabase error POST /api/success-stories:", error);
        return res.status(500).json({ ok: false, error: error.message });
      }

      console.log("✅ Story submitted successfully:", data);
      res.json({ ok: true, story: data?.[0] });
    } catch (e: any) {
      console.error("POST /api/success-stories error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // =========================
  // CLINIC API ENDPOINTS
  // =========================

  // Clinic login endpoint (static - for development)
  app.post("/api/clinic/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: "Username and password are required"
        });
      }

      console.log('🔵 Processing static clinic login for:', username);

      // Static authentication (hardcoded credentials)
      const validCredentials = [
        { username: 'admin', password: 'admin123' },
        { username: 'clinic', password: 'clinic123' },
        { username: 'demo', password: 'demo123' }
      ];

      const isValid = validCredentials.some(
        cred => cred.username === username && cred.password === password
      );

      if (isValid) {
        console.log('✅ Login successful for:', username);
        return res.json({
          success: true,
          username,
          message: 'Login successful'
        });
      } else {
        console.log('❌ Invalid credentials for:', username);
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

    } catch (error) {
      console.error("❌ Error in clinic login:", error);
      res.status(500).json({
        success: false,
        error: "Login failed. Please try again."
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

        const webhookResponse = await fetch('https://n8nottobon.duckdns.org/webhook/lead_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text();
          console.error('❌ Webhook failed:', errorText);
          throw new Error(`n8n webhook failed: ${webhookResponse.statusText}`);
        }

        const responseData = await webhookResponse.json();
        console.log('✅ n8n raw response (insert):', responseData);

        // Handle array response from n8n
        const leadData = Array.isArray(responseData) ? responseData[0] : responseData;
        console.log('✅ Processed lead data:', leadData);

        if (!leadData || !leadData.lead_id) {
          throw new Error('Invalid response from webhook - missing lead_id');
        }

        // Store in database
        await query(`
          INSERT INTO leads (
            lead_id, full_name, email, phone, age, location,
            interest, source, priority, status, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
          ON CONFLICT (lead_id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            age = EXCLUDED.age,
            location = EXCLUDED.location,
            interest = EXCLUDED.interest,
            source = EXCLUDED.source,
            priority = EXCLUDED.priority,
            updated_at = NOW()
        `, [
          leadData.lead_id,
          leadData.full_name,
          leadData.email,
          leadData.phone,
          leadData.age || 0,
          leadData.location || '',
          leadData.interest,
          leadData.source,
          leadData.priority,
          'new'
        ]);

        console.log('✅ Lead stored in database with ID:', leadData.lead_id);

        // Return the complete lead object
        return res.json({
          lead_id: leadData.lead_id,
          full_name: leadData.full_name,
          email: leadData.email,
          phone: leadData.phone,
          age: leadData.age || 0,
          location: leadData.location || '',
          interest: leadData.interest,
          source: leadData.source,
          priority: leadData.priority,
          status: 'new'
        });
      }

      // UPDATE action - update existing lead
      if (action === "update") {
        const { lead_id, full_name, last_name, email, phone, age, location, interest, source, priority } = req.body;

        if (!lead_id) {
          return res.status(400).json({ error: "lead_id is required for update action" });
        }

        // Call n8n webhook for update
        const webhookPayload = {
          action: "update",
          lead_id,
          full_name,
          last_name: last_name || '',
          email,
          phone,
          age: age ? parseInt(age.toString()) : 0,
          location: location || '',
          interest: interest || 'IVF Consultation',
          source: source || 'Website',
          priority: priority || 'Medium'
        };

        console.log('📤 Calling n8n webhook (update):', webhookPayload);

        const webhookResponse = await fetch('https://n8nottobon.duckdns.org/webhook/lead_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text();
          console.error('❌ Webhook failed:', errorText);
          throw new Error(`n8n webhook failed: ${webhookResponse.statusText}`);
        }

        const responseData = await webhookResponse.json();
        console.log('✅ n8n raw response (update):', responseData);

        // Handle both object and array response from n8n
        const leadData = Array.isArray(responseData) ? responseData[0] : responseData;
        console.log('✅ Processed lead data:', leadData);

        if (!leadData || !leadData.lead_id) {
          throw new Error('Invalid response from webhook - missing lead_id');
        }

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
          parseInt(leadData.age?.toString() || '0'),
          leadData.location || '',
          leadData.interest || 'IVF Consultation',
          leadData.source || 'Website',
          leadData.priority || 'Medium',
          lead_id
        ]);

        console.log('✅ Lead updated in database:', lead_id);

        // Fetch the current status from the database
        const { rows } = await query(`SELECT status FROM leads WHERE lead_id = $1`, [lead_id]);
        const currentStatus = rows.length > 0 ? rows[0].status : 'new';

        // Return the complete lead object
        return res.json({
          lead_id: leadData.lead_id,
          full_name: leadData.full_name,
          email: leadData.email,
          phone: leadData.phone,
          age: parseInt(leadData.age?.toString() || '0'),
          location: leadData.location || '',
          interest: leadData.interest || 'IVF Consultation',
          source: leadData.source || 'Website',
          priority: leadData.priority || 'Medium',
          status: currentStatus
        });
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
      const { data, error } = await supabase
        .from("sakhi_scraped_doctors")
        .select("id, source_site, slug, name, designation, image_url")
        .eq("source_site", "medcyivf.in")
        .order("name", { ascending: true });

      if (error) {
        console.error("Supabase error /api/doctors:", error);
        return res.status(500).json({ ok: false, error: error.message });
      }

      res.json({ ok: true, results: data ?? [] });
    } catch (e: any) {
      console.error("GET /api/doctors error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // PUBLIC: doctor detail by slug
  app.get("/api/doctors/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const { stripAppointment } = await import("./scraper/doctorSanitizer");

      const { data, error } = await supabase
        .from("sakhi_scraped_doctors")
        .select("id, source_site, slug, name, designation, specialties, qualifications, experience_years, languages, location, image_url, profile_url, about_html")
        .eq("source_site", "medcyivf.in")
        .eq("slug", slug)
        .limit(1);

      if (error) {
        console.error("Supabase error /api/doctors/:slug:", error);
        return res.status(500).json({ ok: false, error: error.message });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ ok: false, error: "not found" });
      }

      const doc = data[0];
      // Sanitize appointment forms/sections from HTML content
      doc.about_html = stripAppointment(doc.about_html || "");

      res.json({ ok: true, doctor: doc });
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

      const { data, error } = await supabase
        .from("sakhi_scraped_blogs")
        .select("slug, title, excerpt, image_url, created_at")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error("Supabase error /api/blogs:", error);
        return res.status(500).json({ error: error.message });
      }

      // Map data to match expected format (ensure excerpt is never null)
      const blogs = (data ?? []).map(blog => ({
        ...blog,
        excerpt: blog.excerpt || ''
      }));

      res.json(blogs);
    } catch (e: any) {
      console.error("GET /api/blogs error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // 2) Single blog by slug
  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;

      const { data, error } = await supabase
        .from("sakhi_scraped_blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!data) {
        return res.status(404).json({ error: "Not found" });
      }

      res.json({ blog: data });
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