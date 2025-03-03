
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

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
          <Button variant="ghost" size="sm" className="hidden md:inline-flex" as={Link} to="/auth">
            Login
          </Button>
          <Button className="animate-scale-in" as={Link} to="/auth">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
