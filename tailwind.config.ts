import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // in case you are not using src folder
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#dc2626', // Red 600
          dark: '#991b1b',    // Red 800
          light: '#f87171',   // Red 400
          glow: 'rgba(220, 38, 38, 0.15)',
          dim: 'rgba(220, 38, 38, 0.05)',
        },
        grey: {
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          600: '#52525b',
        }
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;