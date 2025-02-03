import type { Config } from "tailwindcss";
import { theme } from "./src/styles/theme";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    ...theme,
    extend: {
      // Color System
      colors: {
        // Primary Colors
        maroon: {
          DEFAULT: '#800000',
          light: '#A52A2A',
          dark: '#4D0000',
        },
        red: {
          primary: 'hsl(var(--red-primary))',
          bright: 'hsl(var(--red-bright))',
          soft: 'hsl(var(--red-soft))',
          accent: '#FF1A1A',
        },
        // Background Colors
        background: {
          DEFAULT: 'hsl(var(--background))',
          dark: '#0A0A0A',
          card: 'rgba(255, 255, 255, 0.05)',
        },
        // Text Colors
        text: {
          primary: 'hsl(var(--foreground))',
          secondary: 'rgba(255, 255, 255, 0.7)',
          muted: 'rgba(255, 255, 255, 0.5)',
        },
      },

      // Typography System
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        // Desktop Typography Scale
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['3rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['2.25rem', { lineHeight: '1.4' }],
        'h4': ['1.875rem', { lineHeight: '1.4' }],
        'h5': ['1.5rem', { lineHeight: '1.5' }],
        'h6': ['1.25rem', { lineHeight: '1.5' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }],
      },

      // Spacing System
      spacing: {
        // Base Units
        '0.5': '0.125rem',  // 2px
        '1': '0.25rem',     // 4px
        '2': '0.5rem',      // 8px
        '3': '0.75rem',     // 12px
        '4': '1rem',        // 16px
        '6': '1.5rem',      // 24px
        '8': '2rem',        // 32px
        '12': '3rem',       // 48px
        '16': '4rem',       // 64px
        '24': '6rem',       // 96px
        '32': '8rem',       // 128px
        
        // Component Specific
        'section': '6rem',
        'section-sm': '4rem',
        'card': '1.5rem',
        'button': '1rem',
      },

      // Border Radius
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',    // 4px
        DEFAULT: '0.5rem',  // 8px
        'lg': '1rem',       // 16px
        'xl': '1.5rem',     // 24px
        'full': '9999px',
      },

      // Shadows
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.1)',
        DEFAULT: '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px rgba(0,0,0,0.1)',
        'glow': '0 0 20px rgba(255,51,102,0.3)',
        'glow-intense': '0 0 30px rgba(255,51,102,0.5)',
      },

      // Animation System
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },

      // Transitions
      transitionDuration: {
        DEFAULT: '300ms',
        fast: '150ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;