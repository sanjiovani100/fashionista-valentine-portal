import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Footerdemo } from "@/components/ui/footer-section";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { BackToTop } from "@/components/ui/back-to-top";
import { useReducedMotion } from "framer-motion";
import { checkBrowserCompatibility } from "@/utils/testing/browserCompatibility";
import { checkAccessibility, verifyAriaLabels } from "@/utils/testing/accessibilityUtils";
import { measurePerformance, monitorLayoutShifts } from "@/utils/testing/performanceUtils";
import { checkDeviceCapabilities } from "@/utils/testing/deviceTesting";
import { checkAnimationPerformance, verifyReducedMotion } from "@/utils/testing/animationTesting";
import { toast } from "sonner";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Run tests in development only
    if (process.env.NODE_ENV === 'development') {
      const runTests = async () => {
        try {
          // Browser compatibility check
          const compatibilityResults = checkBrowserCompatibility();
          console.info('[Browser Compatibility]:', compatibilityResults);
          
          // Device capabilities check
          const deviceCapabilities = checkDeviceCapabilities();
          console.info('[Device Capabilities]:', deviceCapabilities);
          
          // Performance monitoring
          const performanceMetrics = measurePerformance();
          console.info('[Performance Metrics]:', performanceMetrics);
          
          // Layout shift monitoring
          const layoutObserver = monitorLayoutShifts();
          
          // Accessibility checks
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            const accessibilityResults = await checkAccessibility(mainContent);
            const ariaResults = verifyAriaLabels(mainContent);
            const animationResults = checkAnimationPerformance(mainContent);
            
            console.info('[Accessibility Results]:', { 
              accessibility: accessibilityResults,
              aria: ariaResults,
              animations: animationResults 
            });

            // Notify of any critical issues
            if (!accessibilityResults) {
              toast.error("Accessibility issues detected. Check console for details.");
            }
          }
          
          // Verify reduced motion preferences
          verifyReducedMotion();
          
          return () => {
            layoutObserver?.disconnect();
          };
        } catch (error) {
          console.error('[Testing Error]:', error);
          toast.error("Error running tests. Check console for details.");
        }
      };

      runTests();
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
          className="skip-links fixed z-50" 
          aria-label="Skip navigation"
        >
          <a 
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                     focus:px-4 focus:py-2 focus:bg-red-accent focus:text-white focus:rounded-md
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-accent
                     transition-transform duration-200"
          >
            Skip to main content
          </a>
          <a 
            href="#footer"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-44
                     focus:px-4 focus:py-2 focus:bg-red-accent focus:text-white focus:rounded-md
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-accent
                     transition-transform duration-200"
          >
            Skip to footer
          </a>
        </nav>

        <NavBar />
        
        <div 
          id="main-content" 
          className="scroll-snap-container pt-16 space-y-8 md:space-y-12 lg:space-y-16"
          role="main"
          tabIndex={-1}
        >
          {children}
        </div>

        <footer 
          id="footer" 
          role="contentinfo" 
          tabIndex={-1}
          className="bg-black relative z-10 mt-8 md:mt-12 lg:mt-16"
        >
          <Footerdemo />
        </footer>

        <BackToTop />
      </motion.main>
    </AnimatePresence>
  );
};
