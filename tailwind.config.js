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
        'main-text': '#eee',
        'alt-text': '#ccc',
        'highlight': '#c0ffee',
        'alt-highlight': 'yellow',
        'main-orange': '#e5302d',
        'highlight-orange': '#0c4a6e',
        'active-orange': '#f2956a',
      },
      // Fonts by use case.
      fontFamily: {
        'main-text-f': ['"Crimson Text"', 'serif'],
        'alt-text-f': ['"Lato"', 'sans-serif'],
        'display-text-f': ['"Forum"', 'Copperstone']
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar')
  ],
}
