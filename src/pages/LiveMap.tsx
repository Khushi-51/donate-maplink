
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { mockFoodDonations } from "@/services/mockData";
import { FoodDonation } from "@/types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { 
  CalendarIcon,
  Search,
  SlidersHorizontal,
  X,
  Clock,
  Calendar as CalendarIcon2,
  Package,
  MapPin,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const foodTypes = [
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "grains", label: "Grains & Cereals" },
  { id: "dairy", label: "Dairy" },
  { id: "bakery", label: "Bakery Items" },
  { id: "canned", label: "Canned Goods" },
  { id: "frozen", label: "Frozen Foods" },
  { id: "prepared", label: "Prepared Meals" },
];

// Mock map component - in a real app, this would use a library like Mapbox or Google Maps
const MockMap: React.FC<{
  donations: FoodDonation[];
  onSelectDonation: (donation: FoodDonation) => void;
}> = ({ donations, onSelectDonation }) => {
  return (
    <div className="bg-gray-100 rounded-lg h-full w-full relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-lg text-muted-foreground">
          Interactive map would display here
        </div>
      </div>
      
      {/* Mock map markers */}
      <div className="absolute inset-0 p-8">
        <div className="relative w-full h-full">
          {donations.map((donation) => (
            <button
              key={donation.id}
              className="absolute donation-marker animate-pulse-slow"
              style={{ 
                left: `${10 + Math.random() * 80}%`, 
                top: `${10 + Math.random() * 80}%` 
              }}
              onClick={() => onSelectDonation(donation)}
            />
          ))}
        </div>
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </Button>
        <Button size="icon" variant="secondary" className="bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14"/></svg>
        </Button>
        <Button size="icon" variant="secondary" className="bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-locate"><path d="M2 12h3"/><path d="M19 12h3"/><path d="M12 2v3"/><path d="M12 19v3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg>
        </Button>
      </div>
      
      <div className="absolute bottom-4 left-4">
        <Card className="w-auto">
          <CardContent className="p-2">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-maplink-green"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-maplink-orange"></div>
                <span>Expires Soon</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const LiveMap = () => {
  const { user, loading } = useRequireAuth("/login");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);
  
  const [availableDonations, setAvailableDonations] = useState<FoodDonation[]>([]);

  useEffect(() => {
    // In a real app, this would be a real-time subscription
    setAvailableDonations(mockFoodDonations.filter(d => d.status === "available"));
  }, []);

  const handleFoodTypeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedFoodTypes([...selectedFoodTypes, id]);
    } else {
      setSelectedFoodTypes(selectedFoodTypes.filter((type) => type !== id));
    }
  };

  const handleRequestPickup = () => {
    // In a real app, this would send a request to the server
    // For now, just close the donation details
    setSelectedDonation(null);
  };

  // Filter the donations based on search term and filters
  const filteredDonations = availableDonations.filter(donation => {
    // Filter by search term
    if (searchTerm && !donation.foodName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by food type
    if (selectedFoodTypes.length > 0 && !donation.foodType.some(type => selectedFoodTypes.includes(type))) {
      return false;
    }
    
    // Filter by expiry date
    if (dateRange && new Date(donation.expiryDate) > dateRange) {
      return false;
    }
    
    return true;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedFoodTypes([]);
    setDateRange(undefined);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-maplink-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Food Surplus Map
            </h1>
            <p className="text-muted-foreground">
              Find available food donations near you
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(searchTerm || selectedFoodTypes.length > 0 || dateRange) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9"
              >
                <X className="mr-1 h-4 w-4" /> Clear
              </Button>
            )}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search food..."
                className="pl-9 w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-9"
            >
              <SlidersHorizontal className="mr-1 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Food Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {foodTypes.map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`filter-${type.id}`}
                          checked={selectedFoodTypes.includes(type.id)}
                          onCheckedChange={(checked) =>
                            handleFoodTypeChange(type.id, checked === true)
                          }
                        />
                        <Label
                          htmlFor={`filter-${type.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Expiry Date</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange ? (
                          <span>Expires before {format(dateRange, "PPP")}</span>
                        ) : (
                          <span>Pick an expiry date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange}
                        onSelect={setDateRange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Distance</h3>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="5">Within 5 km</option>
                    <option value="10">Within 10 km</option>
                    <option value="25">Within 25 km</option>
                    <option value="50">Within 50 km</option>
                    <option value="100">Within 100 km</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Map and results section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 h-[500px]">
            <CardContent className="p-0 h-full">
              <MockMap 
                donations={filteredDonations} 
                onSelectDonation={setSelectedDonation} 
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Available Donations</CardTitle>
                  <Badge variant="outline" className="text-maplink-green">
                    {filteredDonations.length} found
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-y-auto">
                {filteredDonations.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                    <p className="mt-2 text-muted-foreground">No donations found</p>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your filters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className={cn(
                          "p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                          selectedDonation?.id === donation.id && "border-primary bg-muted"
                        )}
                        onClick={() => setSelectedDonation(donation)}
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{donation.foodName}</h3>
                          {donation.expiryRiskLevel === "high" && (
                            <Badge variant="outline" className="bg-red-100 text-red-800">
                              Expires Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {donation.quantity} {donation.unit} · {donation.foodType.join(", ")}
                        </p>
                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {donation.location.address.split(",")[0]}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected donation details */}
            {selectedDonation && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Donation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedDonation.imageUrl && (
                    <img
                      src={selectedDonation.imageUrl}
                      alt={selectedDonation.foodName}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{selectedDonation.foodName}</h3>
                    <p className="text-muted-foreground">
                      {selectedDonation.quantity} {selectedDonation.unit} · {selectedDonation.foodType.join(", ")}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{selectedDonation.description || "No description provided"}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{selectedDonation.location.address}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Expires: {new Date(selectedDonation.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {user?.role === "ngo" && (
                    <Button className="w-full" onClick={handleRequestPickup}>
                      Request Pickup
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveMap;
