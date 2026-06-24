import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "IBM Plex Sans Arabic",
          "Cairo",
          "Inter",
          "Segoe UI",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#05070B",
        indigo: "#1E2F6F",
        gold: "#C9A44C",
        emerald: "#22C55E",
      },
      boxShadow: {
        legal: "0 24px 90px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
