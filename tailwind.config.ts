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
        // Primary Colors - Maroon Scale
        maroon: {
          DEFAULT: "#8B0000",
          light: "#B22222",
          dark: "#4A0404",
        },
        // Accent Colors - Red Scale
        red: {
          bright: "#FF1744",
          primary: "#FF3366",
          soft: "#FF6B81",
        },
        // Gray Scale
        gray: {
          100: "#F1F1F1",
          200: "#DDDDDD",
          300: "#888888",
          400: "#555555",
          500: "#222222",
        },
        // Base Colors
        black: {
          DEFAULT: "#0A0A0A",
          pure: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
          opacity: {
            80: "rgba(255,255,255,0.8)",
            60: "rgba(255,255,255,0.6)",
            40: "rgba(255,255,255,0.4)",
            20: "rgba(255,255,255,0.2)",
          },
        },
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%)",
        "accent-gradient": "linear-gradient(135deg, var(--red-primary) 0%, var(--red-bright) 100%)",
        "dark-gradient": "linear-gradient(to bottom, var(--maroon-dark) 0%, var(--black) 100%)",
        "card-hover": "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      opacity: {
        '85': '0.85',
        '95': '0.95',
      },
      ringWidth: {
        '3': '3px',
      },
      ringOffsetWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;