
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { mockFoodDonations } from "@/services/mockData";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Clock, 
  CheckCheck, 
  AlertCircle, 
  Ban,
  MapPin,
  Calendar,
  Plus,
} from "lucide-react";

const DonorDashboard = () => {
  const { user, loading } = useRequireAuth("/login", "donor");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");

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

  // Filter donations by this user
  const myDonations = mockFoodDonations.filter(
    (donation) => donation.donorId === user?.id
  );

  // Group by status
  const available = myDonations.filter((d) => d.status === "available");
  const requested = myDonations.filter((d) => d.status === "requested");
  const claimed = myDonations.filter(
    (d) => d.status === "claimed" || d.status === "pickedup"
  );
  const expired = myDonations.filter((d) => d.status === "expired");

  let filteredDonations;
  switch (activeTab) {
    case "available":
      filteredDonations = available;
      break;
    case "requested":
      filteredDonations = requested;
      break;
    case "claimed":
      filteredDonations = claimed;
      break;
    case "expired":
      filteredDonations = expired;
      break;
    default:
      filteredDonations = myDonations;
  }

  const stats = [
    { 
      title: "Available", 
      value: available.length, 
      icon: <Package className="h-6 w-6 text-maplink-green" />,
      color: "bg-green-100" 
    },
    { 
      title: "Requested", 
      value: requested.length, 
      icon: <Clock className="h-6 w-6 text-maplink-orange" />,
      color: "bg-orange-100" 
    },
    { 
      title: "Claimed", 
      value: claimed.length, 
      icon: <CheckCheck className="h-6 w-6 text-maplink-blue" />,
      color: "bg-blue-100" 
    },
    { 
      title: "Expired", 
      value: expired.length, 
      icon: <AlertCircle className="h-6 w-6 text-destructive" />,
      color: "bg-red-100" 
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, {user?.name}
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your food donations
            </p>
          </div>
          <Button
            className="md:self-end"
            onClick={() => navigate("/donate-food")}
          >
            <Plus className="mr-2 h-4 w-4" /> Donate Food
          </Button>
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

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Your Donations</CardTitle>
                <CardDescription>
                  Manage and track all your food donations
                </CardDescription>
              </div>
              <Button
                onClick={() => navigate("/donate-food")}
                className="md:self-end"
              >
                <Plus className="mr-2 h-4 w-4" /> New Donation
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="requested">Requested</TabsTrigger>
                <TabsTrigger value="claimed">Claimed</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {filteredDonations.length === 0 ? (
                  <div className="text-center p-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No donations</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You don't have any donations in this category.
                    </p>
                    <Button
                      onClick={() => navigate("/donate-food")}
                      className="mt-4"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Create New Donation
                    </Button>
                  </div>
                ) : (
                  filteredDonations.map((donation) => (
                    <Card key={donation.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {donation.imageUrl && (
                          <div className="md:w-1/5 h-40 md:h-auto">
                            <img
                              src={donation.imageUrl}
                              alt={donation.foodName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-4">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">
                                  {donation.foodName}
                                </h3>
                                {donation.status === "available" && (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Available
                                  </Badge>
                                )}
                                {donation.status === "requested" && (
                                  <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                                    Requested
                                  </Badge>
                                )}
                                {(donation.status === "claimed" || donation.status === "pickedup") && (
                                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                    Claimed
                                  </Badge>
                                )}
                                {donation.status === "expired" && (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                    Expired
                                  </Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground mt-1">
                                {donation.quantity} {donation.unit} · {donation.foodType.join(", ")}
                              </p>
                            </div>
                            
                            <div className="mt-2 md:mt-0">
                              {donation.expiryRiskLevel === "high" && (
                                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                  High expiry risk
                                </Badge>
                              )}
                              {donation.expiryRiskLevel === "medium" && (
                                <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                                  Medium expiry risk
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {donation.location.address}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-4 w-4" />
                              Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                            </div>
                          </div>
                          
                          {donation.status === "requested" && donation.requestedBy && (
                            <>
                              <Separator className="my-4" />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${donation.requestedBy.ngoId}`} />
                                    <AvatarFallback>NG</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">
                                      Requested by {donation.requestedBy.ngoName}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(donation.requestedBy.requestDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="destructive">
                                    <Ban className="mr-1 h-4 w-4" /> Reject
                                  </Button>
                                  <Button size="sm">
                                    <CheckCheck className="mr-1 h-4 w-4" /> Approve
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;
