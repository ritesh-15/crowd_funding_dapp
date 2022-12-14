/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#080F0F",
        primary: "#14CC60",
        primaryHover: "#12b555",
        lightBg: "#fffff",
      },
      fontFamily: {
        nato: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
