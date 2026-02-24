// server/binding.ts
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env", override: true });

const app = express();
app.use(express.json());

// Manual CORS to avoid extra dependency
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

// SAKHI_BACKEND_URL should be the internal port 8100
const SAKHI_BACKEND_URL = "http://localhost:8100";
const PORT = 8000;

/**
 * Binding Layer Middleware: Log Latency
 */
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`⏱️  BINDING LAYER LATENCY: ${duration}ms | ${req.method} ${req.url}`);
    });
    next();
});

/**
 * Proxy Chat Endpoint
 * Responsibility: Receive from FE (5000), Forward to BE (8100)
 */
app.post("/sakhi/chat", async (req, res) => {
    try {
        const { message, user_id, phone_number, language } = req.body;

        // Forward to the Python Backend
        const response = await axios.post(`${SAKHI_BACKEND_URL}/sakhi/chat`, {
            message,
            user_id,
            phone_number,
            language: language || "en"
        }, {
            timeout: 15000 // 15s timeout
        });

        // Return the response directly
        return res.json(response.data);
    } catch (error: any) {
        console.error("❌ Binding Layer Error:", error.message);
        const status = error.response?.status || 500;
        const detail = error.response?.data?.detail || "Binding Layer failed to connect to Backend";
        return res.status(status).json({ error: detail });
    }
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "Binding Layer Active", target: SAKHI_BACKEND_URL });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Binding Layer running on port ${PORT}`);
    console.log(`🔗 Proxying to Sakhi Backend at ${SAKHI_BACKEND_URL}`);
});
