
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { mockFoodDonations, mockDonationRequests } from "@/services/mockData";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Clock,
  CheckCheck,
  Search,
  CalendarCheck,
  AlertCircle,
  MapPin,
  Calendar,
} from "lucide-react";

const NgoDashboard = () => {
  const { user, loading } = useRequireAuth("/login", "ngo");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("available");

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-maplink-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Available donations
  const availableDonations = mockFoodDonations.filter(
    (donation) => donation.status === "available"
  );

  // My requested donations
  const myRequests = mockFoodDonations.filter(
    (donation) =>
      donation.status === "requested" &&
      donation.requestedBy?.ngoId === user?.id
  );

  // My approved pickups
  const myPickups = mockFoodDonations.filter(
    (donation) =>
      (donation.status === "claimed" || donation.status === "pickedup") &&
      donation.requestedBy?.ngoId === user?.id
  );

  // Calculate food saved statistics
  const totalSaved = myPickups.reduce(
    (total, donation) => total + donation.quantity,
    0
  );
  const impactScore = myPickups.length * 25;

  let filteredDonations;
  switch (activeTab) {
    case "requested":
      filteredDonations = myRequests;
      break;
    case "pickups":
      filteredDonations = myPickups;
      break;
    default:
      filteredDonations = availableDonations;
  }

  const stats = [
    {
      title: "Available Donations",
      value: availableDonations.length,
      icon: <Package className="h-6 w-6 text-maplink-green" />,
      color: "bg-green-100",
    },
    {
      title: "My Requests",
      value: myRequests.length,
      icon: <Clock className="h-6 w-6 text-maplink-orange" />,
      color: "bg-orange-100",
    },
    {
      title: "My Pickups",
      value: myPickups.length,
      icon: <CheckCheck className="h-6 w-6 text-maplink-blue" />,
      color: "bg-blue-100",
    },
    {
      title: "Food Saved (kg)",
      value: totalSaved,
      icon: <AlertCircle className="h-6 w-6 text-maplink-orange" />,
      color: "bg-orange-100",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of available donations and your pick-ups
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <h3 className="font-bold text-2xl">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Food Donations</CardTitle>
                  <CardDescription>
                    Browse available donations or check your requests
                  </CardDescription>
                </div>
                <Button
                  onClick={() => navigate("/live-map")}
                  className="md:self-end"
                  variant="outline"
                >
                  <Search className="mr-2 h-4 w-4" /> View on Map
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="available"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="requested">My Requests</TabsTrigger>
                  <TabsTrigger value="pickups">My Pickups</TabsTrigger>
                </TabsList>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {filteredDonations.length === 0 ? (
                    <div className="text-center p-8">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">
                        No donations found
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activeTab === "available"
                          ? "There are no available donations at the moment."
                          : activeTab === "requested"
                          ? "You haven't requested any donations yet."
                          : "You don't have any pickups scheduled."}
                      </p>
                      {activeTab === "available" && (
                        <Button
                          onClick={() => navigate("/live-map")}
                          className="mt-4"
                        >
                          <Search className="mr-2 h-4 w-4" /> View on Map
                        </Button>
                      )}
                    </div>
                  ) : (
                    filteredDonations.map((donation) => (
                      <Card key={donation.id}>
                        <div className="flex flex-col sm:flex-row">
                          {donation.imageUrl && (
                            <div className="sm:w-1/4 h-32 sm:h-auto">
                              <img
                                src={donation.imageUrl}
                                alt={donation.foodName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-semibold">
                                    {donation.foodName}
                                  </h3>
                                  {donation.status === "available" && (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-100 text-green-800 hover:bg-green-100"
                                    >
                                      Available
                                    </Badge>
                                  )}
                                  {donation.status === "requested" && (
                                    <Badge
                                      variant="outline"
                                      className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                                    >
                                      Requested
                                    </Badge>
                                  )}
                                  {donation.status === "claimed" && (
                                    <Badge
                                      variant="outline"
                                      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    >
                                      Ready for Pickup
                                    </Badge>
                                  )}
                                  {donation.status === "pickedup" && (
                                    <Badge
                                      variant="outline"
                                      className="bg-gray-100 text-gray-800 hover:bg-gray-100"
                                    >
                                      Picked Up
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-muted-foreground mt-1">
                                  {donation.quantity} {donation.unit} ·{" "}
                                  {donation.foodType.join(", ")}
                                </p>
                              </div>
                              
                              <div className="mt-2 sm:mt-0 flex flex-col items-end">
                                {donation.expiryRiskLevel === "high" && (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 mb-2">
                                    High expiry risk
                                  </Badge>
                                )}
                                {donation.expiryRiskLevel === "medium" && (
                                  <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-2">
                                    Medium expiry risk
                                  </Badge>
                                )}
                                
                                {activeTab === "available" && (
                                  <Button size="sm">Request Pickup</Button>
                                )}
                                
                                {activeTab === "requested" && (
                                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                                    Awaiting approval
                                  </Badge>
                                )}
                                
                                {activeTab === "pickups" && donation.status === "claimed" && (
                                  <Button size="sm" variant="outline">
                                    <CheckCheck className="mr-1 h-4 w-4" /> Mark as Picked Up
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            <Separator className="my-3" />
                            
                            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-1 h-4 w-4" />
                                {donation.location.address}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
              <CardDescription>
                Track the difference you're making
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Impact Score</p>
                  <Badge variant="outline" className="bg-maplink-green bg-opacity-10">
                    {impactScore} points
                  </Badge>
                </div>
                <Progress value={Math.min(impactScore, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {impactScore >= 100
                    ? "Amazing impact! You're making a real difference."
                    : "Keep going! Every pickup increases your impact."}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {myPickups.length > 0 ? (
                    myPickups.slice(0, 3).map((pickup) => (
                      <div key={pickup.id} className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-full mt-1">
                          <CheckCheck className="h-4 w-4 text-maplink-green" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Picked up {pickup.foodName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pickup.quantity} {pickup.unit} · From {pickup.donorName}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <CalendarCheck className="mx-auto h-8 w-8 text-muted-foreground opacity-50" />
                      <p className="text-sm text-muted-foreground mt-2">
                        No activity yet
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => navigate("/donation-tracking")}
                >
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NgoDashboard;
