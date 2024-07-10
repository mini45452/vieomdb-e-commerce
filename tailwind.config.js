/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          700: '#047857',
          900: '#065f46',
        },
        beige: {
          100: '#f5f5dc',
        },
      },
    },
  },
  plugins: [],
}
