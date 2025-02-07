import { checkAccessibility } from './accessibilityUtils';
import { checkAnimationPerformance } from './animationTesting';
import { checkBrowserCompatibility } from './browserCompatibility';
import { checkDeviceCapabilities } from './deviceTesting';
import { measurePerformance, monitorLayoutShifts } from './performanceUtils';
import { runVisualTests } from './visualTesting';

export const runAboutPageTests = async (container: HTMLElement) => {
  console.group('About Page Testing Suite');

  // Performance Testing
  console.group('Performance Tests');
  const metrics = measurePerformance();
  const layoutShiftObserver = monitorLayoutShifts();
  checkAnimationPerformance(container);
  console.groupEnd();

  // Accessibility Testing
  console.group('Accessibility Tests');
  const accessibilityPassed = await checkAccessibility(container);
  console.info('[Accessibility] Test result:', accessibilityPassed ? 'PASSED' : 'FAILED');
  console.groupEnd();

  // Browser & Device Testing
  console.group('Browser & Device Compatibility');
  const browserFeatures = checkBrowserCompatibility();
  const deviceCaps = checkDeviceCapabilities();
  console.info('[Device Capabilities]:', deviceCaps);
  console.groupEnd();

  // Visual Testing
  console.group('Visual Tests');
  runVisualTests(container);
  console.groupEnd();

  // Loading States
  console.group('Loading States');
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    console.info('[Image Loading]:', {
      src: img.src,
      loading: img.loading,
      complete: img.complete,
      naturalWidth: img.naturalWidth
    });
  });
  console.groupEnd();

  // Error Handling
  console.group('Error Handling');
  const errorBoundaries = container.querySelectorAll('[data-testid="error-boundary"]');
  console.info('[Error Boundaries]:', {
    count: errorBoundaries.length,
    locations: Array.from(errorBoundaries).map(el => el.id || 'unnamed')
  });
  console.groupEnd();

  console.groupEnd();

  return {
    performance: metrics,
    accessibility: accessibilityPassed,
    browserCompatibility: browserFeatures,
    deviceCapabilities: deviceCaps
  };
};

export const testAboutPageResponsiveness = (container: HTMLElement) => {
  const breakpoints = [
    { name: 'mobile-sm', width: 320 },
    { name: 'mobile', width: 375 },
    { name: 'mobile-lg', width: 428 },
    { name: 'tablet', width: 768 },
    { name: 'laptop', width: 1024 },
    { name: 'desktop', width: 1280 },
    { name: 'desktop-lg', width: 1440 }
  ];

  console.group('Responsive Testing');
  
  breakpoints.forEach(bp => {
    console.group(`Testing ${bp.name} (${bp.width}px)`);
    
    // Test content visibility
    const hiddenElements = container.querySelectorAll('[class*="hidden"]');
    console.info('[Hidden Elements]:', hiddenElements.length);

    // Test touch targets
    const interactiveElements = container.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        console.warn('[Touch Target]:', 'Too small for mobile', {
          element: el.tagName,
          width: rect.width,
          height: rect.height
        });
      }
    });

    // Test text overflow
    const textElements = container.querySelectorAll('h1, h2, h3, p');
    textElements.forEach(el => {
      if (el.scrollWidth > el.clientWidth) {
        console.warn('[Text Overflow]:', {
          element: el.tagName,
          content: el.textContent?.slice(0, 50) + '...'
        });
      }
    });

    console.groupEnd();
  });

  console.groupEnd();
};