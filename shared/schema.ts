import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  lead_id: varchar("lead_id", { length: 255 }).primaryKey(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  age: varchar("age", { length: 10 }),
  source: varchar("source", { length: 100 }),
  campaign: varchar("campaign", { length: 255 }),
  utm_source: varchar("utm_source", { length: 100 }),
  utm_medium: varchar("utm_medium", { length: 100 }),
  utm_campaign: varchar("utm_campaign", { length: 255 }),
  inquiry_type: varchar("inquiry_type", { length: 255 }),
  priority: varchar("priority", { length: 50 }),
  status: varchar("status", { length: 50 }),
  assigned_to: varchar("assigned_to", { length: 255 }),
  clinic_id: varchar("clinic_id", { length: 255 }),
  notes: text("notes"),
  last_contact_date: varchar("last_contact_date", { length: 255 }),
  next_follow_up_date: varchar("next_follow_up_date", { length: 255 }),
  converted_date: varchar("converted_date", { length: 255 }),
  created_at: varchar("created_at", { length: 255 }),
  updated_at: varchar("updated_at", { length: 255 }),
});

export type Lead = typeof leads.$inferSelect;
