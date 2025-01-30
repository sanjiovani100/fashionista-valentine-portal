export const checkBrowserCompatibility = () => {
  const features = {
    flexbox: CSS.supports('display', 'flex'),
    grid: CSS.supports('display', 'grid'),
    customProperties: CSS.supports('(--custom-property: value)'),
    intersectionObserver: 'IntersectionObserver' in window,
    mutationObserver: 'MutationObserver' in window,
    webAnimations: 'animate' in document.createElement('div'),
    touchEvents: 'ontouchstart' in window,
  };

  const warnings = Object.entries(features)
    .filter(([, supported]) => !supported)
    .map(([feature]) => `${feature} is not supported`);

  if (warnings.length > 0) {
    console.warn('[Browser Compatibility]:', warnings);
  }

  return features;
};