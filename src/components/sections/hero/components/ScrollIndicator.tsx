import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  onClick: () => void;
}

export const ScrollIndicator = ({ onClick }: ScrollIndicatorProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer
                flex flex-col items-center text-white-secondary hover:text-white
                transition-colors duration-300 group
                focus:outline-none focus:ring-2 focus:ring-red-accent focus:ring-offset-2 focus:ring-offset-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      aria-label="Scroll to explore content"
    >
      <span className="text-sm mb-2 font-inter group-hover:text-red-accent transition-colors duration-300">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-red-accent"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </motion.button>
  );
};