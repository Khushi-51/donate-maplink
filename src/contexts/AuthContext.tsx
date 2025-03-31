
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, UserRole } from "@/types";
import { toast } from "sonner";
import { 
  authenticateUser, 
  registerUser, 
  requestPasswordReset 
} from "@/services/dataService";

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
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<UserRole> => {
    try {
      const authenticatedUser = await authenticateUser(email, password);
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      toast.success(`Logged in as ${authenticatedUser.role}`);
      return authenticatedUser.role;
    } catch (error) {
      toast.error("Invalid credentials");
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<UserRole> => {
    try {
      const newUser = await registerUser(email, password, name, role);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success(`Account created successfully`);
      return newUser.role;
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await requestPasswordReset(email);
      toast.success("Password reset instructions sent to your email");
    } catch (error: any) {
      toast.error(error.message || "Email not found");
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
