
import React from "react";
import Logo from "./navigation/Logo";
import NavLinks from "./navigation/NavLinks";
import UserData from "./navigation/UserData";

const NavBar = () => {
  // Mock user data - In a real app, this would come from your auth/user context
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    credits: 10,
    avatar: null,
    plan: "Pro Plan"
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-sm py-4"
    >
      <div className="container flex items-center justify-between">
        <Logo />
        <NavLinks />
        <UserData userData={userData} />
      </div>
    </header>
  );
};

export default NavBar;
