/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#1B73E8',
      },
      minWidth: {
        40: '10rem',
        '480px': '480px',
      },
      borderBottom: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
