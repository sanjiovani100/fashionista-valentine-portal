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
        // Primary Colors
        "fashion-pink": "#FF00CC",
        "deep-purple": "#333399",
        "pure-black": "#000000",
        "pure-white": "#FFFFFF",
        // Secondary Colors
        "muted-pink": "rgba(255, 0, 204, 0.1)",
        "soft-purple": "rgba(51, 51, 153, 0.1)",
        // Grayscale
        gray: {
          100: "#F0F0F0",
          300: "#D1D1D1",
          500: "#A3A3A3",
          700: "#666666",
          900: "#1A1A1A",
        },
        // Status Colors
        error: "#FF3B3B",
        success: "#00C853",
        warning: "#FFB300",
        info: "#0088FF",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        hero: ["4.5rem", { lineHeight: "1.2" }],
        h1: ["3rem", { lineHeight: "1.2" }],
        h2: ["2.5rem", { lineHeight: "1.2" }],
        h3: ["2rem", { lineHeight: "1.2" }],
        h4: ["1.5rem", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        heading: "-0.02em",
        body: "0",
        button: "0.05em",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
      },
      borderRadius: {
        button: "8px",
        card: "16px",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #FF00CC, #333399)",
        "hover-gradient": "linear-gradient(to right, #FF1AD4, #3D3DB2)",
        "active-gradient": "linear-gradient(to right, #E600B8, #2D2D87)",
        "overlay-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "slide-in": "slideIn 300ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;