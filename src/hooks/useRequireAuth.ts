
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { toast } from "sonner";

export function useRequireAuth(redirectTo: string = '/login', requiredRole?: UserRole) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Authentication required", {
        description: "Please login to access this page"
      });
      navigate(redirectTo);
    } else if (!loading && user && requiredRole && user.role !== requiredRole) {
      toast.error("Access denied", {
        description: `This page is only accessible to ${requiredRole}s`
      });
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, loading, navigate, redirectTo, requiredRole]);

  return { user, loading };
}
