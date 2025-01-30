import { Variants } from 'framer-motion';

/**
 * Standard fade-in animation variant
 * Used for smooth entrance animations of components
 */
export const fadeInVariant: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Staggered children animation variant
 * Used for lists where children should animate in sequence
 */
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Scale animation variant with hover effect
 * Used for interactive elements that should respond to hover
 */
export const scaleHoverVariant: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

/**
 * Scroll-triggered animation variant
 * Used for elements that should animate as they enter the viewport
 */
export const scrollRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Reduced motion variants
 * Used as fallbacks when user prefers reduced motion
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};