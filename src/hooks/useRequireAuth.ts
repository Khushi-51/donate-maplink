
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { toast } from "sonner";
import { config } from '@/config';

export function useRequireAuth(redirectTo: string = '/login', requiredRole?: UserRole) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("Authentication required", {
          description: "Please login to access this page"
        });
        navigate(redirectTo);
      } else if (requiredRole && user.role !== requiredRole) {
        toast.error("Access denied", {
          description: `This page is only accessible to ${requiredRole}s`
        });
        navigate(`/dashboard/${user.role}`);
      }
    }
  }, [user, loading, navigate, redirectTo, requiredRole]);

  // Initialize MongoDB if configured
  useEffect(() => {
    if (config.useMongoDB) {
      const initMongoDB = async () => {
        try {
          const { connectToMongoDB } = await import('@/services/mongodb');
          await connectToMongoDB();
        } catch (error) {
          console.error('Failed to initialize MongoDB:', error);
          // We already handle this in AuthContext, so no need to show another toast
        }
      };
      
      initMongoDB();
    }
  }, []);

  return { user, loading };
}
