import type { Point } from "@/types/map";
import type { Poi } from "@shared/schema";

export interface PathNode {
  x: number;
  y: number;
  g: number; // Cost from start
  h: number; // Heuristic cost to end
  f: number; // Total cost
  parent?: PathNode;
}

export interface DirectionStep {
  instruction: string;
  distance: number;
  duration: number;
  direction: 'straight' | 'left' | 'right' | 'slight_left' | 'slight_right' | 'sharp_left' | 'sharp_right';
  coordinates: Point;
}

export function calculateDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function heuristic(current: Point, goal: Point): number {
  // Manhattan distance
  return Math.abs(goal.x - current.x) + Math.abs(goal.y - current.y);
}

export function findPath(start: Point, end: Point, obstacles: Point[] = []): Point[] {
  // Enhanced pathfinding with waypoints for more realistic navigation
  const waypoints: Point[] = [];
  
  // Define key waypoints in the mall (main corridors and intersections)
  const mainCorridors = [
    { x: 0.25, y: 0.5 },   // Left corridor
    { x: 0.45, y: 0.5 },   // Center-left intersection
    { x: 0.65, y: 0.5 },   // Center-right intersection
    { x: 0.85, y: 0.5 },   // Right corridor
    { x: 0.5, y: 0.3 },    // North corridor
    { x: 0.5, y: 0.7 },    // South corridor
  ];
  
  // Find the best waypoints to use for this route
  const startCorridor = findNearestCorridor(start, mainCorridors);
  const endCorridor = findNearestCorridor(end, mainCorridors);
  
  // Build path through waypoints
  const path: Point[] = [start];
  
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

function findNearestCorridor(point: Point, corridors: Point[]): Point {
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

export function smoothPath(path: Point[]): Point[] {
  if (path.length <= 2) return path;

  const smoothed: Point[] = [path[0]];
  
  for (let i = 1; i < path.length - 1; i++) {
    // Simple path smoothing - could be enhanced
    smoothed.push(path[i]);
  }
  
  smoothed.push(path[path.length - 1]);
  return smoothed;
}

export function estimateWalkingTime(distance: number): number {
  // Assume average walking speed of 1.4 m/s (5 km/h)
  return Math.ceil(distance / 1.4);
}

export function generateDirections(path: Point[], fromPoi: any, toPoi: any): DirectionStep[] {
  if (path.length < 2) return [];
  
  const steps: DirectionStep[] = [];
  
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
    const next = path[i + 1];
    
    const direction = calculateDirection(prev, current, next);
    const distance = calculateDistance(prev, current) * 100; // Convert to meters
    const duration = estimateWalkingTime(distance);
    
    let instruction = '';
    if (i === 1) {
      instruction = `Head towards the main corridor`;
    } else if (i === path.length - 2) {
      instruction = `Turn towards your destination`;
    } else {
      switch (direction) {
        case 'left':
          instruction = `Turn left at the intersection`;
          break;
        case 'right':
          instruction = `Turn right at the intersection`;
          break;
        case 'straight':
          instruction = `Continue straight`;
          break;
        case 'slight_left':
          instruction = `Bear left`;
          break;
        case 'slight_right':
          instruction = `Bear right`;
          break;
      }
    }
    
    steps.push({
      instruction,
      distance: Math.round(distance),
      duration,
      direction,
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

function calculateDirection(prev: Point, current: Point, next: Point): DirectionStep['direction'] {
  // Calculate vectors
  const v1 = { x: current.x - prev.x, y: current.y - prev.y };
  const v2 = { x: next.x - current.x, y: next.y - current.y };
  
  // Calculate angle between vectors
  const dot = v1.x * v2.x + v1.y * v2.y;
  const det = v1.x * v2.y - v1.y * v2.x;
  const angle = Math.atan2(det, dot) * (180 / Math.PI);
  
  // Determine direction based on angle
  if (Math.abs(angle) < 15) return 'straight';
  if (angle > 15 && angle < 45) return 'slight_left';
  if (angle >= 45 && angle < 135) return 'left';
  if (angle >= 135) return 'sharp_left';
  if (angle < -15 && angle > -45) return 'slight_right';
  if (angle <= -45 && angle > -135) return 'right';
  if (angle <= -135) return 'sharp_right';
  
  return 'straight';
}
