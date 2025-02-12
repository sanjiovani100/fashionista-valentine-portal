export const colors = {
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
} as const;


