
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserRole } from "@/types";
import { mockUsers } from "@/services/mockData";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("maplink_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("maplink_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }
      
      // In a real app, we would verify password hash here
      if (password !== "password123") { // Mock password check
        throw new Error("Invalid email or password");
      }
      
      setUser(foundUser);
      localStorage.setItem("maplink_user", JSON.stringify(foundUser));
      
      // Redirect to dashboard based on role
      navigate(foundUser.role === "donor" ? "/dashboard/donor" : "/dashboard/ngo");
      
      toast.success("Login successful", {
        description: `Welcome back, ${foundUser.name}!`
      });
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "An error occurred during login"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        throw new Error("Email already in use");
      }
      
      // Generate random ID
      const newUserId = `user-${Date.now().toString(36)}`;
      
      // Create new user
      const newUser: User = {
        id: newUserId,
        email,
        name,
        role,
        profileImageUrl: `https://i.pravatar.cc/150?u=${newUserId}`
      };
      
      // In a real app, we would hash the password and save to database
      
      // Update local state
      setUser(newUser);
      localStorage.setItem("maplink_user", JSON.stringify(newUser));
      
      // Redirect to dashboard based on role
      navigate(role === "donor" ? "/dashboard/donor" : "/dashboard/ngo");
      
      toast.success("Account created", {
        description: `Welcome to MapLink, ${name}!`
      });
    } catch (error: any) {
      toast.error("Signup failed", {
        description: error.message || "An error occurred during signup"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("maplink_user");
    navigate("/login");
    toast.success("Logout successful", {
      description: "You have been logged out"
    });
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!existingUser) {
        throw new Error("No account found with this email address");
      }
      
      // In a real app, we would send a password reset email
      
      toast.success("Password reset email sent", {
        description: "Check your inbox for instructions"
      });
    } catch (error: any) {
      toast.error("Password reset failed", {
        description: error.message || "An error occurred"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would validate the token and update the password
      
      toast.success("Password reset successful", {
        description: "You can now login with your new password"
      });
      
      navigate("/login");
    } catch (error: any) {
      toast.error("Password reset failed", {
        description: error.message || "An error occurred"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
