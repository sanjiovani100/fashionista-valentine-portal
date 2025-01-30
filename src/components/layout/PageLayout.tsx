import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Footerdemo } from "@/components/ui/footer-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { BackToTop } from "@/components/ui/back-to-top";
import { useReducedMotion } from "framer-motion";
import { checkBrowserCompatibility } from "@/utils/testing/browserCompatibility";
import { checkAccessibility, verifyAriaLabels } from "@/utils/testing/accessibilityUtils";
import { measurePerformance, monitorLayoutShifts } from "@/utils/testing/performanceUtils";
import { checkDeviceCapabilities } from "@/utils/testing/deviceTesting";
import { checkAnimationPerformance, verifyReducedMotion } from "@/utils/testing/animationTesting";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Run tests in development only
    if (process.env.NODE_ENV === 'development') {
      // Browser compatibility check
      checkBrowserCompatibility();
      
      // Device capabilities check
      checkDeviceCapabilities();
      
      // Performance monitoring
      const performanceMetrics = measurePerformance();
      console.info('[Performance Metrics]:', performanceMetrics);
      
      // Layout shift monitoring
      const layoutObserver = monitorLayoutShifts();
      
      // Accessibility checks
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        checkAccessibility(mainContent);
        verifyAriaLabels(mainContent);
        checkAnimationPerformance(mainContent);
      }
      
      // Verify reduced motion preferences
      verifyReducedMotion();
      
      return () => {
        layoutObserver?.disconnect();
      };
    }
  }, []);

  const mainVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { 
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        {...mainVariants}
        className="min-h-screen bg-black text-white relative"
        style={{
          '--scroll-y': `${scrollYProgress}px`,
          '--scroll-progress': scrollYProgress,
        } as React.CSSProperties}
      >
        {/* Enhanced Skip Links with better contrast and focus styles */}
        <nav 
          className="skip-links" 
          aria-label="Skip navigation"
        >
          <a 
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                     focus:px-4 focus:py-2 focus:bg-red-accent focus:text-white focus:rounded-md
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-accent
                     transition-transform duration-200"
          >
            Skip to main content
          </a>
          <a 
            href="#footer"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-44 focus:z-50
                     focus:px-4 focus:py-2 focus:bg-red-accent focus:text-white focus:rounded-md
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-accent
                     transition-transform duration-200"
          >
            Skip to footer
          </a>
        </nav>

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

        <footer 
          id="footer" 
          role="contentinfo" 
          tabIndex={-1}
          className="bg-black relative z-10"
        >
          <Footerdemo />
        </footer>

        <BackToTop />
      </motion.main>
    </AnimatePresence>
  );
};