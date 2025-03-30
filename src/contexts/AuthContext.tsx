
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, UserRole } from "@/types";
import { mockUsers } from "@/services/mockData";
import { toast } from "sonner";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  forgotPassword: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data from localStorage or an API
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user with matching email
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      toast.error("Invalid credentials");
      throw new Error("Invalid credentials");
    }

    setUser(foundUser);
    localStorage.setItem('user', JSON.stringify(foundUser));
    toast.success(`Logged in as ${foundUser.role}`);
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation, we would create a new user in the database
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

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success(`Account created successfully`);
  };

  const forgotPassword = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email exists
    const userExists = mockUsers.some(u => u.email === email);
    
    if (!userExists) {
      toast.error("Email not found");
      throw new Error("Email not found");
    }

    toast.success("Password reset instructions sent to your email");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out");
  };

  const value: AuthContextProps = { 
    user, 
    loading, 
    login, 
    logout, 
    signup, 
    forgotPassword 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
