export const animations = {
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
  },
} as const;


