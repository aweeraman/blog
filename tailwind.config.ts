import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme colors - change these values to update the entire site theme
        theme: {
          // Background colors
          bg: {
            primary: '#0f172a',    // Main background (slate-900)
            secondary: '#1e293b',  // Card/elevated background (slate-800)
            tertiary: '#334155',   // Hover/accent background (slate-700)
          },
          // Text colors
          text: {
            primary: '#f1f5f9',    // Main headings (slate-100)
            secondary: '#cbd5e1',  // Body text (slate-300)
            tertiary: '#94a3b8',   // Muted text (slate-400)
          },
          // Accent colors
          accent: {
            primary: '#60a5fa',    // Links/buttons (blue-400)
            hover: '#3b82f6',      // Hover state (blue-500)
            muted: '#93c5fd',      // Subtle accents (blue-300)
          },
          // Border colors
          border: {
            primary: '#475569',    // Main borders (slate-600)
            secondary: '#334155',  // Subtle borders (slate-700)
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
