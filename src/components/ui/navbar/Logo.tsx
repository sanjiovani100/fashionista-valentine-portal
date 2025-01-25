import React from "react";

export const Logo = () => {
  return (
    <a 
      href="#" 
      className="relative lg:w-36 w-32 h-auto px-4 hover:opacity-90 transition-opacity duration-300"
      aria-label="Fashionistas Home"
    >
      <img 
        src="/lovable-uploads/780caef1-834f-4fa7-a143-60c38ed8afe1.png"
        alt="Fashionistas Logo"
        className="w-full h-full object-contain"
      />
    </a>
  );
};