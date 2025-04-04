
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Home,
  Package,
  LayoutDashboard,
  Map,
  History,
  BarChart3,
  LogOut,
  Menu,
  X,
  User,
  Settings,
  Brain,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const donorNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard/donor",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Donate Food",
      href: "/donate-food",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Donation Tracking",
      href: "/donation-tracking",
      icon: <History className="h-5 w-5" />,
    },
    {
      name: "Live Map",
      href: "/live-map",
      icon: <Map className="h-5 w-5" />,
    },
    {
      name: "AI Expiry Prediction",
      href: "/ai-expiry",
      icon: <Brain className="h-5 w-5" />,
    },
  ];
  
  const ngoNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard/ngo",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Available Food",
      href: "/live-map",
      icon: <Map className="h-5 w-5" />,
    },
    {
      name: "My Pickups",
      href: "/donation-tracking",
      icon: <History className="h-5 w-5" />,
    },
    {
      name: "Statistics",
      href: "/statistics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "AI Expiry Prediction",
      href: "/ai-expiry",
      icon: <Brain className="h-5 w-5" />,
    },
  ];
  
  const navItems = user?.role === "donor" ? donorNavItems : ngoNavItems;
  
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-maplink-lightgray dark:bg-gray-900 transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r shadow-sm dark:border-gray-700 transition-colors duration-200">
        <div className="p-4 flex items-center justify-between">
          <Logo size="small" />
          <ThemeToggle />
        </div>
        <Separator className="dark:bg-gray-700" />
        <ScrollArea className="flex-1">
          <nav className="px-2 py-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-maplink-green text-white dark:bg-green-700"
                      : "text-gray-700 dark:text-gray-300 hover:bg-maplink-lightgray dark:hover:bg-gray-700"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </ScrollArea>
        <Separator className="dark:bg-gray-700" />
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full flex justify-start items-center gap-2 dark:text-white">
                <Avatar className="h-8 w-8">
                  {user?.profileImageUrl ? (
                    <AvatarImage src={user.profileImageUrl} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-maplink-green text-white">{userInitials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {user?.role}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      
      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b shadow-sm dark:border-gray-700 transition-colors duration-200">
        <div className="px-4 py-3 flex justify-between items-center">
          <Logo size="small" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    {user?.profileImageUrl ? (
                      <AvatarImage src={user.profileImageUrl} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-maplink-green text-white">{userInitials}</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-maplink-green text-white dark:bg-green-700"
                      : "text-gray-700 dark:text-gray-300 hover:bg-maplink-lightgray dark:hover:bg-gray-700"
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-auto dark:bg-gray-900 transition-colors duration-200">
        <div className="md:p-8 p-4 pt-16 md:pt-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
