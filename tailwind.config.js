/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "rgb(0, 0 ,0)",
          secondary: "rgb(24 24 27)",
        },
      },
      container: {
        padding: {
          DEFAULT: "0rem",
          lg: "2rem",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
