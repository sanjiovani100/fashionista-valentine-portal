import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
}

interface DesktopNavProps {
  items: NavItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DesktopNav = ({ items, activeTab, setActiveTab }: DesktopNavProps) => {
  return (
    <div className="hidden lg:flex items-center gap-0.5 bg-white/5 backdrop-blur-lg py-1 px-1 rounded-full">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.url}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(item.name);
            const element = document.querySelector(item.url);
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={cn(
            "relative px-3 py-1.5 rounded-full transition-colors text-sm font-montserrat",
            "text-white/80 hover:text-fashion-pink",
            activeTab === item.name && "text-fashion-pink"
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
        </a>
      ))}
    </div>
  );
};