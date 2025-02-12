import { default as axe } from 'axe-core';

export const checkAccessibility = async (element: HTMLElement) => {
  try {
    const results = await axe.run(element);
    
    if (results.violations.length > 0) {
      console.warn('[Accessibility Issues]:', 
        results.violations.map(violation => ({
          impact: violation.impact,
          description: violation.description,
          elements: violation.nodes.map(node => node.html)
        }))
      );
      return false;
    }
    
    console.info('[Accessibility] No violations found');
    return true;
  } catch (error) {
    console.error('[Accessibility Check Error]:', error);
    return false;
  }
};

export const verifyAriaLabels = (element: HTMLElement) => {
  const interactive = element.querySelectorAll(
    'button, a, input, select, textarea, [role], [aria-label], [aria-labelledby]'
  );
  const issues: Array<{ element: string; issue: string }> = [];

  interactive.forEach((el) => {
    const hasAriaLabel = el.getAttribute('aria-label') || 
                        el.getAttribute('aria-labelledby') ||
                        el.getAttribute('title');
    
    const hasVisibleText = el.textContent?.trim();
    const isHidden = el.getAttribute('aria-hidden') === 'true';
    
    if (!hasAriaLabel && !hasVisibleText && !isHidden) {
      issues.push({
        element: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : ''),
        issue: 'Missing accessible name'
      });
    }
  });

  if (issues.length > 0) {
    console.warn('[ARIA Issues]:', issues);
  } else {
    console.info('[ARIA] All interactive elements have proper labels');
  }

  return issues.length === 0;
};


