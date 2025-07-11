/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      serif: ['"Marcellus", serif'], // Add your font here
      body: ['Jost', 'Roboto', 'sans-serif']
    },},
  },
  plugins: [],
}