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
      colors: {
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "#800000",
        background: "#000000",
        foreground: "#FFFFFF",
        brand: "hsl(var(--brand))",
        "brand-foreground": "hsl(var(--brand-foreground))",
        // Core Colors
        "pure-white": "#FFFFFF",
        "pure-black": "#000000",
        // Grays
        gray: {
          100: "#F1F1F1",
          200: "#DDDDDD",
          300: "#888888",
          400: "#555555",
          500: "#222222",
        },
        // Reds
        red: {
          deep: "#800000",
          soft: "#FFC1C1",
          dark: "#4A0404",
          light: "#FFE6E6",
        },
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        glow: "0 -16px 128px 0 hsla(var(--brand-foreground) / 0.5) inset, 0 -16px 32px 0 hsla(var(--brand) / 0.5) inset",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        hero: ["4.5rem", { lineHeight: "1.2" }],
        "section-title": ["3rem", { lineHeight: "1.2" }],
        "card-title": ["2rem", { lineHeight: "1.2" }],
        "body-large": ["1.125rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        section: "5rem",
        component: "2rem",
        text: "1rem",
        "button-padding": "1rem 2rem",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
        "card-hover": "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "primary-gradient": "linear-gradient(to right, #800000, #4A0404)",
        "overlay-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(10px)"
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
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;