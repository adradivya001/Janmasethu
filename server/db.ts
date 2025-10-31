// server/db.ts
import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If you set PGSSL=true in Secrets, enable SSL (common on hosted DBs)
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
  // Add connection timeout settings
  connectionTimeoutMillis: 10000, // 10 seconds to establish connection
  idleTimeoutMillis: 30000, // 30 seconds before closing idle connections
  max: 20, // maximum number of clients in the pool
});

export async function query<T = any>(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query<T>(text, params);
    return res;
  } finally {
    client.release();
  }
}
