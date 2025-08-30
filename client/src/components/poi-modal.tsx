import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import type { Poi } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  poi: Poi | null;
  floorPlanId: string;
}

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "dining", label: "Dining" },
  { value: "services", label: "Services" },
  { value: "amenities", label: "Amenities" },
  { value: "entrance", label: "Entrance" },
];

const CATEGORY_COLORS = {
  electronics: "#10b981",
  clothing: "#8b5cf6",
  dining: "#f59e0b",
  services: "#3b82f6",
  amenities: "#ef4444",
  entrance: "#6366f1",
};

export default function PoiModal({ isOpen, onClose, poi, floorPlanId }: PoiModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "general",
    subcategory: "",
    description: "",
    color: "#10b981",
    icon: "fas fa-map-pin",
    type: "point" as "point" | "rectangle",
    width: 0.1,
    height: 0.1,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updatePoiMutation = useMutation({
    mutationFn: async (updatedPoi: any) => {
      const response = await apiRequest("PUT", `/api/pois/${poi?.id}`, updatedPoi);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/floor-plans", floorPlanId, "pois"] });
      toast({ title: "POI updated successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to update POI", variant: "destructive" });
    },
  });

  const deletePoiMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/pois/${poi?.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/floor-plans", floorPlanId, "pois"] });
      toast({ title: "POI deleted successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to delete POI", variant: "destructive" });
    },
  });

  useEffect(() => {
    if (poi) {
      setFormData({
        name: poi.name,
        category: poi.category,
        subcategory: poi.subcategory || "",
        description: poi.description || "",
        color: poi.color || "#10b981",
        icon: poi.icon || "fas fa-map-pin",
        type: poi.type || "point",
        width: poi.width || 0.1,
        height: poi.height || 0.1,
      });
    }
  }, [poi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (poi) {
      updatePoiMutation.mutate(formData);
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category,
      color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || "#10b981",
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-96 max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Edit POI</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <Input
              id="subcategory"
              value={formData.subcategory}
              onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
              placeholder="Optional"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon Class</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="fas fa-map-pin"
              />
            </div>
          </div>

          {/* Rectangle dimensions for rectangle POIs */}
          {formData.type === "rectangle" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width</Label>
                  <Input
                    type="number"
                    id="width"
                    value={formData.width}
                    onChange={(e) => setFormData(prev => ({ ...prev, width: parseFloat(e.target.value) || 0.1 }))}
                    min="0.05"
                    max="1"
                    step="0.05"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    type="number"
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: parseFloat(e.target.value) || 0.1 }))}
                    min="0.05"
                    max="1"
                    step="0.05"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Values are proportional to map size (0.05 - 1.0)
              </div>
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="destructive"
              className="flex-1"
              onClick={() => deletePoiMutation.mutate()}
              disabled={deletePoiMutation.isPending}
            >
              Delete
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={updatePoiMutation.isPending}
            >
              Save POI
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
