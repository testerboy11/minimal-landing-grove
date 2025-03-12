
import React from "react";
import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserCreditsProps {
  credits: number;
}

const UserCredits = ({ credits }: UserCreditsProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className="hidden sm:flex items-center gap-1 py-1.5 px-3 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <Coins size={14} className="text-primary" />
            <span className="text-sm font-medium">{credits} credits</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Available diagram credits</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserCredits;
