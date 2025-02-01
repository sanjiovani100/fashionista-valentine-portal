import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface EventsCTAProps {
  ticketsRemaining?: number;
  className?: string;
}

export const EventsCTA = ({ ticketsRemaining, className }: EventsCTAProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto px-4 py-8 md:py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-6">
        <motion.div
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            size="lg"
            className="bg-maroon hover:bg-maroon-light text-white text-lg md:text-xl px-8 py-6 h-auto 
                     shadow-lg hover:shadow-glow transition-all duration-300 
                     focus:ring-2 focus:ring-maroon-light focus:ring-offset-2 focus:ring-offset-background
                     group relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            asChild
          >
            <a href="#tickets" className="flex items-center gap-3">
              <span className="relative z-10">Get Your Fashion Show Tickets</span>
              <ArrowRight 
                className={`w-5 h-5 transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`}
              />
              {ticketsRemaining && (
                <span className="text-sm font-normal ml-2 opacity-90">
                  ({ticketsRemaining} remaining)
                </span>
              )}
            </a>
          </Button>
        </motion.div>

        {/* Accessibility enhancement */}
        <span className="sr-only">
          Click to purchase tickets for the fashion show event
          {ticketsRemaining && `. ${ticketsRemaining} tickets remaining`}
        </span>
      </div>
    </motion.div>
  );
};