
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { 
  Coins,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavBar = () => {
  const location = useLocation();
  // Mock user data - In a real app, this would come from your auth/user context
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    credits: 10,
    avatar: null,
    plan: "Pro Plan"
  };

  // Check if the current path matches the link
  const isActiveLink = (path: string) => {
    if (path.startsWith('#')) {
      return location.hash === path;
    }
    return location.pathname === path;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-sm py-4"
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-primary-foreground font-semibold">S</span>
          </div>
          <span className="font-medium text-lg transition-colors group-hover:text-primary">Simplify</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { path: "/#features", label: "Features" },
            { path: "/#testimonials", label: "Testimonials" },
            { path: "/#highlights", label: "Highlights" },
            { path: "/#pricing", label: "Pricing" },
            { path: "/#faq", label: "FAQ" },
            { path: "/blog", label: "Blog" },
          ].map((link, i) => (
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
        
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="hidden sm:flex items-center gap-1 py-1.5 px-3 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <Coins size={14} className="text-primary" />
                  <span className="text-sm font-medium">{userData.credits} credits</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Available diagram credits</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <ThemeToggle />
          
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="text-foreground/90 hover:text-foreground">
              Sign in
            </Button>
          </Link>
          
          <Link to="/auth">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
