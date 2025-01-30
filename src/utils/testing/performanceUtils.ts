interface LayoutShiftMetric extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export const measurePerformance = () => {
  if (!window.performance || !window.performance.getEntriesByType) {
    console.warn('[Performance] Performance API not supported');
    return null;
  }

  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paintTiming = performance.getEntriesByType('paint');
  const resourceTiming = performance.getEntriesByType('resource');

  const metrics = {
    loadTime: navigationTiming.loadEventEnd - navigationTiming.startTime,
    firstPaint: paintTiming.find(entry => entry.name === 'first-paint')?.startTime,
    firstContentfulPaint: paintTiming.find(entry => entry.name === 'first-contentful-paint')?.startTime,
    resourceCount: resourceTiming.length,
    resourceLoadTime: resourceTiming.reduce((acc, entry) => acc + entry.duration, 0),
  };

  console.info('[Performance Metrics]:', metrics);
  return metrics;
};

export const monitorLayoutShifts = () => {
  if (!window.PerformanceObserver) {
    console.warn('[Performance] PerformanceObserver not supported');
    return;
  }

  let cumulativeLayoutShiftScore = 0;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShift = entry as LayoutShiftMetric;
      
      if (!layoutShift.hadRecentInput) {
        cumulativeLayoutShiftScore += layoutShift.value;
        console.info('[Layout Shift]:', {
          value: layoutShift.value.toFixed(4),
          cumulative: cumulativeLayoutShiftScore.toFixed(4),
          timestamp: entry.startTime.toFixed(0) + 'ms'
        });
      }
    }
  });

  observer.observe({ entryTypes: ['layout-shift'] });
  return observer;
};

export const monitorImageLoading = () => {
  const imageObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
        console.info('[Image Loading]:', {
          url: entry.name,
          duration: entry.duration.toFixed(2) + 'ms',
          size: (entry as PerformanceResourceTiming).transferSize / 1024 + 'KB'
        });
      }
    }
  });

  imageObserver.observe({ entryTypes: ['resource'] });
  return imageObserver;
};