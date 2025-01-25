export const theme = {
  transitions: {
    duration: "300ms",
    timing: "ease-out",
  },
  breakpoints: {
    mobile: 639,
    tablet: 1023,
    desktop: 1024,
  },
  spacing: {
    container: {
      mobile: "1rem",
      desktop: "2rem",
    },
    grid: {
      columns: 12,
      gutter: "2rem",
      margin: "1rem",
    },
  },
  components: {
    button: {
      height: "48px",
      padding: "16px 32px",
      borderRadius: "8px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "24px",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
  },
  toast: {
    background: "rgba(0, 0, 0, 0.9)",
    borderRadius: "8px",
    duration: 3000,
  },
} as const;