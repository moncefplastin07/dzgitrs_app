module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    rotate: {
      '360': '360deg',
     }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
