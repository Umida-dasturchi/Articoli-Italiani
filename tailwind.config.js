/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#194939", // text, headings
        primary: "#30864B",     // buttons, hover
        secondary: "#4DA874",   // background of cards
        accent: "#FFC2B4",      // soft backgrounds
        soft: "#D8E989",        // page bg
      },
    },
  },
  plugins: [],
};