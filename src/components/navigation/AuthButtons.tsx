
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
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
  );
};

export default AuthButtons;
