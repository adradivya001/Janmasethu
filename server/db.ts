// server/db.ts
import pg from "pg";
const { Pool } = pg;

const url = process.env.DATABASE_URL || "";
const needSSL =
  process.env.PGSSL === "true" ||
  /sslmode=require/i.test(url); // also handle ?sslmode=require in the URL

export const pool = new Pool({
  connectionString: url,
  ssl: needSSL ? { rejectUnauthorized: false } : undefined,
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
