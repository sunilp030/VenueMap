import { type FloorPlan, type InsertFloorPlan, type Poi, type InsertPoi, type Route, type InsertRoute } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Floor Plans
  getFloorPlans(): Promise<FloorPlan[]>;
  getFloorPlan(id: string): Promise<FloorPlan | undefined>;
  createFloorPlan(floorPlan: InsertFloorPlan): Promise<FloorPlan>;
  updateFloorPlan(id: string, floorPlan: Partial<InsertFloorPlan>): Promise<FloorPlan | undefined>;
  deleteFloorPlan(id: string): Promise<boolean>;

  // POIs
  getPoisByFloorPlan(floorPlanId: string): Promise<Poi[]>;
  getPoi(id: string): Promise<Poi | undefined>;
  createPoi(poi: InsertPoi): Promise<Poi>;
  updatePoi(id: string, poi: Partial<InsertPoi>): Promise<Poi | undefined>;
  deletePoi(id: string): Promise<boolean>;

  // Routes
  getRoute(fromPoiId: string, toPoiId: string): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  getRoutesByFloorPlan(floorPlanId: string): Promise<Route[]>;
}

export class MemStorage implements IStorage {
  private floorPlans: Map<string, FloorPlan>;
  private pois: Map<string, Poi>;
  private routes: Map<string, Route>;

  constructor() {
    this.floorPlans = new Map();
    this.pois = new Map();
    this.routes = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Create a sample floor plan
    const sampleFloorPlan: FloorPlan = {
      id: "sample-mall",
      name: "Sample Shopping Mall - Ground Floor",
      width: 2400,
      height: 1800,
      imageUrl: null,
      isActive: true,
    };
    this.floorPlans.set(sampleFloorPlan.id, sampleFloorPlan);

    // Create sample POIs
    const samplePois: Poi[] = [
      {
        id: "poi-1",
        floorPlanId: "sample-mall",
        name: "Main Entrance",
        category: "entrance",
        x: 0.1,
        y: 0.5,
        color: "#3b82f6",
        icon: "fas fa-door-open",
        description: "Main entrance to the mall",
        subcategory: null,
      },
      {
        id: "poi-2",
        floorPlanId: "sample-mall",
        name: "Apple Store",
        category: "electronics",
        x: 0.3,
        y: 0.25,
        color: "#10b981",
        icon: "fas fa-store",
        description: "Premium electronics and accessories",
        subcategory: "technology",
      },
      {
        id: "poi-3",
        floorPlanId: "sample-mall",
        name: "Food Court",
        category: "dining",
        x: 0.6,
        y: 0.4,
        color: "#f59e0b",
        icon: "fas fa-utensils",
        description: "Various dining options",
        subcategory: "restaurant",
      },
      {
        id: "poi-4",
        floorPlanId: "sample-mall",
        name: "H&M",
        category: "clothing",
        x: 0.7,
        y: 0.6,
        color: "#8b5cf6",
        icon: "fas fa-tshirt",
        description: "Fashion and clothing store",
        subcategory: "apparel",
      },
      {
        id: "poi-5",
        floorPlanId: "sample-mall",
        name: "Restrooms",
        category: "amenities",
        x: 0.8,
        y: 0.3,
        color: "#ef4444",
        icon: "fas fa-restroom",
        description: "Public restrooms",
        subcategory: "facilities",
      },
    ];

    samplePois.forEach(poi => this.pois.set(poi.id, poi));
  }

  async getFloorPlans(): Promise<FloorPlan[]> {
    return Array.from(this.floorPlans.values());
  }

  async getFloorPlan(id: string): Promise<FloorPlan | undefined> {
    return this.floorPlans.get(id);
  }

  async createFloorPlan(insertFloorPlan: InsertFloorPlan): Promise<FloorPlan> {
    const id = randomUUID();
    const floorPlan: FloorPlan = { ...insertFloorPlan, id };
    this.floorPlans.set(id, floorPlan);
    return floorPlan;
  }

  async updateFloorPlan(id: string, update: Partial<InsertFloorPlan>): Promise<FloorPlan | undefined> {
    const existing = this.floorPlans.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...update };
    this.floorPlans.set(id, updated);
    return updated;
  }

  async deleteFloorPlan(id: string): Promise<boolean> {
    return this.floorPlans.delete(id);
  }

  async getPoisByFloorPlan(floorPlanId: string): Promise<Poi[]> {
    return Array.from(this.pois.values()).filter(poi => poi.floorPlanId === floorPlanId);
  }

  async getPoi(id: string): Promise<Poi | undefined> {
    return this.pois.get(id);
  }

  async createPoi(insertPoi: InsertPoi): Promise<Poi> {
    const id = randomUUID();
    const poi: Poi = { ...insertPoi, id };
    this.pois.set(id, poi);
    return poi;
  }

  async updatePoi(id: string, update: Partial<InsertPoi>): Promise<Poi | undefined> {
    const existing = this.pois.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...update };
    this.pois.set(id, updated);
    return updated;
  }

  async deletePoi(id: string): Promise<boolean> {
    return this.pois.delete(id);
  }

  async getRoute(fromPoiId: string, toPoiId: string): Promise<Route | undefined> {
    return Array.from(this.routes.values()).find(
      route => route.fromPoiId === fromPoiId && route.toPoiId === toPoiId
    );
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = randomUUID();
    const route: Route = { ...insertRoute, id };
    this.routes.set(id, route);
    return route;
  }

  async getRoutesByFloorPlan(floorPlanId: string): Promise<Route[]> {
    return Array.from(this.routes.values()).filter(route => route.floorPlanId === floorPlanId);
  }
}

export const storage = new MemStorage();
