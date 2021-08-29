module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    rotate: {
      '360': '360deg',
     },
     extend: {
      screens: {
        'xs': {'max': '639px'},
      },
      animation: {
        wiggle: 'wiggle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wiggle: {
          '50%': { backgroundColor: 'rgba(209, 213, 219,  0.4)' },
        }
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
