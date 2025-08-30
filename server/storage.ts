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
    // Create the exhibition hall floor plan
    const hallFloorPlan: FloorPlan = {
      id: "exhibition-halls",
      name: "Exhibition Halls 9-12",
      width: 3200,
      height: 2000,
      imageUrl: null,
      isActive: true,
    };
    this.floorPlans.set(hallFloorPlan.id, hallFloorPlan);

    // Create exhibition booth POIs based on the PDF layout
    const hallPois: Poi[] = [
      // Hall 12 booths
      {
        id: "h12a22",
        floorPlanId: "exhibition-halls",
        name: "H12A22",
        category: "booth",
        x: 0.12,
        y: 0.2,
        color: "#3b82f6",
        icon: "fas fa-store",
        description: "Exhibition booth 12x5.5",
        subcategory: "hall-12",
        type: "rectangle" as const,
        width: 0.08,
        height: 0.05,
      },
      {
        id: "h12a20",
        floorPlanId: "exhibition-halls",
        name: "H12A20",
        category: "booth",
        x: 0.25,
        y: 0.2,
        color: "#3b82f6",
        icon: "fas fa-store",
        description: "Exhibition booth 22.5x10",
        subcategory: "hall-12",
        type: "rectangle" as const,
        width: 0.12,
        height: 0.08,
      },
      {
        id: "h12a21",
        floorPlanId: "exhibition-halls",
        name: "H12A21",
        category: "booth",
        x: 0.12,
        y: 0.35,
        color: "#3b82f6",
        icon: "fas fa-store",
        description: "Exhibition booth 6x9",
        subcategory: "hall-12",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.06,
      },
      {
        id: "h12l2",
        floorPlanId: "exhibition-halls",
        name: "H12L2",
        category: "booth",
        x: 0.05,
        y: 0.35,
        color: "#8b5cf6",
        icon: "fas fa-store",
        description: "Exhibition booth 6x9",
        subcategory: "hall-12",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.06,
      },

      // Hall 11 booths
      {
        id: "h11a18",
        floorPlanId: "exhibition-halls",
        name: "H11A18",
        category: "booth",
        x: 0.4,
        y: 0.2,
        color: "#10b981",
        icon: "fas fa-store",
        description: "Exhibition booth 11x5",
        subcategory: "hall-11",
        type: "rectangle" as const,
        width: 0.07,
        height: 0.04,
      },
      {
        id: "h11a16",
        floorPlanId: "exhibition-halls",
        name: "H11A16",
        category: "booth",
        x: 0.52,
        y: 0.2,
        color: "#10b981",
        icon: "fas fa-store",
        description: "Exhibition booth 15x9",
        subcategory: "hall-11",
        type: "rectangle" as const,
        width: 0.09,
        height: 0.06,
      },
      {
        id: "h11a14",
        floorPlanId: "exhibition-halls",
        name: "H11A14",
        category: "booth",
        x: 0.58,
        y: 0.15,
        color: "#10b981",
        icon: "fas fa-store",
        description: "Exhibition booth 3x9, 21x9",
        subcategory: "hall-11",
        type: "rectangle" as const,
        width: 0.12,
        height: 0.06,
      },
      {
        id: "h11a9",
        floorPlanId: "exhibition-halls",
        name: "H11A9",
        category: "booth",
        x: 0.45,
        y: 0.4,
        color: "#10b981",
        icon: "fas fa-store",
        description: "Exhibition booth 9x12",
        subcategory: "hall-11",
        type: "rectangle" as const,
        width: 0.06,
        height: 0.08,
      },

      // Hall 10 booths
      {
        id: "h10a12",
        floorPlanId: "exhibition-halls",
        name: "H10A12",
        category: "booth",
        x: 0.72,
        y: 0.2,
        color: "#f59e0b",
        icon: "fas fa-store",
        description: "Exhibition booth",
        subcategory: "hall-10",
        type: "rectangle" as const,
        width: 0.05,
        height: 0.04,
      },
      {
        id: "h10a10",
        floorPlanId: "exhibition-halls",
        name: "H10A10",
        category: "booth",
        x: 0.78,
        y: 0.2,
        color: "#f59e0b",
        icon: "fas fa-store",
        description: "Exhibition booth 6x6",
        subcategory: "hall-10",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.04,
      },
      {
        id: "h10a8",
        floorPlanId: "exhibition-halls",
        name: "H10A8",
        category: "booth",
        x: 0.82,
        y: 0.2,
        color: "#f59e0b",
        icon: "fas fa-store",
        description: "Exhibition booth 6x3",
        subcategory: "hall-10",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.025,
      },
      {
        id: "h10a6",
        floorPlanId: "exhibition-halls",
        name: "H10A6",
        category: "booth",
        x: 0.86,
        y: 0.2,
        color: "#f59e0b",
        icon: "fas fa-store",
        description: "Exhibition booth 6x3",
        subcategory: "hall-10",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.025,
      },
      {
        id: "h10a5",
        floorPlanId: "exhibition-halls",
        name: "H10A5",
        category: "booth",
        x: 0.78,
        y: 0.4,
        color: "#f59e0b",
        icon: "fas fa-store",
        description: "Exhibition booth 12x12",
        subcategory: "hall-10",
        type: "rectangle" as const,
        width: 0.08,
        height: 0.08,
      },
      {
        id: "h10a3",
        floorPlanId: "exhibition-halls",
        name: "H10A3 - TRUETZSCHLER",
        category: "booth",
        x: 0.75,
        y: 0.55,
        color: "#f59e0b",
        icon: "fas fa-industry",
        description: "TRUETZSCHLER - Exhibition booth 27x18",
        subcategory: "hall-10",
        type: "rectangle" as const,
        width: 0.18,
        height: 0.12,
      },

      // Hall 9 booths
      {
        id: "h9a4",
        floorPlanId: "exhibition-halls",
        name: "H9A4",
        category: "booth",
        x: 0.92,
        y: 0.2,
        color: "#ef4444",
        icon: "fas fa-store",
        description: "Exhibition booth 18x9",
        subcategory: "hall-9",
        type: "rectangle" as const,
        width: 0.12,
        height: 0.06,
      },
      {
        id: "h9a2",
        floorPlanId: "exhibition-halls",
        name: "H9A2",
        category: "booth",
        x: 0.96,
        y: 0.25,
        color: "#ef4444",
        icon: "fas fa-store",
        description: "Exhibition booth 14x5+3x2",
        subcategory: "hall-9",
        type: "rectangle" as const,
        width: 0.09,
        height: 0.04,
      },
      {
        id: "h9a1b2",
        floorPlanId: "exhibition-halls",
        name: "H9A1B2 - LMW",
        category: "booth",
        x: 0.9,
        y: 0.55,
        color: "#ef4444",
        icon: "fas fa-industry",
        description: "LMW - Exhibition booth 32x24",
        subcategory: "hall-9",
        type: "rectangle" as const,
        width: 0.22,
        height: 0.16,
      },

      // Entrances/Exits
      {
        id: "entrance-hall12",
        floorPlanId: "exhibition-halls",
        name: "Entry/Exit Hall 12",
        category: "entrance",
        x: 0.15,
        y: 0.05,
        color: "#6b7280",
        icon: "fas fa-door-open",
        description: "Main entrance to Hall 12",
        subcategory: "entrance",
        type: "rectangle" as const,
        width: 0.08,
        height: 0.03,
      },
      {
        id: "entrance-hall11",
        floorPlanId: "exhibition-halls",
        name: "Entry/Exit Hall 11",
        category: "entrance",
        x: 0.45,
        y: 0.05,
        color: "#6b7280",
        icon: "fas fa-door-open",
        description: "Main entrance to Hall 11",
        subcategory: "entrance",
        type: "rectangle" as const,
        width: 0.08,
        height: 0.03,
      },
      {
        id: "entrance-hall10",
        floorPlanId: "exhibition-halls",
        name: "Entry/Exit Hall 10",
        category: "entrance",
        x: 0.75,
        y: 0.05,
        color: "#6b7280",
        icon: "fas fa-door-open",
        description: "Main entrance to Hall 10",
        subcategory: "entrance",
        type: "rectangle" as const,
        width: 0.08,
        height: 0.03,
      },
      {
        id: "entrance-hall9",
        floorPlanId: "exhibition-halls",
        name: "Entry/Exit Hall 9",
        category: "entrance",
        x: 0.92,
        y: 0.05,
        color: "#6b7280",
        icon: "fas fa-door-open",
        description: "Main entrance to Hall 9",
        subcategory: "entrance",
        type: "rectangle" as const,
        width: 0.08,
        height: 0.03,
      },

      // FHC areas
      {
        id: "fhc-hall12",
        floorPlanId: "exhibition-halls",
        name: "F.H.C. Hall 12",
        category: "facility",
        x: 0.15,
        y: 0.32,
        color: "#64748b",
        icon: "fas fa-tools",
        description: "Fire Hose Cabinet - Hall 12",
        subcategory: "safety",
        type: "point" as const,
        width: null,
        height: null,
      },
      {
        id: "fhc-hall11",
        floorPlanId: "exhibition-halls",
        name: "F.H.C. Hall 11",
        category: "facility",
        x: 0.45,
        y: 0.32,
        color: "#64748b",
        icon: "fas fa-tools",
        description: "Fire Hose Cabinet - Hall 11",
        subcategory: "safety",
        type: "point" as const,
        width: null,
        height: null,
      },
      {
        id: "fhc-hall10",
        floorPlanId: "exhibition-halls",
        name: "F.H.C. Hall 10",
        category: "facility",
        x: 0.75,
        y: 0.32,
        color: "#64748b",
        icon: "fas fa-tools",
        description: "Fire Hose Cabinet - Hall 10",
        subcategory: "safety",
        type: "point" as const,
        width: null,
        height: null,
      },
      {
        id: "fhc-hall9",
        floorPlanId: "exhibition-halls",
        name: "F.H.C. Hall 9",
        category: "facility",
        x: 0.92,
        y: 0.32,
        color: "#64748b",
        icon: "fas fa-tools",
        description: "Fire Hose Cabinet - Hall 9",
        subcategory: "safety",
        type: "point" as const,
        width: null,
        height: null,
      },

      // Some J series booths in Hall 9
      {
        id: "h9j1",
        floorPlanId: "exhibition-halls",
        name: "H9J1",
        category: "booth",
        x: 0.98,
        y: 0.35,
        color: "#ef4444",
        icon: "fas fa-store",
        description: "Exhibition booth 6x6",
        subcategory: "hall-9",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.04,
      },
      {
        id: "h9j3",
        floorPlanId: "exhibition-halls",
        name: "H9J3",
        category: "booth",
        x: 0.98,
        y: 0.42,
        color: "#ef4444",
        icon: "fas fa-store",
        description: "Exhibition booth 6x6",
        subcategory: "hall-9",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.04,
      },
      {
        id: "h9j5",
        floorPlanId: "exhibition-halls",
        name: "H9J5",
        category: "booth",
        x: 0.98,
        y: 0.49,
        color: "#ef4444",
        icon: "fas fa-store",
        description: "Exhibition booth 6x6",
        subcategory: "hall-9",
        type: "rectangle" as const,
        width: 0.04,
        height: 0.04,
      },
    ];

    hallPois.forEach(poi => this.pois.set(poi.id, poi));
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
