
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Coins, ChevronRight } from "lucide-react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // Mock user credits - In a real app, this would come from your auth/user context
  const userCredits = 10;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if the current path matches the link
  const isActiveLink = (path: string) => {
    if (path.startsWith('#')) {
      return location.hash === path;
    }
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-primary-foreground font-semibold">S</span>
          </div>
          <span className="font-medium text-lg transition-colors group-hover:text-primary">Simplify</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { path: "/#features", label: "Features" },
            { path: "/#pricing", label: "Pricing" },
            { path: "/#testimonials", label: "Testimonials" },
            { path: "/generate", label: "Generate" },
            { path: "/#contact", label: "Contact" }
          ].map((link, i) => (
            <Link 
              key={i} 
              to={link.path} 
              className={cn(
                "nav-link relative px-2 py-1 transition-all",
                isActiveLink(link.path) ? "text-primary font-semibold" : ""
              )}
            >
              {link.label}
              {isActiveLink(link.path) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Badge 
            variant="outline" 
            className="flex items-center gap-1 py-1.5 px-3 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <Coins size={14} className="text-primary" />
            <span className="text-sm font-medium">{userCredits} credits</span>
          </Badge>
          
          <ThemeToggle />
          
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex hover:bg-primary/10">
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="animate-scale-in group">
              Get Started
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
