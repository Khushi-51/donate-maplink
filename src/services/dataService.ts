
import { User, UserRole } from "@/types";
import { mockUsers } from "./mockData";

// Initialize local storage with mock users if empty
const initializeLocalStorage = () => {
  const storedUsers = localStorage.getItem('users');
  if (!storedUsers) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
};

// Get all users from local storage
export const getUsers = (): User[] => {
  initializeLocalStorage();
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Find user by email
export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
};

// Create a new user
export const createUser = (user: User): User => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return user;
};

// Update user
export const updateUser = (user: User): User => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }
  return user;
};

// Handle user authentication
export const authenticateUser = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  // In a real app, we would check the password hash
  return user;
};

// Register a new user
export const registerUser = async (email: string, password: string, name: string, role: UserRole): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }
  
  // Create new user
  const newUser: User = {
    id: `user${Date.now()}`,
    email,
    name,
    role,
    profileImageUrl: `https://i.pravatar.cc/150?u=${Date.now()}`
  };
  
  if (role === 'ngo') {
    newUser.organizationName = name;
    newUser.registrationNumber = `NGO${Date.now()}`;
  }
  
  return createUser(newUser);
};

// Reset password functionality
export const requestPasswordReset = async (email: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = findUserByEmail(email);
  if (!user) {
    throw new Error("Email not found");
  }
  
  // In a real app, we would send a password reset email
  console.log(`Password reset requested for ${email}`);
};
