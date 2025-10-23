// server/db.ts
import pg from "pg";
const { Pool } = pg;

// last-resort guard so Node won't reject self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.PGSSL === "true" ? "0" : process.env.NODE_TLS_REJECT_UNAUTHORIZED || "";

const url = process.env.DATABASE_URL || "";
const needSSL = process.env.PGSSL === "true" || /sslmode=require/i.test(url);

export const pool = new Pool({
  connectionString: url,
  ssl: needSSL ? { rejectUnauthorized: false } : undefined, // accept self-signed
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
