import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapIcon, Bell, User } from "lucide-react";
import type { FloorPlan, Poi } from "@shared/schema";
import MapEditor from "@/components/map-editor";
import SearchOverlay from "@/components/search-overlay";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [activeTab, setActiveTab] = useState("editor");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string>("exhibition-halls");
  const isMobile = useIsMobile();

  const { data: floorPlans, isLoading: floorPlansLoading } = useQuery<FloorPlan[]>({
    queryKey: ["/api/floor-plans"],
  });

  const { data: pois, isLoading: poisLoading } = useQuery<Poi[]>({
    queryKey: ["/api/floor-plans", selectedFloorPlan, "pois"],
    enabled: !!selectedFloorPlan,
  });

  const categories = [
    { name: "Booths", color: "bg-blue-500", count: pois?.filter(p => p.category === "booth").length || 0 },
    { name: "Entrances", color: "bg-gray-500", count: pois?.filter(p => p.category === "entrance").length || 0 },
    { name: "Facilities", color: "bg-green-500", count: pois?.filter(p => p.category === "facility").length || 0 },
    { name: "Hall 9", color: "bg-red-500", count: pois?.filter(p => p.subcategory === "hall-9").length || 0 },
    { name: "Hall 10", color: "bg-yellow-500", count: pois?.filter(p => p.subcategory === "hall-10").length || 0 },
    { name: "Hall 11", color: "bg-green-500", count: pois?.filter(p => p.subcategory === "hall-11").length || 0 },
    { name: "Hall 12", color: "bg-blue-500", count: pois?.filter(p => p.subcategory === "hall-12").length || 0 },
  ];

  if (floorPlansLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading MapNav Pro...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MapIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">MapNav Pro</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`pb-4 font-medium border-b-2 ${
                    activeTab === "editor"
                      ? "text-primary border-primary"
                      : "text-gray-500 hover:text-gray-700 border-transparent"
                  }`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab("navigator")}
                  className={`pb-4 font-medium border-b-2 ${
                    activeTab === "navigator"
                      ? "text-primary border-primary"
                      : "text-gray-500 hover:text-gray-700 border-transparent"
                  }`}
                >
                  Navigator
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile when search is open */}
        {(!isMobile || !showSearch) && (
          <div className={`${isMobile ? 'absolute inset-y-0 left-0 z-40 w-80' : 'w-80'} bg-white shadow-lg border-r border-gray-200 flex flex-col`}>
            {/* Floor Plans */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-gray-900">Floor Plans</h3>
              </div>
              <div className="space-y-2">
                {floorPlans?.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedFloorPlan(plan.id)}
                    className={`w-full p-3 rounded-lg border cursor-pointer transition-colors text-left ${
                      selectedFloorPlan === plan.id
                        ? "bg-primary/10 border-primary/30"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedFloorPlan === plan.id ? "bg-primary/20" : "bg-gray-100"
                      }`}>
                        <MapIcon className={`w-5 h-5 ${
                          selectedFloorPlan === plan.id ? "text-primary" : "text-gray-600"
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{plan.name}</div>
                        <div className="text-xs text-gray-500">{plan.width} x {plan.height} px</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* POI Categories */}
            <div className="p-4 flex-1 overflow-y-auto">
              <h3 className="text-md font-semibold text-gray-900 mb-4">POI Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <MapEditor
            floorPlanId={selectedFloorPlan}
            pois={pois || []}
            isLoading={poisLoading}
            onShowSearch={() => setShowSearch(true)}
          />
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        floorPlanId={selectedFloorPlan}
      />
    </div>
  );
}
