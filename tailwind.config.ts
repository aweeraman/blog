import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme colors - Elegant Terracotta palette
        theme: {
          // Background colors - Warm dark tones
          bg: {
            primary: '#1A1512',    // Deep warm black
            secondary: '#252019',  // Warm charcoal
            tertiary: '#36302A',   // Warm slate
          },
          // Text colors - Warm neutrals
          text: {
            primary: '#F5F0EB',    // Warm off-white
            secondary: '#D9D0C7',  // Warm light gray
            tertiary: '#A8A099',   // Warm muted gray
          },
          // Accent colors - Terracotta tones
          accent: {
            primary: '#C2703A',    // Rich terracotta
            hover: '#A65B2A',      // Deep terracotta
            muted: '#D4896A',      // Soft terracotta
          },
          // Border colors - Warm dark borders
          border: {
            primary: '#4A433C',    // Warm dark border
            secondary: '#2E2823',  // Subtle warm border
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
