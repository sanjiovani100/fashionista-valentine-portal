export const checkBrowserCompatibility = () => {
  const features = {
    flexbox: CSS.supports('display', 'flex'),
    grid: CSS.supports('display', 'grid'),
    customProperties: CSS.supports('(--custom-property: value)'),
    intersectionObserver: 'IntersectionObserver' in window,
    mutationObserver: 'MutationObserver' in window,
    webAnimations: 'animate' in document.createElement('div'),
    touchEvents: 'ontouchstart' in window,
    webp: document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0,
    avif: CSS.supports('image-rendering', 'pixelated') // Basic check, not definitive
  };

  const warnings = Object.entries(features)
    .filter(([, supported]) => !supported)
    .map(([feature]) => `${feature} is not supported`);

  if (warnings.length > 0) {
    console.warn('[Browser Compatibility]:', warnings);
  } else {
    console.info('[Browser Compatibility] All required features are supported');
  }

  return features;
};

export const detectBrowser = () => {
  const ua = navigator.userAgent;
  const browsers = {
    chrome: ua.indexOf('Chrome') > -1,
    firefox: ua.indexOf('Firefox') > -1,
    safari: ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1,
    edge: ua.indexOf('Edg') > -1,
    ie: ua.indexOf('Trident/') > -1
  };

  console.info('[Browser Detection]:', browsers);
  return browsers;
};