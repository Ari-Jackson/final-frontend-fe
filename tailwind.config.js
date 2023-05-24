/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "hand-writing": ["Shadows Into Light", "cursive"],
        "official-serif": ["EB Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
