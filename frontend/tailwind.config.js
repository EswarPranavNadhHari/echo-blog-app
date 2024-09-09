import { highlight } from 'lowlight/lib/core';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        accent: 'var(--color-accent)',
        highlight: 'var(--color-highlight)',
        quoteColor: '#f3f4f6',
        textGray: '#6b6b6b',
        bgPrimary: '#1a1a1a',
      },
      fontFamily: {
        euclid: ['Euclid Circular B', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities);
    },
    require('@tailwindcss/typography'),
  ],
};
