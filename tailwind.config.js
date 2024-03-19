/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'sans-serif'] },
      colors: {
        primary: '#147D73',
        'gray-lightest': '#F8FAFC',
        'gray-darkest': '#212B36',
        'blue-light': '#B2C4D4',
        'blue-gray': '#637381',
        'gray-bg': '#F0F0F0',
        'gray-border': '#E7E7E7',
        'blue-lighter': '#d4e4f2',
        'green-lightest': '#f4fff7',
        'green-dark': '#08822a',
        'red-lightest': '#DC3545'
      }
    }
  },
  plugins: []
}
