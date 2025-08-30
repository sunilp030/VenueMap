import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFloorPlanSchema, insertPoiSchema, insertRouteSchema } from "@shared/schema";
// Import path functions - we'll implement them directly here for server use
function findPath(start: any, end: any): any[] {
  // Enhanced pathfinding with waypoints for more realistic navigation
  const mainCorridors = [
    { x: 0.25, y: 0.5 },   // Left corridor
    { x: 0.45, y: 0.5 },   // Center-left intersection
    { x: 0.65, y: 0.5 },   // Center-right intersection
    { x: 0.85, y: 0.5 },   // Right corridor
    { x: 0.5, y: 0.3 },    // North corridor
    { x: 0.5, y: 0.7 },    // South corridor
  ];
  
  function calculateDistance(p1: any, p2: any): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  
  function findNearestCorridor(point: any, corridors: any[]): any {
    let nearest = corridors[0];
    let minDistance = calculateDistance(point, nearest);
    
    for (const corridor of corridors) {
      const distance = calculateDistance(point, corridor);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = corridor;
      }
    }
    
    return nearest;
  }
  
  // Find the best waypoints to use for this route
  const startCorridor = findNearestCorridor(start, mainCorridors);
  const endCorridor = findNearestCorridor(end, mainCorridors);
  
  // Build path through waypoints
  const path: any[] = [start];
  
  // Add entry to corridor system
  if (calculateDistance(start, startCorridor) > 0.05) {
    path.push(startCorridor);
  }
  
  // Add intermediate waypoints if needed
  if (startCorridor !== endCorridor) {
    path.push(endCorridor);
  }
  
  // Add exit from corridor system
  if (calculateDistance(endCorridor, end) > 0.05) {
    path.push(end);
  } else if (path[path.length - 1] !== end) {
    path.push(end);
  }
  
  return path;
}

function generateDirections(path: any[], fromPoi: any, toPoi: any): any[] {
  if (path.length < 2) return [];
  
  const steps: any[] = [];
  
  function calculateDistance(p1: any, p2: any): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  
  function estimateWalkingTime(distance: number): number {
    return Math.ceil(distance / 1.4);
  }
  
  // Starting instruction
  steps.push({
    instruction: `Start at ${fromPoi.name}`,
    distance: 0,
    duration: 0,
    direction: 'straight',
    coordinates: path[0]
  });
  
  // Generate intermediate steps
  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1];
    const current = path[i];
    const distance = calculateDistance(prev, current) * 100; // Convert to meters
    const duration = estimateWalkingTime(distance);
    
    let instruction = '';
    if (i === 1) {
      instruction = `Head towards the main corridor`;
    } else if (i === path.length - 2) {
      instruction = `Turn towards your destination`;
    } else {
      instruction = `Continue straight through the corridor`;
    }
    
    steps.push({
      instruction,
      distance: Math.round(distance),
      duration,
      direction: 'straight',
      coordinates: current
    });
  }
  
  // Arrival instruction
  const finalDistance = calculateDistance(path[path.length - 2], path[path.length - 1]) * 100;
  steps.push({
    instruction: `Arrive at ${toPoi.name}`,
    distance: Math.round(finalDistance),
    duration: estimateWalkingTime(finalDistance),
    direction: 'straight',
    coordinates: path[path.length - 1]
  });
  
  return steps;
}

