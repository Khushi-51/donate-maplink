
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
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 flex items-center justify-center">
          <Leaf className={`text-white ${size === "small" ? "h-4 w-4" : "h-5 w-5"}`} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800" />
      </div>
      <span className={`font-bold ${sizeClasses[size]}`}>
        <span className="text-emerald-600 dark:text-emerald-400">Zero</span>
        <span className="text-blue-500">Waste</span>
      </span>
    </Link>
  );
};

export default Logo;
