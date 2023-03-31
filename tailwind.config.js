/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Colors by use case.
      colors: {
        'main-bg': '#171717',
        'alt-bg': '#333',
        'main-blue': '#075985',
        'highlight-blue': '#4189e0',
        'active-blue': '#0D3852',
        'modal-gray': '#a1a1aa',
        'modal-white': '#f4f4f5',
        'main-text': '#eee',
        'alt-text': '#ccc',
      },
      // Fonts by use case.
      fontFamily: {
        'main-text-f': ['"Crimson Text"', 'serif'],
        'alt-text-f': ['"Lato"', 'sans-serif'],
        'display-text-f': ['"Forum"', 'Copperstone'],
        'tile-text-f': ['"Rubik"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar')
  ],
}
