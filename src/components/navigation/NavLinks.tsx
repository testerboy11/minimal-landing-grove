
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const location = useLocation();
  
  // Check if the current path matches the link
  const isActiveLink = (path: string) => {
    if (path.startsWith('#')) {
      return location.hash === path;
    }
    return location.pathname === path;
  };

  const links = [
    { path: "/#features", label: "Features" },
    { path: "/#testimonials", label: "Testimonials" },
    { path: "/#highlights", label: "Highlights" },
    { path: "/#pricing", label: "Pricing" },
    { path: "/#faq", label: "FAQ" },
    { path: "/blog", label: "Blog" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link, i) => (
        <Link 
          key={i} 
          to={link.path} 
          className={cn(
            "text-base font-medium transition-colors",
            isActiveLink(link.path) 
              ? "text-primary" 
              : "text-foreground/80 hover:text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
