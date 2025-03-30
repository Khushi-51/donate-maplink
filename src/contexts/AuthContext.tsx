
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, UserRole } from "@/types";
import { toast } from "sonner";
import { findUserByEmail, createUser } from "@/services/mongodb";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserRole>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<UserRole>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => 'donor' as UserRole,
  logout: () => {},
  signup: async () => 'donor' as UserRole,
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
    
    // Initialize MongoDB connection
    const initMongoDB = async () => {
      try {
        const { connectToMongoDB } = await import("@/services/mongodb");
        await connectToMongoDB();
      } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        toast.error("Failed to connect to database", {
          description: "Using local storage as fallback"
        });
      }
    };
    
    initMongoDB();
  }, []);

  const login = async (email: string, password: string): Promise<UserRole> => {
    try {
      // In production, we would hash the password and compare with stored hash
      // For demo, we're directly comparing email addresses
      const foundUser = await findUserByEmail(email);
      
      if (!foundUser) {
        toast.error("Invalid credentials");
        throw new Error("Invalid credentials");
      }

      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Logged in as ${foundUser.role}`);
      
      // Return the user role to navigate in the component
      return foundUser.role;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<UserRole> => {
    try {
      // Check if user exists
      const existingUser = await findUserByEmail(email);
      
      if (existingUser) {
        toast.error("Email already exists");
        throw new Error("Email already exists");
      }
      
      // In a real implementation, we would hash the password
      const newUserData = {
        email,
        name,
        role,
        profileImageUrl: `https://i.pravatar.cc/150?u=${Date.now()}`
      } as Omit<User, 'id'>;

      if (role === 'ngo') {
        newUserData.organizationName = name;
        newUserData.registrationNumber = `NGO${Date.now()}`;
      }

      const newUser = await createUser(newUserData);

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success(`Account created successfully`);
      
      // Return the user role to navigate in the component
      return role;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      // Check if user exists
      const userExists = await findUserByEmail(email);
      
      if (!userExists) {
        toast.error("Email not found");
        throw new Error("Email not found");
      }

      // In a real implementation, we would send a password reset email
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
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
