
import React from "react";
import { Link } from "react-router-dom";

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
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center">
          <span className={`font-bold text-white ${size === "small" ? "text-sm" : "text-base"}`}>0</span>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-white" />
      </div>
      <span className={`font-bold ${sizeClasses[size]}`}>
        <span className="text-green-600 dark:text-green-400">Zero</span>
        <span className="text-orange-500">Waste</span>
      </span>
    </Link>
  );
};

export default Logo;
