
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
        <span className="text-primary-foreground font-semibold">S</span>
      </div>
      <span className="font-medium text-lg transition-colors group-hover:text-primary">Simplify</span>
    </Link>
  );
};

export default Logo;
