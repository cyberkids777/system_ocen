/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D0BB95",
        "background-light": "#f7f7f6",
        "background-dark": "#ffffffff"
      },
      fontFamily: {
        display: "Lexend"
      },
    }
  },
}