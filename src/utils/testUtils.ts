import { useEffect } from 'react';

// Animation and transition testing utility
export const testAnimations = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.animation !== 'none' || computedStyle.transition !== 'none';
};

// Performance monitoring utility
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Track First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.info(`[Performance] ${entry.name}: ${entry.startTime}ms`);
      }
    });
    
    paintObserver.observe({ entryTypes: ['paint'] });
    
    // Track Layout Shifts
    const layoutObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceEntry[]) {
        if (entry.entryType === 'layout-shift') {
          console.info(`[Performance] Layout shift detected: ${entry.startTime}ms`);
        }
      }
    });
    
    layoutObserver.observe({ entryTypes: ['layout-shift'] });
    
    return () => {
      paintObserver.disconnect();
      layoutObserver.disconnect();
    };
  }, []);
};

// Accessibility testing utility
export const checkAccessibility = (element: HTMLElement): void => {
  // Check for proper ARIA attributes
  const missingAriaLabels = element.querySelectorAll('[role]:not([aria-label])');
  if (missingAriaLabels.length > 0) {
    console.warn('[Accessibility] Elements with roles missing aria-labels:', missingAriaLabels);
  }

  // Check for proper heading hierarchy
  const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let previousLevel = 0;
  headings.forEach((heading) => {
    const currentLevel = parseInt(heading.tagName[1]);
    if (currentLevel - previousLevel > 1) {
      console.warn('[Accessibility] Skipped heading level:', heading);
    }
    previousLevel = currentLevel;
  });
};

// Cross-browser compatibility check
export const checkBrowserCompatibility = (): void => {
  const browserFeatures = {
    flexbox: 'flex' in document.documentElement.style,
    grid: 'grid' in document.documentElement.style,
    customProperties: CSS.supports('(--custom-property: value)'),
    intersectionObserver: 'IntersectionObserver' in window,
    mutationObserver: 'MutationObserver' in window,
  };

  Object.entries(browserFeatures).forEach(([feature, supported]) => {
    if (!supported) {
      console.warn(`[Compatibility] ${feature} is not supported in this browser`);
    }
  });
};


