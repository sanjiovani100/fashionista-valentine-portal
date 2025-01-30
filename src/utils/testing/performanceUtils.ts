export const measurePerformance = () => {
  if (!window.performance || !window.performance.getEntriesByType) {
    console.warn('[Performance] Performance API not supported');
    return null;
  }

  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paintTiming = performance.getEntriesByType('paint');

  return {
    loadTime: navigationTiming.loadEventEnd - navigationTiming.startTime,
    firstPaint: paintTiming.find(entry => entry.name === 'first-paint')?.startTime,
    firstContentfulPaint: paintTiming.find(entry => entry.name === 'first-contentful-paint')?.startTime,
  };
};

export const monitorLayoutShifts = () => {
  if (!window.PerformanceObserver) {
    console.warn('[Performance] PerformanceObserver not supported');
    return;
  }

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'layout-shift') {
        // Cast to LayoutShift type which includes the value property
        const layoutShift = entry as any;
        console.info('[Layout Shift]:', {
          value: layoutShift.value || 0,
          timestamp: entry.startTime,
        });
      }
    }
  });

  observer.observe({ entryTypes: ['layout-shift'] });
  return observer;
};