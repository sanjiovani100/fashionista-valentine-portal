import { colors } from './colors';
import { backgroundImage } from './gradients';
import { effects } from './effects';
import { animations } from './animations';
import { typography } from './typography';
import { layout } from './layout';

export const theme = {
  colors: {
    primary: {
      background: 'hsl(0 0% 4%)',
      text: 'hsl(0 0% 100%)',
      accent: 'hsl(0 100% 27%)',
      hover: 'hsl(0 68% 41%)',
      dark: 'hsl(0 91% 15%)',
      bright: 'hsl(348 100% 54%)'
    },
    fashion: {
      pink: 'hsl(348 100% 54%)',
      pinkDark: 'hsl(348 100% 44%)',
      pinkLight: 'hsl(348 100% 64%)'
    },
    gray: {
      100: 'hsl(0 0% 95%)',
      200: 'hsl(0 0% 85%)',
      300: 'hsl(0 0% 75%)',
      400: 'hsl(0 0% 65%)',
      500: 'hsl(0 0% 55%)'
    }
  },
  typography: {
    fonts: {
      heading: 'Montserrat, sans-serif',
      body: 'Inter, sans-serif',
      accent: 'Poppins, sans-serif'
    },
    sizes: {
      hero: {
        desktop: '48px',
        tablet: '40px',
        mobile: '36px'
      },
      heading: {
        desktop: '40px',
        tablet: '36px',
        mobile: '32px'
      },
      subheading: {
        desktop: '24px',
        tablet: '22px',
        mobile: '20px'
      },
      body: {
        desktop: '18px',
        tablet: '16px',
        mobile: '16px'
      }
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    section: '6rem',
    component: '2rem',
    element: '1rem'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px'
  },
  layout: {
    maxWidth: '1440px',
    contentWidth: '1280px',
    gridColumns: 12,
    containerPadding: {
      desktop: '40px',
      mobile: '20px'
    }
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
  }
} as const;

export type Theme = typeof theme;


