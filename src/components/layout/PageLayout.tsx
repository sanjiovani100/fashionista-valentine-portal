import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Footerdemo } from "@/components/ui/footer-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { initScrollReveal } from "@/utils/scrollReveal";
import { useParallaxScroll } from "@/hooks/useParallaxScroll";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { SkipToContent } from "@/components/ui/skip-to-content";
import { BackToTop } from "@/components/ui/back-to-top";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const scrollY = useParallaxScroll();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

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
        className="min-h-screen bg-black text-white relative"
        style={{
          '--scroll-y': `${scrollY}px`,
          '--scroll-progress': scrollYProgress,
        } as React.CSSProperties}
      >
        <SkipToContent />
        <NavBar />
        <ScrollProgress />
        <div 
          id="main-content" 
          className="scroll-snap-container pt-20"
          role="main"
          tabIndex={-1}
        >
          {children}
        </div>
        <Footerdemo />
        <BackToTop />
      </motion.main>
    </AnimatePresence>
  );
};