import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search, Store, MapPin } from "lucide-react";
import type { Poi } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId: string;
}

export default function SearchOverlay({ isOpen, onClose, floorPlanId }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults, isLoading } = useQuery<Poi[]>({
    queryKey: ["/api/pois/search", { q: searchQuery, floorPlanId }],
    enabled: isOpen && searchQuery.length > 0,
  });

  const handleSearchResultClick = (poi: Poi) => {
    // In a real implementation, this would navigate to the POI on the map
    console.log("Navigate to POI:", poi);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for stores, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        {isLoading && searchQuery && (
          <div className="text-center py-8 text-gray-500">
            Searching...
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
          <div className="space-y-3">
            {searchResults.map((poi) => (
              <button
                key={poi.id}
                onClick={() => handleSearchResultClick(poi)}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-left"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${poi.color}20` }}
                >
                  <i
                    className={`${poi.icon} text-sm`}
                    style={{ color: poi.color }}
                  ></i>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{poi.name}</div>
                  <div className="text-sm text-gray-500">
                    {poi.category} • Ground Floor
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        )}

        {searchResults && searchResults.length === 0 && searchQuery && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No results found for "{searchQuery}"
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-8 text-gray-500">
            Start typing to search for locations
          </div>
        )}
      </div>
    </div>
  );
}
