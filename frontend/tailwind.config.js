/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "quoteColor": "#f3f4f6",
        "textGray": "#6b6b6b",
        "bgPrimary": "#1a1a1a"
      },
      fontFamily: {
        euclid: ["Euclid Circular B", "sans-serif"]
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, and Opera */
        }
      }
      addUtilities(newUtilities);
    },
    require('@tailwindcss/typography')
  ],
}

