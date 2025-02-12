import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.1) => {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return {
    ref,
    inView,
    shouldAnimate: !prefersReducedMotion,
  };
};


