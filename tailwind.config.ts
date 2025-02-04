import type { Config } from "tailwindcss";
import { theme } from "./src/styles/theme";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    ...theme,
    extend: {
      // Animation System
      animation: {
        marquee: 'marquee var(--duration, 30s) linear infinite',
        'fade-in': 'fadeIn var(--duration-normal) var(--ease-out)',
        'slide-up': 'slideUp var(--duration-normal) var(--ease-out)',
        'scale-in': 'scaleIn var(--duration-normal) var(--ease-out)',
        'stagger-fade': 'fadeIn var(--duration-normal) var(--ease-out) forwards',
      },
      keyframes: {
        marquee: {
          to: { transform: 'translateX(-50%)' }
        },
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
        }
      },
      // Typography System
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        // Mobile first approach
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'h3': ['2rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'h4': ['1.5rem', { lineHeight: '1.5' }],
        // Desktop sizes
        'h1-desktop': ['4rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2-desktop': ['3rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'h3-desktop': ['2.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'h4-desktop': ['2rem', { lineHeight: '1.5' }],
      },
      // Color System
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        maroon: {
          DEFAULT: '#800000',
          light: '#A52A2A',
          dark: '#4D0000',
        },
        red: {
          primary: 'hsl(var(--red-primary))',
          bright: 'hsl(var(--red-bright))',
          soft: 'hsl(var(--red-soft))',
        },
        gray: {
          100: 'hsl(var(--gray-100))',
          200: 'hsl(var(--gray-200))',
          300: 'hsl(var(--gray-300))',
          400: 'hsl(var(--gray-400))',
          500: 'hsl(var(--gray-500))',
        }
      },
      // Spacing System
      spacing: {
        section: '6rem',      // 96px
        'section-inner': '4rem', // 64px
        component: '2rem',    // 32px
        element: '1rem',      // 16px
      },
      // Component Sizes
      minHeight: {
        'btn-lg': '48px',
        'btn-md': '40px',
        'btn-sm': '32px',
        'touch-target': '44px',
      },
      // Transition System
      transitionDuration: {
        normal: 'var(--duration-normal)',
        fast: 'var(--duration-fast)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'var(--ease-out)',
      },
      // Shadow System
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 12px rgba(0, 0, 0, 0.15)',
        'btn': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'btn-hover': '0 4px 8px rgba(0, 0, 0, 0.2)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;