export interface Point {
  x: number;
  y: number;
}

export interface MapTool {
  id: string;
  name: string;
  icon: string;
  cursor: string;
}

export interface MapState {
  zoom: number;
  centerX: number;
  centerY: number;
  activeTool: string;
  selectedPoiId?: string;
  isDragging: boolean;
  dragStart?: Point;
}

export interface RouteResult {
  path: Point[];
  distance: number;
  estimatedTime: number;
  fromPoiId: string;
  toPoiId: string;
  directions?: DirectionStep[];
}

export interface DirectionStep {
  instruction: string;
  distance: number;
  duration: number;
  direction: 'straight' | 'left' | 'right' | 'slight_left' | 'slight_right' | 'sharp_left' | 'sharp_right';
  coordinates: Point;
}
