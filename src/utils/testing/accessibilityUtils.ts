import { axe } from 'axe-core';

export const checkAccessibility = async (element: HTMLElement) => {
  try {
    const results = await axe.run(element);
    
    if (results.violations.length > 0) {
      console.warn('[Accessibility Issues]:', results.violations);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('[Accessibility Check Error]:', error);
    return false;
  }
};

export const verifyAriaLabels = (element: HTMLElement) => {
  const interactive = element.querySelectorAll('button, a, input, select, textarea, [role]');
  const issues: string[] = [];

  interactive.forEach((el) => {
    const hasAriaLabel = el.getAttribute('aria-label') || 
                        el.getAttribute('aria-labelledby') ||
                        el.getAttribute('title');
    
    if (!hasAriaLabel) {
      issues.push(`Missing ARIA label on ${el.tagName.toLowerCase()}`);
    }
  });

  if (issues.length > 0) {
    console.warn('[ARIA Issues]:', issues);
  }

  return issues.length === 0;
};