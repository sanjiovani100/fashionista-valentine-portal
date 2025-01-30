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

  console.info('[Performance Metrics]:', {
    ...metrics,
    timestamp: new Date().toISOString(),
    url: window.location.pathname
  });
  return metrics;
};

export const monitorLayoutShifts = () => {
  if (!window.PerformanceObserver) {
    console.warn('[Performance] PerformanceObserver not supported');
    return;
  }

  let cumulativeLayoutShiftScore = 0;
  let sessionEntries: LayoutShiftMetric[] = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShift = entry as LayoutShiftMetric;
      
      if (!layoutShift.hadRecentInput) {
        cumulativeLayoutShiftScore += layoutShift.value;
        sessionEntries.push(layoutShift);
        
        console.info('[Layout Shift]:', {
          value: layoutShift.value.toFixed(4),
          cumulative: cumulativeLayoutShiftScore.toFixed(4),
          timestamp: entry.startTime.toFixed(0) + 'ms',
          totalShifts: sessionEntries.length,
          averageShift: (cumulativeLayoutShiftScore / sessionEntries.length).toFixed(4)
        });

        // Alert if CLS is getting high
        if (cumulativeLayoutShiftScore > 0.1) {
          console.warn('[Performance] High Cumulative Layout Shift detected:', cumulativeLayoutShiftScore.toFixed(4));
        }
      }
    }
  });

  observer.observe({ entryTypes: ['layout-shift'] });
  return observer;
};

export const monitorImageLoading = () => {
  const imageLoadTimes: Record<string, number> = {};
  
  const imageObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
        const loadTime = entry.duration;
        const size = (entry as PerformanceResourceTiming).transferSize;
        const url = entry.name;
        
        imageLoadTimes[url] = loadTime;

        console.info('[Image Loading]:', {
          url: url.split('/').pop(), // Just the filename
          duration: loadTime.toFixed(2) + 'ms',
          size: (size / 1024).toFixed(2) + 'KB',
          timestamp: new Date().toISOString()
        });

        // Alert if image load time is high
        if (loadTime > 1000) {
          console.warn('[Performance] Slow image load detected:', {
            url: url.split('/').pop(),
            duration: loadTime.toFixed(2) + 'ms'
          });
        }
      }
    }
  });

  imageObserver.observe({ entryTypes: ['resource'] });
  return imageObserver;
};

export const getPerformanceSummary = () => {
  const metrics = measurePerformance();
  if (!metrics) return;

  console.info('[Performance Summary]:', {
    ...metrics,
    memoryUsage: (performance as any).memory ? {
      usedJSHeapSize: ((performance as any).memory.usedJSHeapSize / 1048576).toFixed(2) + 'MB',
      totalJSHeapSize: ((performance as any).memory.totalJSHeapSize / 1048576).toFixed(2) + 'MB'
    } : 'Not available',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  });
};