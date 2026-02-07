import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        moss: {
          900: "#1F3A2E",
          700: "#2D6A4F"
        },
        sand: {
          50: "#FBF8F1",
          100: "#F4EBDD"
        },
        coral: "#F2B58A"
      },
      boxShadow: {
        card: "0 12px 30px rgba(31, 58, 46, 0.18)"
      },
      keyframes: {
        fadeScale: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        }
      },
      animation: {
        quote: "fadeScale 420ms ease-out"
      }
    }
  },
  plugins: []
};

export default config;
