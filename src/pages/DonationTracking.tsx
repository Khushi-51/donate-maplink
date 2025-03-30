
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { mockBlockchainRecords, mockFoodDonations } from "@/services/mockData";
import { BlockchainRecord, FoodDonation } from "@/types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CopyIcon, QrCode, Search, History, ArrowRight, CheckCircle, BarChart3, RefreshCcw } from "lucide-react";

// QR Code component for blockchain records
const QRCodeDisplay: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="mx-auto w-32 h-32 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maplink.example/verify/0xf7d794a9d1048df7fc13ef648a5e69e3')] bg-contain bg-no-repeat bg-center" />
    </div>
  );
};

// Blockchain visualization component 
const BlockchainVisualization: React.FC<{ records: BlockchainRecord[] }> = ({ records }) => {
  return (
    <div className="space-y-4">
      {records.map((record, index) => (
        <div key={record.hash} className="flex items-start">
          <div className="min-w-[50px] flex flex-col items-center">
            <div className="bg-maplink-green rounded-full w-7 h-7 text-white flex items-center justify-center text-sm">
              {index + 1}
            </div>
            {index < records.length - 1 && (
              <div className="bg-maplink-green w-1 h-12"></div>
            )}
          </div>
          <Card className="flex-1 ml-4">
            <CardContent className="p-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <p className="font-medium capitalize">{record.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(record.timestamp).toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline" className="bg-maplink-green/10 text-maplink-green font-mono text-xs">
                  {record.hash.substring(0, 10)}...
                </Badge>
              </div>
              <Separator className="my-2" />
              <div className="text-sm">
                {record.action === "created" && (
                  <p>
                    Donation created: {record.details.foodName} ({record.details.quantity})
                  </p>
                )}
                {record.action === "requested" && (
                  <p>
                    Pickup requested by {record.details.ngoName}
                  </p>
                )}
                {record.action === "approved" && (
                  <p>
                    Pickup approved for {new Date(record.details.pickupDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              {record.previousHash && (
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <span>Previous:</span>
                  <span className="font-mono ml-1">
                    {record.previousHash.substring(0, 15)}...
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

const DonationTracking = () => {
  const { user, loading } = useRequireAuth("/login");
  const [activeTab, setActiveTab] = useState("blockchain");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);

  // Get records for the selected donation
  const recordsForDonation = selectedDonation
    ? mockBlockchainRecords.filter((r) => r.donationId === selectedDonation.id).sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    : [];

  // Get all donations with blockchain records
  const donationsWithRecords = mockFoodDonations.filter(
    (donation) => donation.blockchainHash
  );

  // Filter donations based on search term and user role
  const filteredDonations = donationsWithRecords.filter((donation) => {
    // If user is donor, only show their donations
    if (user?.role === "donor" && donation.donorId !== user.id) {
      return false;
    }
    // If user is ngo, only show donations they requested/claimed
    if (user?.role === "ngo" && (!donation.requestedBy || donation.requestedBy.ngoId !== user.id)) {
      return false;
    }
    // Filter by search term
    if (searchTerm && !donation.foodName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Handle clicking on a donation
  const handleDonationClick = (donation: FoodDonation) => {
    setSelectedDonation(donation);
    setActiveTab("blockchain");
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
            Blockchain Donation Tracking
          </h1>
          <p className="text-muted-foreground">
            Track food donations on the blockchain for full transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Tracked Donations</CardTitle>
                <Badge variant="outline" className="bg-maplink-blue/10 text-maplink-blue">
                  {filteredDonations.length}
                </Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search donations..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto pr-2">
              {filteredDonations.length === 0 ? (
                <div className="text-center py-8">
                  <History className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <p className="mt-2 text-muted-foreground">No tracked donations found</p>
                  <p className="text-xs text-muted-foreground">
                    Completed donations will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedDonation?.id === donation.id ? "border-primary bg-muted" : ""
                      }`}
                      onClick={() => handleDonationClick(donation)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{donation.foodName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {donation.quantity} {donation.unit}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            donation.status === "claimed"
                              ? "bg-blue-100 text-blue-800"
                              : donation.status === "pickedup"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {donation.status === "claimed"
                            ? "Claimed"
                            : donation.status === "pickedup"
                            ? "Picked Up"
                            : "Requested"}
                        </Badge>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                        <span className="font-mono">
                          {donation.blockchainHash?.substring(0, 8)}...
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            {selectedDonation ? (
              <>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{selectedDonation.foodName}</CardTitle>
                    <div>
                      <Button variant="ghost" size="sm" className="font-mono text-xs">
                        {selectedDonation.blockchainHash?.substring(0, 10)}...
                        <CopyIcon className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Donation by {selectedDonation.donorName} on{" "}
                    {new Date(selectedDonation.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="blockchain">
                        <History className="mr-1 h-4 w-4" /> Blockchain Records
                      </TabsTrigger>
                      <TabsTrigger value="verification">
                        <QrCode className="mr-1 h-4 w-4" /> Verification
                      </TabsTrigger>
                      <TabsTrigger value="impact">
                        <BarChart3 className="mr-1 h-4 w-4" /> Impact
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="blockchain" className="mt-0">
                      <BlockchainVisualization records={recordsForDonation} />
                    </TabsContent>

                    <TabsContent value="verification" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-center mb-4">
                            <QRCodeDisplay value={selectedDonation.blockchainHash || ""} />
                            <p className="text-sm text-muted-foreground mt-2">
                              Scan to verify donation
                            </p>
                          </div>
                          <div className="mt-4">
                            <h3 className="font-medium mb-2">Verification Link</h3>
                            <div className="flex">
                              <Input
                                value={`https://maplink.example/verify/${selectedDonation.blockchainHash}`}
                                readOnly
                                className="font-mono text-xs"
                              />
                              <Button variant="ghost" size="icon">
                                <CopyIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Verification Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center">
                              <div className="bg-green-100 p-2 rounded-full">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              </div>
                              <div className="ml-3">
                                <p className="font-medium">Block Authenticated</p>
                                <p className="text-xs text-muted-foreground">
                                  This donation is verified on blockchain
                                </p>
                              </div>
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between py-1">
                                <span className="text-muted-foreground">Block Height:</span>
                                <span className="font-mono">3,451,263</span>
                              </div>
                              <div className="flex justify-between py-1">
                                <span className="text-muted-foreground">Network:</span>
                                <span>MapLink Chain</span>
                              </div>
                              <div className="flex justify-between py-1">
                                <span className="text-muted-foreground">Timestamp:</span>
                                <span>
                                  {new Date(recordsForDonation[0]?.timestamp).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full">
                              <ArrowRight className="mr-1 h-4 w-4" /> View on Explorer
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="impact" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Environmental Impact</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center">
                              <div className="bg-green-100 p-3 rounded-full mr-3">
                                <RefreshCcw className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="text-2xl font-bold">2.3 kg</p>
                                <p className="text-xs text-muted-foreground">
                                  CO₂ emissions prevented
                                </p>
                              </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <p className="text-xl font-bold">120 L</p>
                                <p className="text-xs text-muted-foreground">
                                  Water saved
                                </p>
                              </div>
                              <div>
                                <p className="text-xl font-bold">0.8 m²</p>
                                <p className="text-xs text-muted-foreground">
                                  Land use prevented
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Social Impact</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center">
                              <div className="bg-blue-100 p-3 rounded-full mr-3">
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-2xl font-bold">4</p>
                                <p className="text-xs text-muted-foreground">
                                  People fed with this donation
                                </p>
                              </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <p className="text-xl font-bold">3,600</p>
                                <p className="text-xs text-muted-foreground">
                                  Kcal provided
                                </p>
                              </div>
                              <div>
                                <p className="text-xl font-bold">120 g</p>
                                <p className="text-xs text-muted-foreground">
                                  Protein provided
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center h-full py-16 text-center">
                <History className="h-16 w-16 text-muted-foreground opacity-30" />
                <h3 className="text-lg font-medium mt-4">Select a donation</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Select a donation from the list to view its blockchain records,
                  verification details, and impact metrics.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DonationTracking;
