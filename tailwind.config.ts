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
        // Core Colors
        "pure-white": "#FFFFFF",
        "pure-black": "#000000",
        // Grays
        gray: {
          100: "#F1F1F1",    // Light Gray
          200: "#DDDDDD",    // Medium Light Gray
          300: "#888888",    // Medium Gray
          400: "#555555",    // Medium Dark Gray
          500: "#222222",    // Dark Gray
        },
        // Reds
        red: {
          deep: "#800000",    // Deep Maroon
          soft: "#FFC1C1",    // Soft Red
          dark: "#4A0404",    // Dark Red
          light: "#FFE6E6",   // Light Red
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        hero: ["4.5rem", { lineHeight: "1.2" }],      // 72px
        "section-title": ["3rem", { lineHeight: "1.2" }],  // 48px
        "card-title": ["2rem", { lineHeight: "1.2" }],     // 32px
        "body-large": ["1.125rem", { lineHeight: "1.5" }], // 18px
        body: ["1rem", { lineHeight: "1.5" }],             // 16px
        small: ["0.875rem", { lineHeight: "1.5" }],        // 14px
      },
      spacing: {
        section: "5rem",      // 80px
        component: "2rem",    // 32px
        text: "1rem",        // 16px
        "button-padding": "1rem 2rem", // 16px 32px
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
        "card-hover": "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "primary-gradient": "linear-gradient(to right, #800000, #4A0404)",
        "overlay-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
      },
      animation: {
        "fade-up": "fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-up": "scaleUp 300ms ease-out",
        "slide-up": "slideUp 300ms ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;