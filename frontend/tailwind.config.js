/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0047F7',
          beige: '#FFE1CF',
          orange: '#FA4802',
        }
      }
    },
  },
  plugins: [],
}