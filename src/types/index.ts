
export type UserRole = 'donor' | 'ngo';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImageUrl?: string;
  address?: string;
  phoneNumber?: string;
  organizationName?: string;
  registrationNumber?: string;
}

export interface FoodDonation {
  id: string;
  donorId: string;
  donorName: string;
  foodName: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  createdAt: Date;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
  foodType: string[];
  description?: string;
  imageUrl?: string;
  status: 'available' | 'requested' | 'claimed' | 'pickedup' | 'expired';
  requestedBy?: {
    ngoId: string;
    ngoName: string;
    requestDate: Date;
  };
  blockchainHash?: string;
  expiryRiskLevel?: 'low' | 'medium' | 'high';
}

export interface DonationRequest {
  id: string;
  donationId: string;
  ngoId: string;
  ngoName: string;
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  pickupDate?: Date;
  notes?: string;
}

export interface BlockchainRecord {
  hash: string;
  donationId: string;
  timestamp: Date;
  action: 'created' | 'requested' | 'approved' | 'pickedup' | 'expired';
  donorId?: string;
  ngoId?: string;
  previousHash?: string;
  details: {
    [key: string]: any;
  }
}
