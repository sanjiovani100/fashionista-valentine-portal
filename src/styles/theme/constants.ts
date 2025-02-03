export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const CONTAINER_WIDTHS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const SPACING = {
  section: {
    desktop: '6rem',
    tablet: '4rem',
    mobile: '3rem',
  },
  component: {
    desktop: '2rem',
    tablet: '1.5rem',
    mobile: '1rem',
  },
} as const;

export const ASPECT_RATIOS = {
  hero: '16/9',
  card: '4/3',
  square: '1/1',
  portrait: '3/4',
} as const;

export const TRANSITIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%)',
  accent: 'linear-gradient(135deg, var(--red-primary) 0%, var(--red-bright) 100%)',
  dark: 'linear-gradient(to bottom, var(--maroon-dark) 0%, var(--black) 100%)',
  overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))',
} as const;

export const SHADOWS = {
  sm: '0 2px 4px rgba(0,0,0,0.1)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
  glow: '0 0 20px rgba(255,51,102,0.3)',
} as const;

export const Z_INDEX = {
  background: 0,
  content: 10,
  overlay: 20,
  modal: 30,
  tooltip: 40,
} as const;