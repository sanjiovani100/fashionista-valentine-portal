import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  url: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, items, onClose }: MobileMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 top-16 bg-black/95 backdrop-blur-md lg:hidden ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="container px-4 py-8 flex flex-col space-y-4">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.url}
            className="text-white/90 hover:text-white font-montserrat text-lg"
            onClick={() => onClose()}
          >
            {item.name}
          </a>
        ))}
        <div className="pt-4 flex items-center justify-between">
          <button className="text-white/90 hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </button>
          <Button 
            className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300"
            size="sm"
          >
            Get Tickets
          </Button>
        </div>
      </div>
    </motion.div>
  );
};