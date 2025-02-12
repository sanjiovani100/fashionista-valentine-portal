import { toast } from "sonner";

interface VisualTestResult {
  passed: boolean;
  issues: string[];
}

export const testSpacing = (container: HTMLElement): VisualTestResult => {
  const issues: string[] = [];
  const sections = container.querySelectorAll('section');
  
  // Check vertical spacing between sections
  sections.forEach((section, index) => {
    if (index > 0) {
      const prevSection = sections[index - 1];
      const spacing = section.getBoundingClientRect().top - 
                     prevSection.getBoundingClientRect().bottom;
      
      if (spacing < 48 || spacing > 128) {
        issues.push(`Inconsistent spacing (${spacing}px) between sections ${index-1} and ${index}`);
      }
    }
  });

  return {
    passed: issues.length === 0,
    issues
  };
};

export const testTypography = (container: HTMLElement): VisualTestResult => {
  const issues: string[] = [];
  const textElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
  
  textElements.forEach(element => {
    const styles = window.getComputedStyle(element);
    const fontSize = parseFloat(styles.fontSize);
    
    // Check font sizes
    if (element.tagName === 'H1' && fontSize < 32) {
      issues.push('H1 font size is too small for mobile');
    }
    
    // Check line height
    const lineHeight = parseFloat(styles.lineHeight) / fontSize;
    if (lineHeight < 1.2 || lineHeight > 1.8) {
      issues.push(`Irregular line height (${lineHeight}) on ${element.tagName}`);
    }
  });

  return {
    passed: issues.length === 0,
    issues
  };
};

export const testResponsiveness = (container: HTMLElement): VisualTestResult => {
  const issues: string[] = [];
  const viewportWidth = window.innerWidth;
  
  // Check for horizontal overflow
  if (container.scrollWidth > viewportWidth) {
    issues.push('Horizontal scrolling detected - possible responsiveness issue');
  }
  
  // Check touch targets on mobile
  if (viewportWidth < 768) {
    const interactiveElements = container.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        issues.push('Touch target too small for mobile');
      }
    });
  }

  return {
    passed: issues.length === 0,
    issues
  };
};

export const testAccessibility = (container: HTMLElement): VisualTestResult => {
  const issues: string[] = [];
  
  // Check for proper heading hierarchy
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let previousLevel = 0;
  
  headings.forEach(heading => {
    const currentLevel = parseInt(heading.tagName[1]);
    if (currentLevel - previousLevel > 1) {
      issues.push(`Skipped heading level: from h${previousLevel} to h${currentLevel}`);
    }
    previousLevel = currentLevel;
  });
  
  // Check for images without alt text
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt) {
      issues.push('Image missing alt text');
    }
  });
  
  // Check for proper ARIA labels
  const interactiveElements = container.querySelectorAll('[role]');
  interactiveElements.forEach(element => {
    if (!element.getAttribute('aria-label') && 
        !element.getAttribute('aria-labelledby')) {
      issues.push('Interactive element missing ARIA label');
    }
  });

  return {
    passed: issues.length === 0,
    issues
  };
};

export const runVisualTests = (container: HTMLElement) => {
  console.group('Visual Polish Testing Results');
  
  const tests = [
    { name: 'Spacing', fn: testSpacing },
    { name: 'Typography', fn: testTypography },
    { name: 'Responsiveness', fn: testResponsiveness },
    { name: 'Accessibility', fn: testAccessibility }
  ];
  
  let hasIssues = false;
  
  tests.forEach(({ name, fn }) => {
    const result = fn(container);
    console.group(name);
    console.log(`Passed: ${result.passed}`);
    if (result.issues.length > 0) {
      hasIssues = true;
      console.log('Issues found:', result.issues);
    }
    console.groupEnd();
  });
  
  console.groupEnd();
  
  if (hasIssues) {
    toast.error("Visual testing found issues. Check console for details.");
  } else {
    toast.success("All visual tests passed!");
  }
};


