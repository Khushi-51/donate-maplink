
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { toast } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, MapPinIcon, UploadCloud } from "lucide-react";

const foodTypes = [
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "grains", label: "Grains & Cereals" },
  { id: "dairy", label: "Dairy" },
  { id: "bakery", label: "Bakery Items" },
  { id: "canned", label: "Canned Goods" },
  { id: "frozen", label: "Frozen Foods" },
  { id: "snacks", label: "Snacks" },
  { id: "beverages", label: "Beverages" },
  { id: "prepared", label: "Prepared Meals" },
];

const DonateFood = () => {
  const { user, loading } = useRequireAuth("/login", "donor");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    unit: "kg",
    foodType: [] as string[],
    description: "",
    location: "",
    coordinates: { lat: 0, lng: 0 },
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default: 7 days from now
    image: null as File | null,
    previewUrl: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFoodTypeChange = (id: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        foodType: [...formData.foodType, id],
      });
    } else {
      setFormData({
        ...formData,
        foodType: formData.foodType.filter((type) => type !== id),
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, expiryDate: date });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  // Simulating getting user's current location
  const handleGetLocation = () => {
    setShowMap(true);
    // For demo purposes, setting a fixed location
    setTimeout(() => {
      setFormData({
        ...formData,
        location: "123 Main Street, New York, NY 10001",
        coordinates: { lat: 40.7128, lng: -74.006 },
      });
      setShowMap(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.foodName || !formData.quantity || formData.foodType.length === 0 || !formData.location) {
      toast.error("Missing information", {
        description: "Please fill all required fields",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Donation created successfully", {
        description: "Your food donation has been listed",
      });
      
      // Navigate to dashboard
      navigate("/dashboard/donor");
      
    } catch (error) {
      toast.error("Failed to create donation", {
        description: "Please try again later",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-maplink-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Donate Food
          </h1>
          <p className="text-muted-foreground">
            Share your surplus food with those who need it
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Food Donation Details</CardTitle>
            <CardDescription>
              Fill in the details about the food you wish to donate
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Food Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="foodName">
                      Food Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="foodName"
                      name="foodName"
                      placeholder="e.g., Fresh Vegetables, Bread Loaves"
                      value={formData.foodName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">
                        Quantity <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="0"
                        placeholder="5"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <select
                        id="unit"
                        name="unit"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.unit}
                        onChange={handleInputChange}
                      >
                        <option value="kg">Kilograms (kg)</option>
                        <option value="g">Grams (g)</option>
                        <option value="lbs">Pounds (lbs)</option>
                        <option value="pieces">Pieces</option>
                        <option value="boxes">Boxes</option>
                        <option value="packs">Packs</option>
                        <option value="cans">Cans</option>
                        <option value="bottles">Bottles</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">
                      Expiry Date <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.expiryDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.expiryDate ? (
                            format(formData.expiryDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.expiryDate}
                          onSelect={handleDateChange}
                          initialFocus
                          disabled={(date) =>
                            date < new Date() || 
                            date > new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Food Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {foodTypes.map((type) => (
                        <div
                          key={type.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={type.id}
                            checked={formData.foodType.includes(type.id)}
                            onCheckedChange={(checked) =>
                              handleFoodTypeChange(type.id, checked === true)
                            }
                          />
                          <Label
                            htmlFor={type.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the food items, condition, allergen information, etc."
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Pickup Location <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        name="location"
                        placeholder="Enter your address"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGetLocation}
                        className="flex-shrink-0"
                      >
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {showMap ? "Getting Location..." : "Get Location"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Food Image</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-md p-4">
                      {formData.previewUrl ? (
                        <div className="relative">
                          <img
                            src={formData.previewUrl}
                            alt="Food preview"
                            className="mx-auto h-40 object-contain rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                image: null,
                                previewUrl: "",
                              })
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center h-40 cursor-pointer"
                        >
                          <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-1">
                            Click to upload an image
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or GIF, max 5MB
                          </p>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <Separator />

            <CardFooter className="pt-6">
              <div className="flex flex-col xs:flex-row gap-3 w-full justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Donation
                    </>
                  ) : (
                    "Submit Donation"
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonateFood;
