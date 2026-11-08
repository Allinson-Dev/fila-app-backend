/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ivory: '#F9F5F0',
          cream: '#F3E9DD',
          sand: '#E8D9C8',
          olive: '#91A57B',
          leaf: '#6C8A55',
          rose: '#D4A5A5',
          terracotta: '#B97575',
          brown: '#7A5D42',
          deep: '#4E3726'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}