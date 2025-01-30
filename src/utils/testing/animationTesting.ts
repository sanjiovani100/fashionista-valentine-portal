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
    // Verify that animations are disabled or simplified
    document.querySelectorAll('.animate-*').forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.animation !== 'none') {
        console.warn('[Accessibility] Animation found despite reduced motion preference:', element);
      }
    });
  }

  return prefersReducedMotion;
};