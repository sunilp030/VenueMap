import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const floorPlans = pgTable("floor_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(false),
});

export const pois = pgTable("pois", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  floorPlanId: varchar("floor_plan_id").notNull().references(() => floorPlans.id),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  description: text("description"),
  x: real("x").notNull(),
  y: real("y").notNull(),
  color: text("color").default("#10b981"),
  icon: text("icon").default("fas fa-map-pin"),
  type: text("type").$type<"point" | "rectangle">().default("point"),
  width: real("width"),
  height: real("height"),
});

export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  floorPlanId: varchar("floor_plan_id").notNull().references(() => floorPlans.id),
  fromPoiId: varchar("from_poi_id").notNull().references(() => pois.id),
  toPoiId: varchar("to_poi_id").notNull().references(() => pois.id),
  path: jsonb("path").notNull(), // Array of {x, y} coordinates
  distance: real("distance").notNull(),
  estimatedTime: integer("estimated_time").notNull(), // in seconds
});

export const insertFloorPlanSchema = createInsertSchema(floorPlans).omit({
  id: true,
});

export const insertPoiSchema = createInsertSchema(pois).omit({
  id: true,
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
});

export type InsertFloorPlan = z.infer<typeof insertFloorPlanSchema>;
export type InsertPoi = z.infer<typeof insertPoiSchema>;
export type InsertRoute = z.infer<typeof insertRouteSchema>;

export type FloorPlan = typeof floorPlans.$inferSelect;
export type Poi = typeof pois.$inferSelect;
export type Route = typeof routes.$inferSelect;
