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
        sm: "640px",   /* Mobile */
        md: "768px",   /* Tablet */
        lg: "1024px",  /* Desktop */
        xl: "1280px",  /* Large Desktop */
      },
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Primary Colors - Maroon Scale
        maroon: {
          DEFAULT: "hsl(var(--maroon))",
          light: "hsl(var(--maroon-light))",
          dark: "hsl(var(--maroon-dark))",
        },
        // Accent Colors - Red Scale
        red: {
          bright: "hsl(var(--red-bright))",
          primary: "hsl(var(--red-primary))",
          soft: "hsl(var(--red-soft))",
        },
        // Gray Scale
        gray: {
          100: "hsl(var(--gray-100))",
          200: "hsl(var(--gray-200))",
          300: "hsl(var(--gray-300))",
          400: "hsl(var(--gray-400))",
          500: "hsl(var(--gray-500))",
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
        "primary-gradient": "linear-gradient(135deg, hsl(var(--maroon)) 0%, hsl(var(--maroon-dark)) 100%)",
        "accent-gradient": "linear-gradient(135deg, hsl(var(--red-primary)) 0%, hsl(var(--red-bright)) 100%)",
        "dark-gradient": "linear-gradient(to bottom, hsl(var(--maroon-dark)) 0%, var(--black) 100%)",
        "card-hover": "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "hero-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255,51,102,0.3)",
        "glow-intense": "0 0 30px rgba(255,51,102,0.5)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      animation: {
        "stagger-fade-in": "fadeIn var(--duration-normal) var(--ease-out) forwards",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center"
          }
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;