/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8a77eb',
        secondary: '#ed3b49',
        text: '#070616',
      },
    },
  },
  plugins: [],
};