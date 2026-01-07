// server/routes.ts
import type { Express } from "express";
import { db } from "@db";
import { createServer, type Server } from "http";
import { runMedcyDoctorsScrape } from "./scraper/medcyDoctors";
import { scrapeAndStoreDoctors } from "./scraper/doctors";
import { scrapeAndStoreBlogs } from "./scraper/medcy";
import { supabase } from "./supabaseClient";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import fs from 'fs/promises'; // Import fs here
import path from 'path'; // Import path here

// Dev key for scraping - use environment variable in production
const DEV_SCRAPE_KEY = process.env.DEV_SCRAPE_KEY || "dev-scrape-2025";

export async function registerRoutes(app: Express): Promise<Server> {
  // =========================
  // GLOBAL CORS MIDDLEWARE
  // =========================
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, ngrok-skip-browser-warning, x-api-key');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(204).send();
    }
    
    next();
  });

  // =========================
  // API ROUTES (prefix with /api)
  // =========================

  // Health check to verify DB connectivity via Supabase
  app.get("/api/health/db", async (_req, res) => {
    try {
      const { data, error } = await supabase
        .from("sakhi_scraped_blogs")
        .select("id")
        .limit(1);

      if (error) {
        return res.status(500).json({ ok: false, error: error.message });
      }

      res.json({ ok: true, connection: "supabase", timestamp: new Date().toISOString() });
    } catch (e: any) {
      console.error("DB error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // --- DEBUG: Supabase connection info
  app.get("/api/health/db/ssl", (_req, res) => {
    res.json({
      connection: "supabase",
      ssl: "managed by Supabase",
      url: process.env.SUPABASE_URL ? "configured" : "missing"
    });
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

  // --- DEBUG: list public tables (using Supabase RPC or direct query)
  app.get("/api/health/db/tables", async (_req, res) => {
    try {
      // Note: Supabase client doesn't directly support information_schema queries
      // This endpoint is deprecated - use Supabase dashboard instead
      res.json({
        message: "Use Supabase dashboard to view tables",
        tables: ["sakhi_scraped_blogs", "sakhi_scraped_doctors", "sakhi_success_stories"]
      });
    } catch (e: any) {
      console.error("GET /api/health/db/tables error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // --- Deprecated: Tables should be created via Supabase dashboard/migrations
  app.post("/api/dev/create-scraped-table", async (_req, res) => {
    res.status(410).json({
      ok: false,
      error: "This endpoint is deprecated. Create tables via Supabase dashboard or migrations."
    });
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
  // CHAT API ENDPOINTS
  // =========================

  // Generate AI-like response based on user message
  function generateChatResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple response generation based on keywords
    const responses: { [key: string]: string } = {
      "fertility": "Fertility is a complex journey. Every person's path is unique. If you have specific concerns, I'd recommend consulting with a fertility specialist. Would you like information about any particular aspect?",
      "pregnancy": "Pregnancy is an exciting time! There are many resources available to support you. Is there something specific about pregnancy you'd like to know more about?",
      "stress": "It's completely normal to feel stressed during fertility treatments. Many people find support from counseling, meditation, or connecting with others going through similar experiences.",
      "treatment": "There are several treatment options available including IVF, IUI, and other assisted reproductive technologies. Each has different success rates and considerations. What would help you most?",
      "support": "You're not alone in this journey. Many people find support through support groups, counseling, and connecting with others who understand their experience.",
      "hope": "I understand you might be feeling hopeful or uncertain. Remember that every person's journey is unique, and there's always room for hope and positivity.",
      "baby": "Starting or expanding your family is a wonderful goal. Whether through natural conception or assisted methods, there are many paths to parenthood.",
      "help": "I'm here to provide emotional support and information. Feel free to share what's on your mind, and I'll do my best to help or point you toward resources.",
      "default": "Thank you for sharing that with me. I'm here to support you through your fertility and parenting journey. Is there anything specific you'd like to talk about?",
    };

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response;
      }
    }

    return responses.default;
  }

  // Chat message endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { text, lang = "en" } = req.body;

      if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: "Message text is required" });
      }

      // Validate with schema
      const validated = insertChatMessageSchema.safeParse({
        text: text.trim(),
        isUser: "true",
        lang,
      });

      if (!validated.success) {
        return res.status(400).json({ error: "Invalid message format" });
      }

      // Store user message
      await storage.addChatMessage(validated.data);

      // Generate response
      const response = generateChatResponse(text);

      // Store bot response
      await storage.addChatMessage({
        text: response,
        isUser: "false",
        lang,
      });

      res.json({
        ok: true,
        userMessage: text.trim(),
        botResponse: response,
      });
    } catch (e: any) {
      console.error("POST /api/chat error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // Get all chat messages
  app.get("/api/chat", async (_req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json({ ok: true, messages });
    } catch (e: any) {
      console.error("GET /api/chat error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // =========================
  // STORIES API ENDPOINTS (IN-MEMORY - NO DATABASE)
  // =========================

  // In-memory storage for stories
  const inMemoryStories: any[] = [];

  // Handle CORS preflight
  app.options("/api/success-stories", (_req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');
    res.status(204).send();
  });

  // Get all stories (in-memory only)
  app.get("/api/success-stories", async (_req, res) => {
    try {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');

      console.log("📖 Fetching stories from memory:", inMemoryStories.length);
      res.json(inMemoryStories);
    } catch (e: any) {
      console.error("GET /api/success-stories error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // Submit a new story (in-memory only)
  app.post("/api/success-stories", async (req, res) => {
    try {
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');

      const {
        isAnonymous,
        name,
        city,
        duration,
        challenges,
        emotions,
        emotionDetails,
        treatments,
        outcome,
        outcomeDetails,
        messageToOthers,
        uploadedImage,
        consent_accepted,
        title,
        summary,
        stage,
        language,
        slug
      } = req.body;

      console.log("📥 Received story submission:", { name, city, isAnonymous });

      const shareName = isAnonymous === "true" || isAnonymous === true ? "Anonymous" : (name || "Anonymous");
      const actualName = isAnonymous === "true" || isAnonymous === true ? null : name;

      // Create story object
      const newStory = {
        id: inMemoryStories.length + 1,
        share_with_name: shareName,
        name: actualName,
        city: city || null,
        duration: duration,
        challenges: challenges,
        emotions: emotions,
        emotion_details: emotionDetails || null,
        treatments_explored: treatments,
        outcome: outcome,
        outcome_description: outcomeDetails || null,
        message_of_hope: messageToOthers || null,
        image_url: uploadedImage || null,
        consent_accepted: consent_accepted || true,
        title: title || name || "Anonymous",
        summary: summary || challenges,
        stage: stage || outcome,
        language: language || "English",
        slug: slug || `story-${Date.now()}`,
        created_at: new Date().toISOString()
      };

      // Add to in-memory array (newest first)
      inMemoryStories.unshift(newStory);

      console.log("✅ Story stored in memory:", newStory.title);
      console.log("📊 Total stories in memory:", inMemoryStories.length);

      res.json({ ok: true, story: newStory });
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

        // Generate lead_id locally
        const lead_id = `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        console.log('✅ Creating lead locally:', lead_id);

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
          lead_id,
          full_name,
          email,
          phone,
          age ? parseInt(age) : 0,
          location || '',
          interest || '',
          source || 'Website',
          priority || 'Medium',
          'new'
        ]);

        console.log('✅ Lead stored in database with ID:', lead_id);

        // Return the complete lead object
        return res.json({
          lead_id: lead_id,
          full_name: full_name,
          email: email,
          phone: phone,
          age: age ? parseInt(age) : 0,
          location: location || '',
          interest: interest || '',
          source: source || 'Website',
          priority: priority || 'Medium',
          status: 'new'
        });
      }

      // UPDATE action - update existing lead
      if (action === "update") {
        const { lead_id, full_name, last_name, email, phone, age, location, interest, source, priority } = req.body;

        if (!lead_id) {
          return res.status(400).json({ error: "lead_id is required for update action" });
        }

        console.log('✅ Updating lead locally:', lead_id);

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
          full_name,
          email,
          phone,
          age ? parseInt(age.toString()) : 0,
          location || '',
          interest || 'IVF Consultation',
          source || 'Website',
          priority || 'Medium',
          lead_id
        ]);

        console.log('✅ Lead updated in database:', lead_id);

        // Fetch the current status from the database
        const { rows } = await query(`SELECT status FROM leads WHERE lead_id = $1`, [lead_id]);
        const currentStatus = rows.length > 0 ? rows[0].status : 'new';

        // Return the complete lead object
        return res.json({
          lead_id: lead_id,
          full_name: full_name,
          email: email,
          phone: phone,
          age: age ? parseInt(age.toString()) : 0,
          location: location || '',
          interest: interest || 'IVF Consultation',
          source: source || 'Website',
          priority: priority || 'Medium',
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
  // SAKHI CLINIC LEADS API ENDPOINT
  // =========================

  // Submit a new lead to sakhi_clinic_leads table
  app.post("/api/clinic-leads", async (req, res) => {
    try {
      const { name, phone, age, gender, problemType, source } = req.body;

      if (!name || !phone || !age || !gender || !problemType || !source) {
        return res.status(400).json({ 
          ok: false, 
          error: "All fields are required: name, phone, age, gender, problemType, source" 
        });
      }

      console.log("📥 Received clinic lead submission:", { name, phone, problemType });

      const { data, error } = await supabase
        .from("sakhi_clinic_leads")
        .insert([{
          name: name,
          phone: phone,
          age: age,
          gender: gender,
          problem: problemType,
          source: source
        }])
        .select()
        .single();

      if (error) {
        console.error("❌ Supabase error inserting clinic lead:", error);
        return res.status(500).json({ ok: false, error: error.message });
      }

      console.log("✅ Clinic lead stored successfully:", data.id);
      res.json({ ok: true, data });
    } catch (e: any) {
      console.error("POST /api/clinic-leads error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // Proxy: Knowledge Hub
  app.get("/api/proxy/knowledge-hub/*", async (req, res) => {
    try {
      const path = req.params[0];
      const queryString = new URL(req.url, `http://${req.headers.host}`).search;
      const targetUrl = `http://72.61.228.9:8100/api/knowledge-hub/${path}${queryString}`;
      
      const response = await fetch(targetUrl, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        res.status(response.status).json(data);
      } else {
        const text = await response.text();
        console.error(`Proxy knowledge-hub error: Non-JSON response from ${targetUrl}`, text);
        res.status(response.status).send(text);
      }
    } catch (error) {
      console.error("Proxy knowledge-hub error:", error);
      res.status(500).json({ error: "Failed to connect to backend server" });
    }
  });

  // Proxy: Success Stories
  app.get("/api/proxy/stories", async (req, res) => {
    try {
      const targetUrl = "http://72.61.228.9:8100/stories/";
      const response = await fetch(targetUrl, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        res.status(response.status).json(data);
      } else {
        const text = await response.text();
        console.error(`Proxy stories error: Non-JSON response from ${targetUrl}`, text);
        res.status(response.status).send(text);
      }
    } catch (error) {
      console.error("Proxy stories error:", error);
      res.status(500).json({ error: "Failed to connect to backend server" });
    }
  });

  app.post("/api/proxy/stories", async (req, res) => {
    try {
      const targetUrl = "http://72.61.228.9:8100/stories/";
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(req.body),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        res.status(response.status).json(data);
      } else {
        const text = await response.text();
        console.error(`Proxy stories post error: Non-JSON response from ${targetUrl}`, text);
        res.status(response.status).send(text);
      }
    } catch (error) {
      console.error("Proxy stories post error:", error);
      res.status(500).json({ error: "Failed to connect to backend server" });
    }
  });

  // Get all clinic leads
  app.get("/api/clinic-leads", async (_req, res) => {
    try {
      const { data, error } = await supabase
        .from("sakhi_clinic_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Supabase error fetching clinic leads:", error);
        return res.status(500).json({ ok: false, error: error.message });
      }

      res.json({ ok: true, data: data ?? [] });
    } catch (e: any) {
      console.error("GET /api/clinic-leads error:", e);
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  // =========================
  // SAKHI API PROXY ENDPOINTS (to avoid mixed content errors)
  // =========================
  
  const SAKHI_API_BASE = process.env.SAKHI_API_URL || 'http://72.61.228.9:8100';

  // Proxy: User Login
  app.post("/api/proxy/user/login", async (req, res) => {
    try {
      const response = await fetch(`${SAKHI_API_BASE}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: any) {
      console.error("Proxy login error:", error);
      res.status(500).json({ error: "Failed to connect to authentication server" });
    }
  });

  // Proxy: User Register
  app.post("/api/proxy/user/register", async (req, res) => {
    try {
      const response = await fetch(`${SAKHI_API_BASE}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: any) {
      console.error("Proxy register error:", error);
      res.status(500).json({ error: "Failed to connect to authentication server" });
    }
  });

  // Proxy: Sakhi Chat
  app.post("/api/proxy/sakhi/chat", async (req, res) => {
    try {
      const response = await fetch(`${SAKHI_API_BASE}/sakhi/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: any) {
      console.error("Proxy chat error:", error);
      res.status(500).json({ error: "Failed to connect to Sakhi server" });
    }
  });

  // Proxy: Onboarding Step
  app.post("/api/proxy/onboarding/step", async (req, res) => {
    try {
      const response = await fetch(`${SAKHI_API_BASE}/onboarding/step`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: any) {
      console.error("Proxy onboarding step error:", error);
      res.status(500).json({ error: "Failed to connect to onboarding server" });
    }
  });

  // Proxy: Onboarding Complete
  app.post("/api/proxy/onboarding/complete", async (req, res) => {
    try {
      const response = await fetch(`${SAKHI_API_BASE}/onboarding/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error: any) {
      console.error("Proxy onboarding complete error:", error);
      res.status(500).json({ error: "Failed to connect to onboarding server" });
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

  // =========================
  // KNOWLEDGE HUB API ENDPOINTS
  // =========================

  // Handle CORS preflight for knowledge endpoints
  app.options("/api/knowledge/*", (_req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, ngrok-skip-browser-warning');
    res.status(204).send();
  });

  // Get all articles
  app.get("/api/knowledge/articles", async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, ngrok-skip-browser-warning');

      const { search, lifeStage, perspective, page = '1', perPage = '20' } = req.query;

      // Read all JSON files from KnowledgeHub directory
      const knowledgeHubDir = path.join(process.cwd(), 'client', 'public', 'KnowledgeHub');
      const files = await fs.readdir(knowledgeHubDir);
      const jsonFiles = files.filter((f: string) => f.endsWith('.json'));

      let articles = [];
      for (const file of jsonFiles) {
        const content = await fs.readFile(path.join(knowledgeHubDir, file), 'utf-8');
        const articleData = JSON.parse(content);

        // Extract metadata from the article
        const article = {
          id: articleData.slug || file.replace('.json', ''),
          slug: articleData.slug || file.replace('.json', ''),
          title: articleData.title?.en || '',
          summary: articleData.overview?.en || '',
          topic: 'General',
          section: 'Knowledge Hub',
          lens: 'medical', // You might want to extract this from article metadata
          life_stage: 'pregnancy', // You might want to extract this from article metadata
          read_time_minutes: parseInt(articleData.metadata?.readTime?.en?.replace(/\D/g, '') || '5'),
          published_at: new Date().toISOString()
        };

        // Apply filters
        let include = true;
        if (search && !article.title.toLowerCase().includes(search.toString().toLowerCase()) &&
            !article.summary.toLowerCase().includes(search.toString().toLowerCase())) {
          include = false;
        }

        if (include) {
          articles.push(article);
        }
      }

      // Pagination
      const pageNum = parseInt(page.toString());
      const perPageNum = parseInt(perPage.toString());
      const startIndex = (pageNum - 1) * perPageNum;
      const endIndex = startIndex + perPageNum;
      const paginatedArticles = articles.slice(startIndex, endIndex);

      res.json({
        query: search || '',
        filters: {
          life_stage: lifeStage,
          perspective: perspective
        },
        pagination: {
          page: pageNum,
          per_page: perPageNum,
          total: articles.length,
          has_more: endIndex < articles.length
        },
        items: paginatedArticles
      });
    } catch (e: any) {
      console.error("GET /api/knowledge/articles error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // Get single article by slug
  app.get("/api/knowledge/articles/:slug", async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, ngrok-skip-browser-warning');

      const { slug } = req.params;
      const filePath = path.join(process.cwd(), 'client', 'public', 'KnowledgeHub', `${slug}.json`);

      const content = await fs.readFile(filePath, 'utf-8');
      const articleData = JSON.parse(content);

      res.json(articleData);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        res.status(404).json({ error: 'Article not found' });
      } else {
        console.error("GET /api/knowledge/articles/:slug error:", e);
        res.status(500).json({ error: e.message });
      }
    }
  });

  // Get bundled knowledge hub data
  app.get("/api/knowledge", async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, ngrok-skip-browser-warning');

      const { search, lifeStage, perspective, page = '1', perPage = '20' } = req.query;

      // Read all JSON files from KnowledgeHub directory
      const knowledgeHubDir = path.join(process.cwd(), 'client', 'public', 'KnowledgeHub');
      const files = await fs.readdir(knowledgeHubDir);
      const jsonFiles = files.filter((f: string) => f.endsWith('.json'));

      let articles = [];
      for (const file of jsonFiles) {
        const content = await fs.readFile(path.join(knowledgeHubDir, file), 'utf-8');
        const articleData = JSON.parse(content);

        // Extract metadata from the article
        const article = {
          id: articleData.slug || file.replace('.json', ''),
          slug: articleData.slug || file.replace('.json', ''),
          title: articleData.title?.en || '',
          summary: articleData.overview?.en || '',
          topic: 'General',
          section: 'Knowledge Hub',
          lens: 'medical',
          life_stage: 'pregnancy',
          read_time_minutes: parseInt(articleData.metadata?.readTime?.en?.replace(/\D/g, '') || '5'),
          published_at: new Date().toISOString()
        };

        // Apply filters
        let include = true;
        if (search && !article.title.toLowerCase().includes(search.toString().toLowerCase()) &&
            !article.summary.toLowerCase().includes(search.toString().toLowerCase())) {
          include = false;
        }

        if (include) {
          articles.push(article);
        }
      }

      // Pagination
      const pageNum = parseInt(page.toString());
      const perPageNum = parseInt(perPage.toString());
      const startIndex = (pageNum - 1) * perPageNum;
      const endIndex = startIndex + perPageNum;
      const paginatedArticles = articles.slice(startIndex, endIndex);

      res.json({
        query: search || '',
        filters: {
          life_stage: lifeStage,
          perspective: perspective
        },
        pagination: {
          page: pageNum,
          per_page: perPageNum,
          total: articles.length,
          has_more: endIndex < articles.length
        },
        items: paginatedArticles
      });
    } catch (e: any) {
      console.error("GET /api/knowledge error:", e);
      res.status(500).json({ error: e.message });
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