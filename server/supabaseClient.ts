
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env", override: true });

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("❌ MISSING SUPABASE_URL or SUPABASE_ANON_KEY");
  process.exit(1);
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
