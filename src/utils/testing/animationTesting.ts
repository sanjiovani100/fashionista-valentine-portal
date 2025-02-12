export const checkAnimationPerformance = (element: HTMLElement) => {
  const start = performance.now();
  const animationFrames: number[] = [];

  const recordFrame = () => {
    const timestamp = performance.now();
    animationFrames.push(timestamp - start);

    if (timestamp - start < 1000) { // Record for 1 second
      requestAnimationFrame(recordFrame);
    } else {
      // Calculate frame timing statistics
      const frameTimes = animationFrames.map((t, i, arr) => i > 0 ? t - arr[i-1] : 0);
      const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      const fps = 1000 / avgFrameTime;

      console.info('[Animation Performance]:', {
        averageFrameTime: avgFrameTime.toFixed(2) + 'ms',
        fps: fps.toFixed(2),
        droppedFrames: frameTimes.filter(t => t > 16.67).length,
      });
    }
  };

  requestAnimationFrame(recordFrame);
};

export const verifyReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    console.info('[Accessibility] Reduced motion is preferred');
    
    // Find elements with animation classes using a valid approach
    const allElements = document.getElementsByTagName('*');
    const animatedElements = Array.from(allElements).filter(el => {
      return Array.from(el.classList).some(className => className.startsWith('animate-'));
    });
    
    if (animatedElements.length > 0) {
      console.warn('[Accessibility] Animations found despite reduced motion preference:', 
        animatedElements.map(el => ({
          element: el.tagName,
          classes: Array.from(el.classList),
          id: el.id || 'no-id'
        }))
      );
    }
  }

  return prefersReducedMotion;
};


