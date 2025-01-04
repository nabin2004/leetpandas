/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A192F',
        },
        harvard: {
          red: '#C90016',
        }
      }
    },
  },
  plugins: [],
}

