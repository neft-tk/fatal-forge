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
<<<<<<< HEAD
        'main-orange': '#f25939',
        'highlight-orange': '#fe6601',
=======
        'highlight': '#c0ffee',
        'alt-highlight': 'yellow',
        'main-orange': '#e5302d',
        'highlight-orange': '#0c4a6e',
>>>>>>> 5528b9526af78f83df7fe608924dbe0091ad113d
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
