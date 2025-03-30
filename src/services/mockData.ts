
import { User, FoodDonation, DonationRequest, BlockchainRecord } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "donor1",
    email: "donor@example.com",
    name: "John Donor",
    role: "donor",
    profileImageUrl: "https://i.pravatar.cc/150?u=donor1",
    address: "123 Donor St, New York, NY 10001",
    phoneNumber: "(123) 456-7890"
  },
  {
    id: "ngo1",
    email: "ngo@example.com",
    name: "Jane NGO Manager",
    role: "ngo",
    profileImageUrl: "https://i.pravatar.cc/150?u=ngo1",
    address: "456 NGO Ave, New York, NY 10002",
    phoneNumber: "(234) 567-8901",
    organizationName: "Food Rescue Mission",
    registrationNumber: "NGO12345"
  }
];

// Mock Food Donations
export const mockFoodDonations: FoodDonation[] = [
  {
    id: "donation1",
    donorId: "donor1",
    donorName: "John Donor",
    foodName: "Assorted Vegetables",
    quantity: 15,
    unit: "kg",
    expiryDate: new Date(Date.now() + 172800000), // 2 days from now
    createdAt: new Date(),
    location: {
      address: "123 Donor St, New York, NY 10001",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    foodType: ["vegetables", "fresh"],
    description: "Fresh vegetables from local market - carrots, potatoes, tomatoes",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    status: "available",
    expiryRiskLevel: "low"
  },
  {
    id: "donation2",
    donorId: "donor1",
    donorName: "John Donor",
    foodName: "Bread Loaves",
    quantity: 10,
    unit: "pieces",
    expiryDate: new Date(Date.now() + 86400000), // 1 day from now
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    location: {
      address: "125 Baker St, New York, NY 10003",
      coordinates: { lat: 40.7282, lng: -73.9942 }
    },
    foodType: ["bakery", "grain"],
    description: "Fresh bread loaves from local bakery",
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
    status: "requested",
    requestedBy: {
      ngoId: "ngo1",
      ngoName: "Food Rescue Mission",
      requestDate: new Date(Date.now() - 43200000) // 12 hours ago
    },
    expiryRiskLevel: "medium"
  },
  {
    id: "donation3",
    donorId: "donor1",
    donorName: "John Donor",
    foodName: "Rice Bags",
    quantity: 5,
    unit: "kg",
    expiryDate: new Date(Date.now() + 2592000000), // 30 days from now
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    location: {
      address: "350 Rice Ave, New York, NY 10005",
      coordinates: { lat: 40.7053, lng: -74.0142 }
    },
    foodType: ["grain", "non-perishable"],
    description: "Sealed bags of white rice",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    status: "claimed",
    requestedBy: {
      ngoId: "ngo1",
      ngoName: "Food Rescue Mission",
      requestDate: new Date(Date.now() - 86400000) // 1 day ago
    },
    blockchainHash: "0xf7d794a9d1048df7fc13ef648a5e69e3",
    expiryRiskLevel: "low"
  },
  {
    id: "donation4",
    donorId: "donor1",
    donorName: "John Donor",
    foodName: "Canned Goods",
    quantity: 24,
    unit: "cans",
    expiryDate: new Date(Date.now() + 15552000000), // 180 days from now
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    location: {
      address: "500 Market St, New York, NY 10010",
      coordinates: { lat: 40.7359, lng: -73.9911 }
    },
    foodType: ["canned", "non-perishable"],
    description: "Assorted canned goods - beans, corn, soup",
    imageUrl: "https://images.unsplash.com/photo-1584263347416-85a3772def43",
    status: "available",
    expiryRiskLevel: "low"
  },
  {
    id: "donation5",
    donorId: "donor1",
    donorName: "John Donor",
    foodName: "Fresh Fruit",
    quantity: 8,
    unit: "kg",
    expiryDate: new Date(Date.now() + 345600000), // 4 days from now
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
    location: {
      address: "221 Fruit St, New York, NY 10012",
      coordinates: { lat: 40.7406, lng: -74.0022 }
    },
    foodType: ["fruit", "fresh"],
    description: "Assorted fruits - apples, oranges, bananas",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    status: "available",
    expiryRiskLevel: "medium"
  }
];

// Mock Donation Requests
export const mockDonationRequests: DonationRequest[] = [
  {
    id: "request1",
    donationId: "donation2",
    ngoId: "ngo1",
    ngoName: "Food Rescue Mission",
    requestDate: new Date(Date.now() - 43200000), // 12 hours ago
    status: "pending",
    notes: "We will pick up in the afternoon"
  },
  {
    id: "request2",
    donationId: "donation3",
    ngoId: "ngo1",
    ngoName: "Food Rescue Mission",
    requestDate: new Date(Date.now() - 86400000), // 24 hours ago
    status: "approved",
    pickupDate: new Date(Date.now() + 43200000), // 12 hours from now
    notes: "Approved for pickup"
  }
];

// Mock Blockchain Records
export const mockBlockchainRecords: BlockchainRecord[] = [
  {
    hash: "0xf7d794a9d1048df7fc13ef648a5e69e3",
    donationId: "donation3",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    action: "created",
    donorId: "donor1",
    details: {
      foodName: "Rice Bags",
      quantity: "5 kg",
      expiryDate: new Date(Date.now() + 2592000000).toISOString() // 30 days from now
    }
  },
  {
    hash: "0xe8c7b9a2f5d1e3b4c6d8a9f0e1c3b5d7",
    donationId: "donation3",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    action: "requested",
    ngoId: "ngo1",
    previousHash: "0xf7d794a9d1048df7fc13ef648a5e69e3",
    details: {
      ngoName: "Food Rescue Mission",
      requestDate: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    }
  },
  {
    hash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    donationId: "donation3",
    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
    action: "approved",
    donorId: "donor1",
    ngoId: "ngo1",
    previousHash: "0xe8c7b9a2f5d1e3b4c6d8a9f0e1c3b5d7",
    details: {
      approvalDate: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      pickupDate: new Date(Date.now() + 43200000).toISOString() // 12 hours from now
    }
  }
];