import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Floor Plans
  app.get("/api/floor-plans", async (req, res) => {
    try {
      const floorPlans = await storage.getFloorPlans();
      res.json(floorPlans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch floor plans" });
    }
  });

  app.get("/api/floor-plans/:id", async (req, res) => {
    try {
      const floorPlan = await storage.getFloorPlan(req.params.id);
      if (!floorPlan) {
        return res.status(404).json({ message: "Floor plan not found" });
      }
      res.json(floorPlan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch floor plan" });
    }
  });

  app.post("/api/floor-plans", async (req, res) => {
    try {
      const floorPlanData = insertFloorPlanSchema.parse(req.body);
      const floorPlan = await storage.createFloorPlan(floorPlanData);
      res.status(201).json(floorPlan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid floor plan data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create floor plan" });
    }
  });

  app.put("/api/floor-plans/:id", async (req, res) => {
    try {
      const updateData = insertFloorPlanSchema.partial().parse(req.body);
      const floorPlan = await storage.updateFloorPlan(req.params.id, updateData);
      if (!floorPlan) {
        return res.status(404).json({ message: "Floor plan not found" });
      }
      res.json(floorPlan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid floor plan data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update floor plan" });
    }
  });

  app.delete("/api/floor-plans/:id", async (req, res) => {
    try {
      const success = await storage.deleteFloorPlan(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Floor plan not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete floor plan" });
    }
  });

  // POIs
  app.get("/api/floor-plans/:floorPlanId/pois", async (req, res) => {
    try {
      const pois = await storage.getPoisByFloorPlan(req.params.floorPlanId);
      res.json(pois);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch POIs" });
    }
  });

  app.get("/api/pois/:id", async (req, res) => {
    try {
      const poi = await storage.getPoi(req.params.id);
      if (!poi) {
        return res.status(404).json({ message: "POI not found" });
      }
      res.json(poi);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch POI" });
    }
  });

  app.post("/api/pois", async (req, res) => {
    try {
      const poiData = insertPoiSchema.parse(req.body);
      const poi = await storage.createPoi(poiData);
      res.status(201).json(poi);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid POI data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create POI" });
    }
  });

  app.put("/api/pois/:id", async (req, res) => {
    try {
      const updateData = insertPoiSchema.partial().parse(req.body);
      const poi = await storage.updatePoi(req.params.id, updateData);
      if (!poi) {
        return res.status(404).json({ message: "POI not found" });
      }
      res.json(poi);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid POI data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update POI" });
    }
  });

  app.delete("/api/pois/:id", async (req, res) => {
    try {
      const success = await storage.deletePoi(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "POI not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete POI" });
    }
  });

  // Route calculation
  app.post("/api/routes/calculate", async (req, res) => {
    try {
      const { fromPoiId, toPoiId } = req.body;
      
      if (!fromPoiId || !toPoiId) {
        return res.status(400).json({ message: "From and to POI IDs are required" });
      }

      const fromPoi = await storage.getPoi(fromPoiId);
      const toPoi = await storage.getPoi(toPoiId);

      if (!fromPoi || !toPoi) {
        return res.status(404).json({ message: "One or both POIs not found" });
      }

      // Enhanced pathfinding with waypoints
      const path = findPath(
        { x: fromPoi.x, y: fromPoi.y },
        { x: toPoi.x, y: toPoi.y }
      );

      // Calculate total distance
      let totalDistance = 0;
      for (let i = 1; i < path.length; i++) {
        const dist = Math.sqrt(
          Math.pow(path[i].x - path[i-1].x, 2) + Math.pow(path[i].y - path[i-1].y, 2)
        ) * 100; // Convert to meters
        totalDistance += dist;
      }

      const estimatedTime = Math.ceil(totalDistance / 1.4); // Walking speed ~1.4 m/s

      // Generate turn-by-turn directions
      const directions = generateDirections(path, fromPoi, toPoi);

      const route = {
        floorPlanId: fromPoi.floorPlanId,
        fromPoiId,
        toPoiId,
        path,
        distance: Math.round(totalDistance),
        estimatedTime,
        directions
      };

      const savedRoute = await storage.createRoute(route);
      res.json(savedRoute);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate route" });
    }
  });

  // Search POIs
  app.get("/api/pois/search", async (req, res) => {
    try {
      const { q, floorPlanId } = req.query;
      
      let pois;
      if (floorPlanId) {
        pois = await storage.getPoisByFloorPlan(floorPlanId as string);
      } else {
        // Get all POIs if no floor plan specified
        const allFloorPlans = await storage.getFloorPlans();
        const allPois = await Promise.all(
          allFloorPlans.map(fp => storage.getPoisByFloorPlan(fp.id))
        );
        pois = allPois.flat();
      }

      if (q) {
        const query = (q as string).toLowerCase();
        pois = pois.filter(poi => 
          poi.name.toLowerCase().includes(query) ||
          poi.category.toLowerCase().includes(query) ||
          poi.subcategory?.toLowerCase().includes(query)
        );
      }

      res.json(pois);
    } catch (error) {
      res.status(500).json({ message: "Failed to search POIs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
