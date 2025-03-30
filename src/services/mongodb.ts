
import { MongoClient, Db, ObjectId } from 'mongodb';
import { User, UserRole, FoodDonation, DonationRequest } from '@/types';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db: Db;

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("maplinkDB");
    
    // Create indexes for faster queries
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("donations").createIndex({ donorId: 1 });
    await db.collection("requests").createIndex({ donationId: 1 });
    
    return db;
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    throw error;
  }
}

export async function getDB() {
  if (!db) {
    await connectToMongoDB();
  }
  return db;
}

// User operations
export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDB();
  return db.collection<User>("users").findOne({ email });
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const db = await getDB();
  const userToInsert = {
    ...user,
    id: new ObjectId().toString()
  };
  await db.collection<User>("users").insertOne(userToInsert as User);
  return userToInsert as User;
}

// Donation operations
export async function createDonation(donation: Omit<FoodDonation, 'id'>): Promise<FoodDonation> {
  const db = await getDB();
  const donationToInsert = {
    ...donation,
    id: new ObjectId().toString()
  };
  await db.collection<FoodDonation>("donations").insertOne(donationToInsert as FoodDonation);
  return donationToInsert as FoodDonation;
}

export async function getDonations(): Promise<FoodDonation[]> {
  const db = await getDB();
  return db.collection<FoodDonation>("donations").find().toArray();
}

export async function getDonationsByDonor(donorId: string): Promise<FoodDonation[]> {
  const db = await getDB();
  return db.collection<FoodDonation>("donations").find({ donorId }).toArray();
}

export async function getDonationById(id: string): Promise<FoodDonation | null> {
  const db = await getDB();
  return db.collection<FoodDonation>("donations").findOne({ id });
}

// Donation request operations
export async function createDonationRequest(request: Omit<DonationRequest, 'id'>): Promise<DonationRequest> {
  const db = await getDB();
  const requestToInsert = {
    ...request,
    id: new ObjectId().toString()
  };
  await db.collection<DonationRequest>("requests").insertOne(requestToInsert as DonationRequest);
  
  // Update donation status
  await db.collection<FoodDonation>("donations").updateOne(
    { id: request.donationId },
    { $set: { status: 'requested', requestedBy: { ngoId: request.ngoId, ngoName: request.ngoName, requestDate: request.requestDate } } }
  );
  
  return requestToInsert as DonationRequest;
}

export async function getDonationRequests(): Promise<DonationRequest[]> {
  const db = await getDB();
  return db.collection<DonationRequest>("requests").find().toArray();
}

export async function getDonationRequestsByNgo(ngoId: string): Promise<DonationRequest[]> {
  const db = await getDB();
  return db.collection<DonationRequest>("requests").find({ ngoId }).toArray();
}
