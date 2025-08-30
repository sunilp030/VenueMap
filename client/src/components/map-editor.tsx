import { useState, useRef, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  MousePointer, 
  MapPin, 
  Route,
  Search,
  Navigation,
  Square
} from "lucide-react";
import type { Poi } from "@shared/schema";
import type { MapState, Point, RouteResult } from "@/types/map";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import PoiModal from "@/components/poi-modal";
import NavigationPanel from "@/components/navigation-panel";
import FloorPlanView from "./floor-plan-view";

interface MapEditorProps {
  floorPlanId: string;
  pois: Poi[];
  isLoading: boolean;
  onShowSearch: () => void;
}

const TOOLS = [
  { id: "select", name: "Select", icon: MousePointer, cursor: "default" },
  { id: "poi", name: "POI", icon: MapPin, cursor: "crosshair" },
  { id: "rectangle", name: "Rectangle POI", icon: Square, cursor: "crosshair" },
  { id: "path", name: "Path", icon: Route, cursor: "crosshair" },
];

export default function MapEditor({ floorPlanId, pois, isLoading, onShowSearch }: MapEditorProps) {
  const [mapState, setMapState] = useState<MapState>({
    zoom: 1,
    centerX: 0.5,
    centerY: 0.5,
    activeTool: "select",
    isDragging: false,
  });
  
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);
  const [showPoiModal, setShowPoiModal] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [navigationFrom, setNavigationFrom] = useState<string>("");
  const [navigationTo, setNavigationTo] = useState<string>("");
  const [currentRoute, setCurrentRoute] = useState<RouteResult | null>(null);
  
  // Zoom and pan state
  const [transform, setTransform] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0
  });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  // Rectangle drawing state
  const [isDrawingRectangle, setIsDrawingRectangle] = useState(false);
  const [rectangleStart, setRectangleStart] = useState<{ x: number, y: number } | null>(null);
  const [rectangleEnd, setRectangleEnd] = useState<{ x: number, y: number } | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPoiMutation = useMutation({
    mutationFn: async (newPoi: any) => {
      const response = await apiRequest("POST", "/api/pois", newPoi);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/floor-plans", floorPlanId, "pois"] });
      toast({ title: "POI created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create POI", variant: "destructive" });
    },
  });

  const calculateRouteMutation = useMutation({
    mutationFn: async ({ fromPoiId, toPoiId }: { fromPoiId: string; toPoiId: string }) => {
      const response = await apiRequest("POST", "/api/routes/calculate", { fromPoiId, toPoiId });
      return response.json();
    },
    onSuccess: (route) => {
      setCurrentRoute(route);
      toast({ title: "Route calculated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to calculate route", variant: "destructive" });
    },
  });

  // Zoom and pan event handlers
  const handleWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const delta = -event.deltaY / 1000;
    const newScale = Math.min(Math.max(transform.scale + delta, 0.5), 3);
    
    // Calculate new translation to zoom towards mouse position
    const scaleChange = newScale / transform.scale;
    const newTranslateX = mouseX - (mouseX - transform.translateX) * scaleChange;
    const newTranslateY = mouseY - (mouseY - transform.translateY) * scaleChange;
    
    setTransform({
      scale: newScale,
      translateX: newTranslateX,
      translateY: newTranslateY
    });
  }, [transform]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (mapState.activeTool === "select" || event.button === 1) { // Middle mouse button or select tool
      setIsPanning(true);
      setPanStart({ x: event.clientX - transform.translateX, y: event.clientY - transform.translateY });
      event.preventDefault();
    }
  }, [mapState.activeTool, transform.translateX, transform.translateY]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (isPanning) {
      setTransform(prev => ({
        ...prev,
        translateX: event.clientX - panStart.x,
        translateY: event.clientY - panStart.y
      }));
    } else if (isDrawingRectangle && rectangleStart && canvasRef.current) {
      // Update rectangle preview during drawing
      const rect = canvasRef.current.getBoundingClientRect();
      const rawX = (event.clientX - rect.left - transform.translateX) / transform.scale;
      const rawY = (event.clientY - rect.top - transform.translateY) / transform.scale;
      const x = rawX / rect.width;
      const y = rawY / rect.height;
      
      setRectangleEnd({
        x: snapToGrid ? Math.round(x * 20) / 20 : x,
        y: snapToGrid ? Math.round(y * 20) / 20 : y
      });
    }
  }, [isPanning, panStart, isDrawingRectangle, rectangleStart, transform, snapToGrid]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const resetView = useCallback(() => {
    setTransform({
      scale: 1,
      translateX: 0,
      translateY: 0
    });
  }, []);

  const zoomIn = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 3)
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.5)
    }));
  }, []);

  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    if (!canvasRef.current || isPanning) return;

    const rect = canvasRef.current.getBoundingClientRect();
    // Adjust coordinates for transform
    const rawX = (event.clientX - rect.left - transform.translateX) / transform.scale;
    const rawY = (event.clientY - rect.top - transform.translateY) / transform.scale;
    const x = rawX / rect.width;
    const y = rawY / rect.height;

    if (mapState.activeTool === "poi") {
      const newPoi = {
        floorPlanId,
        name: `New POI`,
        category: "general",
        type: "point" as const,
        x: snapToGrid ? Math.round(x * 20) / 20 : x,
        y: snapToGrid ? Math.round(y * 20) / 20 : y,
        color: "#10b981",
        icon: "fas fa-map-pin",
      };
      
      createPoiMutation.mutate(newPoi);
    } else if (mapState.activeTool === "rectangle") {
      if (!isDrawingRectangle) {
        // Start rectangle
        setIsDrawingRectangle(true);
        setRectangleStart({
          x: snapToGrid ? Math.round(x * 20) / 20 : x,
          y: snapToGrid ? Math.round(y * 20) / 20 : y
        });
        setRectangleEnd(null);
      } else {
        // Complete rectangle
        const endX = snapToGrid ? Math.round(x * 20) / 20 : x;
        const endY = snapToGrid ? Math.round(y * 20) / 20 : y;
        
        if (rectangleStart) {
          const centerX = (rectangleStart.x + endX) / 2;
          const centerY = (rectangleStart.y + endY) / 2;
          const width = Math.abs(endX - rectangleStart.x);
          const height = Math.abs(endY - rectangleStart.y);
          
          const newPoi = {
            floorPlanId,
            name: `Rectangle Area`,
            category: "area",
            type: "rectangle" as const,
            x: centerX,
            y: centerY,
            width,
            height,
            color: "#3b82f6",
            icon: "fas fa-square",
          };
          
          createPoiMutation.mutate(newPoi);
        }
        
        setIsDrawingRectangle(false);
        setRectangleStart(null);
        setRectangleEnd(null);
      }
    }
  }, [floorPlanId, mapState.activeTool, snapToGrid, createPoiMutation, isDrawingRectangle, rectangleStart, transform, isPanning]);

  const handlePoiClick = useCallback((poi: Poi, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedPoi(poi);
    
    if (mapState.activeTool === "select") {
      setShowPoiModal(true);
    }
  }, [mapState.activeTool]);



  const handleFindRoute = useCallback(() => {
    if (navigationFrom && navigationTo) {
      calculateRouteMutation.mutate({
        fromPoiId: navigationFrom,
        toPoiId: navigationTo,
      });
    }
  }, [navigationFrom, navigationTo, calculateRouteMutation]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <>
      {/* Top Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Tools */}
            <div className="flex items-center space-x-2">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Button
                    key={tool.id}
                    variant={mapState.activeTool === tool.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMapState(prev => ({ ...prev, activeTool: tool.id }))}
                    className="h-10 w-10 p-0"
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                );
              })}
            </div>

            <div className="w-px h-6 bg-gray-300"></div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={zoomOut} title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600 px-2 min-w-[4rem] text-center">
                {Math.round(transform.scale * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={zoomIn} title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetView} title="Reset View">
                <Maximize className="w-4 h-4" />
              </Button>
              <div className="text-xs text-gray-500 ml-2">
                Scroll to zoom • Drag to pan
                {mapState.activeTool === "rectangle" && isDrawingRectangle && 
                  " • Click again to finish rectangle"
                }
                {mapState.activeTool === "rectangle" && !isDrawingRectangle && 
                  " • Click to start rectangle area"
                }
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="grid" 
                checked={showGrid} 
                onCheckedChange={(checked) => setShowGrid(checked === true)}
              />
              <Label htmlFor="grid" className="text-sm">Grid</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="snap" 
                checked={snapToGrid} 
                onCheckedChange={(checked) => setSnapToGrid(checked === true)}
              />
              <Label htmlFor="snap" className="text-sm">Snap</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        <div
          ref={canvasRef}
          className={`w-full h-full relative ${isPanning ? 'cursor-grabbing' : mapState.activeTool === 'select' ? 'cursor-grab' : 'cursor-crosshair'} ${showGrid ? 'map-canvas' : ''}`}
          onClick={handleCanvasClick}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Floor Plan Background */}
          <div className="absolute inset-0 w-full h-full">
            <FloorPlanView />
          </div>
          {/* POI Markers */}
          {pois.map((poi) => {
            if (poi.type === "rectangle" && poi.width && poi.height) {
              // Rectangle POI
              return (
                <div
                  key={poi.id}
                  className="poi-rectangle absolute border-2 border-opacity-80 bg-opacity-20"
                  style={{
                    top: `${(poi.y - poi.height/2) * 100}%`,
                    left: `${(poi.x - poi.width/2) * 100}%`,
                    width: `${poi.width * 100}%`,
                    height: `${poi.height * 100}%`,
                    backgroundColor: poi.color || "#3b82f6",
                    borderColor: poi.color || "#3b82f6",
                  }}
                  onClick={(e) => handlePoiClick(poi, e)}
                >
                  {/* Rectangle Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs font-medium text-center px-1 py-0.5 rounded text-white bg-black bg-opacity-50">
                      {poi.name}
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="poi-tooltip">
                    <div className="text-xs font-medium text-gray-900">{poi.name}</div>
                    <div className="text-xs text-gray-500">{poi.category}</div>
                  </div>
                </div>
              );
            } else {
              // Point POI
              return (
                <div
                  key={poi.id}
                  className="poi-marker absolute"
                  style={{
                    top: `${poi.y * 100}%`,
                    left: `${poi.x * 100}%`,
                    backgroundColor: poi.color || "#10b981",
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={(e) => handlePoiClick(poi, e)}
                >
                  <i className={`${poi.icon} text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></i>
                  
                  {/* Tooltip */}
                  <div className="poi-tooltip">
                    <div className="text-xs font-medium text-gray-900">{poi.name}</div>
                    <div className="text-xs text-gray-500">{poi.category}</div>
                  </div>
                </div>
              );
            }
          })}

          {/* Rectangle Drawing Preview */}
          {isDrawingRectangle && rectangleStart && rectangleEnd && (
            <div
              className="absolute border-2 border-dashed border-blue-500 bg-blue-500 bg-opacity-10 pointer-events-none"
              style={{
                top: `${Math.min(rectangleStart.y, rectangleEnd.y) * 100}%`,
                left: `${Math.min(rectangleStart.x, rectangleEnd.x) * 100}%`,
                width: `${Math.abs(rectangleEnd.x - rectangleStart.x) * 100}%`,
                height: `${Math.abs(rectangleEnd.y - rectangleStart.y) * 100}%`,
              }}
            />
          )}

          {/* Navigation Path */}
          {currentRoute && currentRoute.path && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--map-path)" />
                </marker>
              </defs>
              
              {/* Draw path segments */}
              {currentRoute.path.map((point, index) => {
                if (index === 0) return null;
                const prevPoint = currentRoute.path[index - 1];
                return (
                  <line
                    key={`path-${index}`}
                    x1={`${prevPoint.x * 100}%`}
                    y1={`${prevPoint.y * 100}%`}
                    x2={`${point.x * 100}%`}
                    y2={`${point.y * 100}%`}
                    className="navigation-path navigation-path-animated"
                    markerEnd={index === currentRoute.path.length - 1 ? "url(#arrowhead)" : undefined}
                  />
                );
              })}
              
              {/* Draw waypoint markers */}
              {currentRoute.path.map((point, index) => (
                <circle
                  key={`waypoint-${index}`}
                  cx={`${point.x * 100}%`}
                  cy={`${point.y * 100}%`}
                  r="4"
                  fill={index === 0 ? "#22c55e" : index === currentRoute.path.length - 1 ? "#ef4444" : "var(--map-path)"}
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
          )}
        </div>

        {/* Navigation Panel */}
        {showNavigation && (
          <NavigationPanel
            pois={pois}
            navigationFrom={navigationFrom}
            navigationTo={navigationTo}
            onFromChange={setNavigationFrom}
            onToChange={setNavigationTo}
            onFindRoute={handleFindRoute}
            currentRoute={currentRoute}
            onClose={() => setShowNavigation(false)}
            isCalculating={calculateRouteMutation.isPending}
          />
        )}

        {/* Mobile Navigation Controls */}
        {isMobile && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-2 flex items-center space-x-2">
            <Button
              size="sm"
              className="w-10 h-10 rounded-full p-0"
              onClick={() => setShowNavigation(true)}
            >
              <Navigation className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-10 h-10 rounded-full p-0"
              onClick={onShowSearch}
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Desktop Navigation Toggle */}
        {!isMobile && (
          <Button
            className="absolute top-4 right-4"
            onClick={() => setShowNavigation(!showNavigation)}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigation
          </Button>
        )}
      </div>

      {/* POI Modal */}
      <PoiModal
        isOpen={showPoiModal}
        onClose={() => setShowPoiModal(false)}
        poi={selectedPoi}
        floorPlanId={floorPlanId}
      />
    </>
  );
}
