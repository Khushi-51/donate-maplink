import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Timer, Brain, AlertTriangle, ThermometerIcon, DropletIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const foodCategories = [
  { id: "fruits", label: "Fruits", examples: "Apples, Bananas, Oranges" },
  { id: "vegetables", label: "Vegetables", examples: "Carrots, Spinach, Tomatoes" },
  { id: "dairy", label: "Dairy", examples: "Milk, Cheese, Yogurt" },
  { id: "meat", label: "Meat", examples: "Chicken, Beef, Pork" },
  { id: "seafood", label: "Seafood", examples: "Fish, Shrimp, Crab" },
  { id: "bakery", label: "Bakery", examples: "Bread, Pastries, Cakes" },
  { id: "grains", label: "Grains", examples: "Rice, Pasta, Cereal" },
  { id: "prepared", label: "Prepared Foods", examples: "Sandwiches, Salads, Soups" },
  { id: "canned", label: "Canned Goods", examples: "Beans, Soup, Vegetables" },
];

type ExpiryRiskLevel = 'low' | 'medium' | 'high';
type PredictionResult = {
  estimatedDays: number;
  expiryDate: Date;
  riskLevel: ExpiryRiskLevel;
  riskPercentage: number;
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
  tips: string[];
};

const AIExpiryPrediction = () => {
  const { user, loading } = useRequireAuth("/login");
  
  const [foodName, setFoodName] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [openedAlready, setOpenedAlready] = useState<string>("no");
  const [storageLocation, setStorageLocation] = useState("refrigerator");
  const [temperature, setTemperature] = useState([4]);
  const [humidity, setHumidity] = useState([50]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async () => {
    if (!foodName || !foodCategory) {
      toast.error("Missing information", {
        description: "Please fill in the food name and category",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let estimatedDays = 7;
    
    switch (foodCategory) {
      case "fruits":
        estimatedDays = 5;
        break;
      case "vegetables":
        estimatedDays = 6;
        break;
      case "dairy":
        estimatedDays = 7;
        break;
      case "meat":
        estimatedDays = 3;
        break;
      case "seafood":
        estimatedDays = 2;
        break;
      case "bakery":
        estimatedDays = 4;
        break;
      case "grains":
        estimatedDays = 90;
        break;
      case "prepared":
        estimatedDays = 3;
        break;
      case "canned":
        estimatedDays = 365;
        break;
    }
    
    if (openedAlready === "yes") {
      estimatedDays = Math.round(estimatedDays * 0.6);
    }
    
    if (storageLocation === "pantry") {
      estimatedDays = Math.round(estimatedDays * 0.8);
    } else if (storageLocation === "freezer") {
      estimatedDays = estimatedDays * 3;
    }
    
    if (storageLocation === "refrigerator") {
      if (temperature[0] > 5) {
        estimatedDays = Math.round(estimatedDays * 0.8);
      } else if (temperature[0] < 2) {
        estimatedDays = Math.round(estimatedDays * 1.1);
      }
    }
    
    const expiryDate = new Date(purchaseDate);
    expiryDate.setDate(expiryDate.getDate() + estimatedDays);
    
    let riskLevel: ExpiryRiskLevel = "low";
    let riskPercentage = 30;
    
    if (estimatedDays <= 3) {
      riskLevel = "high";
      riskPercentage = 80;
    } else if (estimatedDays <= 7) {
      riskLevel = "medium";
      riskPercentage = 50;
    }
    
    const factors = [
      {
        name: "Storage Temperature",
        impact: temperature[0] < 5 ? "positive" as const : "negative" as const,
        description: temperature[0] < 5
          ? "Optimal low temperature slows bacterial growth"
          : "Higher temperature accelerates spoilage"
      },
      {
        name: "Package Status",
        impact: openedAlready === "yes" ? "negative" as const : "positive" as const,
        description: openedAlready === "yes"
          ? "Opened packaging exposes food to air and contaminants"
          : "Sealed packaging protects from external factors"
      },
      {
        name: "Food Category",
        impact: ["meat", "seafood", "dairy"].includes(foodCategory) ? "negative" as const : "neutral" as const,
        description: ["meat", "seafood", "dairy"].includes(foodCategory)
          ? "This category typically has shorter shelf life"
          : "This category has average shelf stability"
      }
    ];
    
    const tips = [
      "Store in an airtight container to prolong freshness",
      "Keep away from direct sunlight",
      foodCategory === "fruits" || foodCategory === "vegetables" 
        ? "Store in the crisper drawer of your refrigerator" 
        : "Maintain consistent temperature in your storage area",
      openedAlready === "yes"
        ? "Consume within 1-2 days for best quality"
        : "Keep sealed until ready to use"
    ];
    
    setResult({
      estimatedDays,
      expiryDate,
      riskLevel,
      riskPercentage,
      factors,
      tips
    });
    
    setIsAnalyzing(false);
  };

  const resetForm = () => {
    setFoodName("");
    setFoodCategory("");
    setPurchaseDate(new Date());
    setOpenedAlready("no");
    setStorageLocation("refrigerator");
    setTemperature([4]);
    setHumidity([50]);
    setResult(null);
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              AI Expiry Prediction
            </h1>
            <p className="text-muted-foreground">
              Predict food expiry dates using artificial intelligence
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Food Details</CardTitle>
                <CardDescription>
                  Enter information about your food item
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="foodName">Food Name</Label>
                  <Input
                    id="foodName"
                    placeholder="e.g., Apples, Milk, Chicken"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foodCategory">Food Category</Label>
                  <Select value={foodCategory} onValueChange={setFoodCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label} <span className="text-muted-foreground text-xs">({category.examples})</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Purchase/Reception Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !purchaseDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {purchaseDate ? (
                          format(purchaseDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={purchaseDate}
                        onSelect={(date) => date && setPurchaseDate(date)}
                        initialFocus
                        disabled={(date) =>
                          date > new Date() || 
                          date < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Has the package been opened?</Label>
                  <RadioGroup
                    value={openedAlready}
                    onValueChange={setOpenedAlready}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="opened-yes" />
                      <Label htmlFor="opened-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="opened-no" />
                      <Label htmlFor="opened-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Conditions</CardTitle>
                <CardDescription>
                  Specify how the food is being stored
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Storage Location</Label>
                  <RadioGroup
                    value={storageLocation}
                    onValueChange={setStorageLocation}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="refrigerator" id="refrigerator" className="sr-only" />
                      <Label htmlFor="refrigerator" className="cursor-pointer">
                        <ThermometerIcon className="h-6 w-6 mb-2" />
                        Refrigerator
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="freezer" id="freezer" className="sr-only" />
                      <Label htmlFor="freezer" className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mb-2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 7v10"/><path d="m7 12 10 0"/></svg>
                        Freezer
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="pantry" id="pantry" className="sr-only" />
                      <Label htmlFor="pantry" className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mb-2"><path d="M4 22V10c0-4.4 3.6-8 8-8s8 3.6 8 8v12"/><rect width="8" height="4" x="8" y="18"/></svg>
                        Pantry
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {storageLocation === "refrigerator" && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Temperature (°C)</Label>
                      <span className="text-sm">{temperature[0]}°C</span>
                    </div>
                    <Slider
                      value={temperature}
                      max={10}
                      min={0}
                      step={1}
                      onValueChange={setTemperature}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0°C</span>
                      <span>10°C</span>
                    </div>
                  </div>
                )}

                {storageLocation === "pantry" && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="flex items-center gap-1">
                        <DropletIcon className="h-4 w-4" /> Humidity
                      </Label>
                      <span className="text-sm">{humidity[0]}%</span>
                    </div>
                    <Slider
                      value={humidity}
                      max={100}
                      min={0}
                      step={5}
                      onValueChange={setHumidity}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0% (Dry)</span>
                      <span>100% (Humid)</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
                  <Button className="w-full" onClick={handlePredict} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Predict Expiry
                      </>
                    )}
                  </Button>
                  {result && (
                    <Button variant="outline" className="w-full" onClick={resetForm}>
                      Reset Form
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            {result ? (
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span>Prediction Results</span>
                    <Badge
                      className={
                        result.riskLevel === "low" 
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : result.riskLevel === "medium"
                          ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {result.riskLevel === "low" 
                        ? "Low Risk" 
                        : result.riskLevel === "medium" 
                        ? "Medium Risk" 
                        : "High Risk"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {foodName} - {foodCategories.find(c => c.id === foodCategory)?.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm mb-1">Est. Expiry Date</p>
                      <p className="text-lg font-medium">
                        {format(result.expiryDate, "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm mb-1">Days Until Expiry</p>
                      <p className="text-lg font-medium">
                        {result.estimatedDays} days
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium">Expiry Risk</h3>
                      <span className="text-sm">{result.riskPercentage}%</span>
                    </div>
                    <Progress
                      value={result.riskPercentage}
                      className={
                        result.riskLevel === "low" 
                          ? "bg-green-100" 
                          : result.riskLevel === "medium" 
                          ? "bg-orange-100" 
                          : "bg-red-100"
                      }
                    />
                    {result.riskLevel === "high" && (
                      <div className="flex items-start mt-2 gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          This food is at high risk of expiring soon. Consider consuming it promptly
                          or properly storing it to extend its life.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Factors Affecting Shelf Life</h3>
                    <div className="space-y-2">
                      {result.factors.map((factor, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium text-sm">{factor.name}</h4>
                            <Badge
                              variant="outline"
                              className={
                                factor.impact === "positive" 
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : factor.impact === "negative"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {factor.impact}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Storage Tips</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 h-5 w-5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                      <p className="text-sm text-blue-600">
                        This prediction is based on general food storage guidelines and environmental factors. 
                        Always use your senses (smell, taste, appearance) to check if food is still good before consuming.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full">
                <div className="flex flex-col justify-center items-center h-full py-16 text-center">
                  <Brain className="h-16 w-16 text-muted-foreground opacity-30" />
                  <h3 className="text-lg font-medium mt-4">AI Food Expiry Prediction</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    Fill in the details about your food item and its storage conditions to get an AI-powered prediction of its expiry date.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-6 w-full max-w-md">
                    <div className="flex flex-col items-center">
                      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center mb-2">
                        <Timer className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Precise Expiry Prediction
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Risk Assessment
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/><path d="M8 13h0"/><path d="M16 13h0"/></svg>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Storage Tips
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIExpiryPrediction;
