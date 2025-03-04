
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
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
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">S</span>
          </div>
          <span className="font-medium text-lg">Simplify</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/#features" className="nav-link">Features</Link>
          <Link to="/#pricing" className="nav-link">Pricing</Link>
          <Link to="/#testimonials" className="nav-link">Testimonials</Link>
          <Link to="/generate" className="nav-link">Generate</Link>
          <Link to="/#contact" className="nav-link">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1 py-1 px-3 border-primary/30">
            <Coins size={14} className="text-primary" />
            <span className="text-sm font-medium">{userCredits} credits</span>
          </Badge>
          
          <ThemeToggle />
          
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Login
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="animate-scale-in">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
