import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme colors - Elegant Terracotta palette
        theme: {
          // Background colors - Warm dark tones with depth
          bg: {
            primary: '#151210',    // Deep warm black
            secondary: '#1E1A17', // Warm charcoal
            tertiary: '#2A2520',   // Warm slate
          },
          // Text colors - Warm neutrals with excellent readability
          text: {
            primary: '#F8F4F0',    // Warm off-white
            secondary: '#D4CCC4',  // Warm light gray
            tertiary: '#9A938C',   // Warm muted gray
          },
          // Accent colors - Refined terracotta
          accent: {
            primary: '#C67D4A',    // Rich terracotta
            hover: '#D4935F',      // Lighter terracotta for hover
            muted: '#B06A3A',      // Deep terracotta
          },
          // Border colors - Subtle warm borders
          border: {
            primary: '#3A3430',    // Warm dark border
            secondary: '#2A2520',  // Subtle warm border
          },
        },
      },
      fontFamily: {
        // Font families - configured in src/index.css @theme section
        // Change font stacks in index.css to use different fonts across the entire site
        sans: ['var(--font-family-sans)'],
        serif: ['var(--font-family-serif)'],
        mono: ['var(--font-family-mono)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
