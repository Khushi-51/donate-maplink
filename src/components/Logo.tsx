
import React from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", className }) => {
  const sizeClasses = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-3xl md:text-4xl",
  };
  
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 ${className} transition-transform duration-300 hover:scale-105`}
    >
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2E8B57] to-[#2c7a4d] flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-[#2E8B57]/30 hover:shadow-lg animate-pulse-slow">
          <Leaf className={`text-white ${size === "small" ? "h-4 w-4" : "h-5 w-5"}`} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3E7CB1] border-2 border-white dark:border-gray-800 animate-pulse" />
      </div>
      <span className={`font-bold ${sizeClasses[size]} tracking-tight`}>
        <span className="text-[#2E8B57] dark:text-[#4ca77b]">Zero</span>
        <span className="text-[#3E7CB1]">Waste</span>
      </span>
    </Link>
  );
};

export default Logo;
