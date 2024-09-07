/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#FFD389', // Define a custom color
        'custom-popup-bg': 'rgba(255, 223, 186, 0.95)',
      },
    },
  },
  plugins: [],
}
