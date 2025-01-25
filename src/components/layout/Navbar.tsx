import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useParallaxScroll } from "@/hooks/useParallaxScroll";

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About the Event", href: "#about" },
  { label: "Tickets & Pricing", href: "#tickets" },
  { label: "Schedule", href: "#schedule" },
  { label: "Designers", href: "#designers" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Models", href: "#models" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollY = useParallaxScroll();

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const navbarHeight = isScrolled ? "h-16" : "h-20";
  const mobileNavHeight = "h-16";

  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    "bg-black/95 backdrop-blur-sm",
    navbarHeight,
    "border-b border-white/10"
  );

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <nav className={navbarClasses}>
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="font-playfair text-2xl font-bold text-white hover:brightness-125 transition-all"
        >
          Fashionistas
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "nav-item relative font-montserrat text-sm tracking-wider",
                "text-white/90 hover:text-white transition-colors duration-300",
                "after:content-[''] after:absolute after:bottom-0 after:left-0",
                "after:w-0 after:h-0.5 after:bg-gradient-to-r",
                "after:from-fashion-pink after:to-deep-purple",
                "after:transition-all after:duration-300 hover:after:w-full",
                activeSection === item.href.slice(1) && "text-white after:w-full"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Language & CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="text-white/90 hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </button>
          <Button 
            className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300 animate-pulse"
            size="sm"
          >
            Get Tickets
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-16 bg-black/95 backdrop-blur-md lg:hidden"
            >
              <div className="container px-4 py-8 flex flex-col space-y-6">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-white/90 hover:text-white font-montserrat text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  variants={menuItemVariants}
                  custom={menuItems.length}
                  initial="hidden"
                  animate="visible"
                  className="pt-4 flex items-center justify-between"
                >
                  <button className="text-white/90 hover:text-white transition-colors">
                    <Globe className="w-5 h-5" />
                  </button>
                  <Button 
                    className="bg-gradient-to-r from-fashion-pink to-deep-purple hover:brightness-110 active:brightness-90 transition-all duration-300"
                    size="sm"
                  >
                    Get Tickets
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-fashion-pink to-deep-purple"
          style={{ width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}
        />
      </div>
    </nav>
  );
};