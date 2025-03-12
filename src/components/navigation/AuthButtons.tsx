
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const AuthButtons = () => {
  // This is a placeholder - in a real app we'd use an auth state to determine if user is logged in
  const isLoggedIn = true; // Changed to true for demonstration

  return (
    <>
      {isLoggedIn ? (
        <Link to="/profile">
          <Button variant="outline" size="sm" className="gap-2">
            <User size={16} />
            Profile
          </Button>
        </Link>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default AuthButtons;
