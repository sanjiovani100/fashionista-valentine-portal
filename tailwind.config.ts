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
      // Enhanced Colors
      colors: {
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "#800000",
        background: "#000000",
        foreground: "#FFFFFF",
        brand: "hsl(var(--brand))",
        "brand-foreground": "hsl(var(--brand-foreground))",
        "pure-white": "#FFFFFF",
        "pure-black": "#000000",
        gray: {
          100: "#F1F1F1",
          200: "#DDDDDD",
          300: "#888888",
          400: "#555555",
          500: "#222222",
        },
        red: {
          deep: "#800000",
          soft: "#FFC1C1",
          dark: "#4A0404",
          light: "#FFE6E6",
          accent: "#FF3366",
        },
        purple: {
          soft: "#D6BCFA",
          vivid: "#8B5CF6",
        },
        pink: {
          magenta: "#D946EF",
          light: "#FFD6E7",
        },
      },

      // Enhanced Typography
      fontSize: {
        hero: ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "section-title": ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "card-title": ["2.25rem", { lineHeight: "1.2" }],
        "body-large": ["1.25rem", { lineHeight: "1.6" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },

      // Enhanced Gradients
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
        "card-hover": "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "primary-gradient": "linear-gradient(135deg, #800000, #4A0404)",
        "accent-gradient": "linear-gradient(135deg, #FF3366, #FF6B6B)",
        "overlay-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9))",
        "purple-gradient": "linear-gradient(135deg, #D6BCFA, #8B5CF6)",
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
