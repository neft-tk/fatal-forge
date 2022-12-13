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
        'main-bg': '#222',
        'alt-bg': '#444',
        'main-text': '#eee',
        'alt-text': '#ccc',
        highlight: '#c0ffee',
        'alt-highlight': 'yellow',
        'main-orange': '#f25939',
        'highlight-orange': '#fe6601',
        'active-orange': '#f2956a',
      },
      // Fonts by use case.
      fontFamily: {
        'main-text-f': ['"Crimson Text"', 'serif'],
        'alt-text-f': ['"Lato"', 'sans-serif'],
        'display-text-f': ['"Unbounded"', 'Copperstone'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
