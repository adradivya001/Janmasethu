import { sql } from "drizzle-orm";
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  age: integer("age"),
  source: text("source").notNull(),
  campaign: text("campaign"),
  utm_source: text("utm_source"),
  utm_medium: text("utm_medium"),
  utm_campaign: text("utm_campaign"),
  inquiry_type: text("inquiry_type"),
  priority: text("priority").notNull().default("Medium"),
  status: text("status").notNull().default("new"),
  assigned_to: text("assigned_to"),
  clinic_id: text("clinic_id"),
  notes: text("notes"),
  last_contact_date: timestamp("last_contact_date"),
  next_follow_up_date: timestamp("next_follow_up_date"),
  converted_date: timestamp("converted_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads);
export const selectLeadSchema = createSelectSchema(leads);

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