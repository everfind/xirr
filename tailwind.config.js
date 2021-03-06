module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: '#5397d2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
