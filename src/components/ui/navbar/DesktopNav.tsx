import React from "react";
import { motion } from "framer-motion";
import { cx } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  type: 'hash' | 'route';
  disabled?: boolean;
}

interface DesktopNavProps {
  items: NavItem[];
  activeTab: string;
  onNavigate: (item: NavItem) => void;
}

export const DesktopNav = ({ items, activeTab, onNavigate }: DesktopNavProps) => {
  return (
    <div className="hidden lg:flex items-center gap-0.5 bg-white/5 backdrop-blur-lg py-1 px-1 rounded-full">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onNavigate(item)}
          disabled={item.disabled}
          className={cx(
            "relative px-3 py-1.5 rounded-full transition-colors text-sm font-montserrat",
            "text-white/80 hover:text-fashion-pink",
            activeTab === item.name && "text-fashion-pink",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {item.name}
          {activeTab === item.name && (
            <motion.div
              layoutId="lamp"
              className="absolute inset-0 bg-fashion-pink/5 rounded-full -z-10"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};


