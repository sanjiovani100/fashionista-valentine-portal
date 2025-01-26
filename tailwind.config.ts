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
        ring: "#FF00CC",
        background: "#000000",
        foreground: "#FFFFFF",
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
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        // New typography scale
        hero: ["4.5rem", { lineHeight: "1.2" }],      // 72px
        "section-title": ["3rem", { lineHeight: "1.2" }],  // 48px
        "card-title": ["2rem", { lineHeight: "1.2" }],     // 32px
        "body-large": ["1.125rem", { lineHeight: "1.5" }], // 18px
        body: ["1rem", { lineHeight: "1.5" }],             // 16px
        small: ["0.875rem", { lineHeight: "1.5" }],        // 14px
      },
      spacing: {
        // Base unit: 4px
        xs: "0.25rem",    // 4px
        sm: "0.5rem",     // 8px
        md: "1rem",       // 16px
        lg: "1.5rem",     // 24px
        xl: "2rem",       // 32px
        "2xl": "3rem",    // 48px
        "3xl": "4rem",    // 64px
      },
      borderRadius: {
        button: "8px",
        card: "16px",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #FF00CC, #333399)",
        "hover-gradient": "linear-gradient(to right, #FF1AD4, #3D3DB2)",
        "active-gradient": "linear-gradient(to right, #E600B8, #2D2D87)",
        "muted-gradient": "linear-gradient(to right, rgba(255,0,204,0.1), rgba(51,51,153,0.1))",
        "overlay-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))",
      },
      animation: {
        "fade-up": "fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        "stagger-fade": "fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--stagger-delay)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;