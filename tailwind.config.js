/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#16a34a',
          'green-light': '#dcfce7',
          'green-dark': '#14532d',
          red: '#dc2626',
          black: '#0a0a0a',
          gray: '#f5f5f5',
        }
      }
    },
  },
  plugins: [],
}
