
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import NgoDashboard from "./pages/dashboard/NgoDashboard";
import DonateFood from "./pages/DonateFood";
import LiveMap from "./pages/LiveMap";
import DonationTracking from "./pages/DonationTracking";
import AIExpiryPrediction from "./pages/AIExpiryPrediction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard/donor" element={<DonorDashboard />} />
            <Route path="/dashboard/ngo" element={<NgoDashboard />} />
            <Route path="/donate-food" element={<DonateFood />} />
            <Route path="/live-map" element={<LiveMap />} />
            <Route path="/donation-tracking" element={<DonationTracking />} />
            <Route path="/ai-expiry" element={<AIExpiryPrediction />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
