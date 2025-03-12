
import React from "react";
import UserCredits from "./UserCredits";
import { ThemeToggle } from "@/components/ThemeToggle";
import AuthButtons from "./AuthButtons";

interface UserDataProps {
  userData: {
    name: string;
    email: string;
    credits: number;
    avatar: string | null;
    plan: string;
  } | null;
}

const UserData = ({ userData }: UserDataProps) => {
  return (
    <div className="flex items-center gap-4">
      {userData && <UserCredits credits={userData.credits} />}
      <ThemeToggle />
      <AuthButtons />
    </div>
  );
};

export default UserData;
