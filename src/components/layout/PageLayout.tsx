import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footerdemo } from "@/components/ui/footer-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { initScrollReveal } from "@/utils/scrollReveal";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black text-white scroll-snap-container"
      >
        <ScrollProgress />
        {children}
        <Footerdemo />
      </motion.main>
    </AnimatePresence>
  );
};