import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RightActions = () => {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <button 
        className="text-white/90 hover:text-white transition-colors"
        aria-label="Change Language"
      >
        <Globe className="w-5 h-5" />
      </button>
      <Button 
        className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300 font-inter font-bold"
        size="sm"
      >
        Get Tickets
      </Button>
    </div>
  );
};