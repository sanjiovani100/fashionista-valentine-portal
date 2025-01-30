import { useReducedMotion } from "framer-motion";

export const getAnimationDuration = (prefersReducedMotion: boolean) => {
  return prefersReducedMotion ? 0 : 0.3;
};

export const fadeInUpVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: (prefersReducedMotion: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: getAnimationDuration(prefersReducedMotion),
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: (prefersReducedMotion: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.1,
      delayChildren: prefersReducedMotion ? 0 : 0.2
    }
  })
};

export const scaleInVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: (prefersReducedMotion: boolean) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: getAnimationDuration(prefersReducedMotion),
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export const useOptimizedAnimations = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return {
    fadeInUp: {
      ...fadeInUpVariants,
      visible: fadeInUpVariants.visible(!!prefersReducedMotion)
    },
    staggerContainer: {
      ...staggerContainerVariants,
      visible: staggerContainerVariants.visible(!!prefersReducedMotion)
    },
    scaleIn: {
      ...scaleInVariants,
      visible: scaleInVariants.visible(!!prefersReducedMotion)
    }
  };
};