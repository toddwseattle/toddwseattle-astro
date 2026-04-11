import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Chronicle Data System tokens
        // See docs/Visual-style/short-color-brief.md for reference

        // Ink - text, meaning, content
        ink: {
          950: "#0D0D0F",
          800: "#1A1A1C",
          600: "#5C5B5E",
        },
        // Graphite - structure, headers, dividers
        graphite: {
          700: "#403F41",
          600: "#4A494C",
          400: "#8A898D",
        },
        // Paper - reading surfaces, background
        paper: {
          50: "#FFFFFF",
          100: "#F4F3F2",
          200: "#ECEBEC",
        },
        // Surface colors for cards/containers
        surface: {
          light: "#FFFFFF",
          dark: "#2E2D30",
        },
        // Accent - interaction, active state, and data emphasis
        accent: {
          teal: "#008080",
          soft: "#E0F2F2",
        },
        // Text colors
        "text-primary": {
          light: "#1A1A1C", // ink-800
          dark: "#F2F2F2", // warm off-white
        },
        "text-secondary": {
          light: "#5C5B5E", // ink-600
          dark: "#E5E5E5", // slightly dimmed
        },
        "text-muted": {
          light: "#8A898D", // graphite-400
          dark: "#8A898D", // graphite-400
        },
      },
    },
  },
  variants: {},
  plugins: [typography],
};
