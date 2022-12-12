/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    // Colors by use case.
    colors: {
      'main-bg': '#222',
      'alt-bg': '#444',
      'main-text': '#eee',
      'alt-text': '#ccc',
      'highlight': '#c0ffee',
      'alt-highlight': 'yellow',
      'main-orange': '#f25939',
      'highlight-orange': '#fe6601',
      'active-orange': '#f2956a'
    },
    // Fonts by use case.
    fontFamily: {
      'main-text-f': ['sans-serif', 'lucida-console'],
      'alt-text-f': ['serif'],
      'display-text-f': ['Papyrus', 'Copperstone']
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
