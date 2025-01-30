import { motion, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-1 bg-red-accent origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};