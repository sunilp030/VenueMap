import { X, Navigation, Clock, MapPin, ArrowRight, RotateCw, ArrowUp } from "lucide-react";
import type { Poi } from "@shared/schema";
import type { RouteResult, DirectionStep } from "@/types/map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavigationPanelProps {
  pois: Poi[];
  navigationFrom: string;
  navigationTo: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onFindRoute: () => void;
  currentRoute: RouteResult | null;
  onClose: () => void;
  isCalculating: boolean;
}

export default function NavigationPanel({
  pois,
  navigationFrom,
  navigationTo,
  onFromChange,
  onToChange,
  onFindRoute,
  currentRoute,
  onClose,
  isCalculating,
}: NavigationPanelProps) {
  const fromPoi = pois.find(p => p.id === navigationFrom);
  const toPoi = pois.find(p => p.id === navigationTo);

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="flex-1">
            <Select value={navigationFrom} onValueChange={onFromChange}>
              <SelectTrigger>
                <SelectValue placeholder="Starting point" />
              </SelectTrigger>
              <SelectContent>
                {pois.map((poi) => (
                  <SelectItem key={poi.id} value={poi.id}>
                    {poi.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="flex-1">
            <Select value={navigationTo} onValueChange={onToChange}>
              <SelectTrigger>
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                {pois.map((poi) => (
                  <SelectItem key={poi.id} value={poi.id}>
                    {poi.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={onFindRoute}
          disabled={!navigationFrom || !navigationTo || isCalculating}
        >
          <Navigation className="w-4 h-4 mr-2" />
          {isCalculating ? "Calculating..." : "Find Route"}
        </Button>

        {currentRoute && (
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Estimated Time:
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.floor(currentRoute.estimatedTime / 60)}:{(currentRoute.estimatedTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Distance:
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(currentRoute.distance)}m
                </span>
              </div>
            </div>

            {fromPoi && toPoi && currentRoute?.directions && (
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Turn-by-turn Directions</div>
                <ScrollArea className="h-48 pr-2">
                  <div className="space-y-2">
                    {currentRoute.directions.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                          {step.direction === 'straight' && <ArrowUp className="w-4 h-4 text-gray-600" />}
                          {step.direction === 'right' && <RotateCw className="w-4 h-4 text-gray-600" />}
                          {step.direction === 'left' && <RotateCw className="w-4 h-4 text-gray-600 transform scale-x-[-1]" />}
                          {(step.direction === 'slight_right' || step.direction === 'slight_left') && <ArrowRight className="w-4 h-4 text-gray-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-900">{step.instruction}</div>
                          {step.distance > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {step.distance}m • {Math.floor(step.duration / 60)}:{(step.duration % 60).toString().padStart(2, '0')} min
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
