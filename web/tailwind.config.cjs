/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background.png')",
        'nlw-gradient':
          'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 73.94%, #E1D55D 20.57%)',
        'game-gradient':
          'linear-gradient(188deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 67.88%)',
      },
    },
  },
  plugins: [],
}