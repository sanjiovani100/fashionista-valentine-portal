import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
      screens: {
        sm: "100%",
        md: "90%",
        lg: "1200px",
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        // Primary Colors
        maroon: {
          DEFAULT: "#8B0000", // Enhanced deep maroon
          light: "#B22222",
          dark: "#4A0404",
        },
        black: {
          DEFAULT: "#0A0A0A", // Softer black
          pure: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
          secondary: "rgba(255,255,255,0.8)",
          muted: "rgba(255,255,255,0.6)",
        },
        
        // Accent Colors
        pink: {
          magenta: "#D946EF",
          light: "#FFD6E7",
        },
        purple: {
          vivid: "#8B5CF6",
          soft: "#D6BCFA",
        },
        red: {
          accent: "#FF3366",
          soft: "#FFC1C1",
          light: "#FFE6E6",
          deep: "#8B0000",
        },
        
        // Gray Scale
        gray: {
          100: "#F1F1F1",
          200: "#DDDDDD",
          300: "#888888",
          400: "#555555",
          500: "#222222",
          highlight: "#F0F0F0",
        },
        
        // System Colors
        border: "rgba(255,255,255,0.1)",
        input: "rgba(255,255,255,0.1)",
        ring: "#FF3366",
        background: "#0A0A0A",
        foreground: "#FFFFFF",
      },
      
      // Enhanced Gradients
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #8B0000, #4A0404)",
        "accent-gradient": "linear-gradient(135deg, #FF3366, #D946EF)",
        "purple-gradient": "linear-gradient(135deg, #8B5CF6, #D946EF)",
        "overlay-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9))",
        "hero-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
        "card-hover": "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      
      // Interactive States
      opacity: {
        '85': '0.85',
        '95': '0.95',
      },
      brightness: {
        '95': '.95',
        '105': '1.05',
        '110': '1.1',
      },
      ringWidth: {
        '3': '3px',
      },
      ringOffsetWidth: {
        '3': '3px',
      },
      
      // Font Size
      fontSize: {
        hero: ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "section-title": ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "card-title": ["2.25rem", { lineHeight: "1.2" }],
        "body-large": ["1.25rem", { lineHeight: "1.6" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },

      // Enhanced Animations
      keyframes: {
        "stagger-fade-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(30px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        }
      },
      animation: {
        "stagger-fade-up": "stagger-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
