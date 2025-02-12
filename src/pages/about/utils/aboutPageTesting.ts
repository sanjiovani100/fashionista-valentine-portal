import { checkAccessibility } from '@/utils/testing/accessibilityUtils';
import { checkAnimationPerformance } from '@/utils/testing/animationTesting';
import { checkBrowserCompatibility } from '@/utils/testing/browserCompatibility';
import { testSpacing, testTypography, testResponsiveness, runVisualTests } from '@/utils/testing/visualTesting';
import { measurePerformance, monitorLayoutShifts, monitorImageLoading } from '@/utils/testing/performanceUtils';
import { toast } from 'sonner';

export const runAboutPageTests = async (container: HTMLElement) => {
  console.group('About Page Testing Suite');

  // Performance Testing
  console.group('Performance Tests');
  const metrics = measurePerformance();
  const layoutShiftObserver = monitorLayoutShifts();
  const imageLoadingObserver = monitorImageLoading();
  checkAnimationPerformance(container);
  console.groupEnd();

  // Accessibility Testing
  console.group('Accessibility Tests');
  const accessibilityPassed = await checkAccessibility(container);
  console.info('[Accessibility] Test result:', accessibilityPassed ? 'PASSED' : 'FAILED');
  console.groupEnd();

  // Visual Testing
  console.group('Visual Tests');
  const spacingResults = testSpacing(container);
  const typographyResults = testTypography(container);
  const responsiveResults = testResponsiveness(container);
  
  if (!spacingResults.passed || !typographyResults.passed || !responsiveResults.passed) {
    console.warn('[Visual Tests] Issues found:', {
      spacing: spacingResults.issues,
      typography: typographyResults.issues,
      responsive: responsiveResults.issues
    });
    toast.error("Visual testing found issues. Check console for details.");
  } else {
    toast.success("All visual tests passed!");
  }
  console.groupEnd();

  console.groupEnd();

  return {
    performance: metrics,
    accessibility: accessibilityPassed,
    visual: {
      spacing: spacingResults,
      typography: typographyResults,
      responsive: responsiveResults
    }
  };
};

// Utility to test specific sections
export const testAboutSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.error(`Section with id "${sectionId}" not found`);
    return;
  }

  console.group(`Testing section: ${sectionId}`);
  runVisualTests(section);
  checkAnimationPerformance(section);
  console.groupEnd();
};


