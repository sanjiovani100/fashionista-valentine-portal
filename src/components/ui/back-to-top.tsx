import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";
import { cx } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className={cx(
              "bg-red-accent hover:bg-red-accent/90 text-white",
              "shadow-lg rounded-full p-3 backdrop-blur-sm",
              "transition-all duration-300 hover:scale-110",
              "focus:ring-2 focus:ring-red-accent focus:ring-offset-2",
              "focus:ring-offset-black focus:outline-none"
            )}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


