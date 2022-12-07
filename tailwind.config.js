/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/pages/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{html,js,jsx,ts,tsx}",
    "./src/layouts/**/*.{html,js,jsx,ts,tsx}",
    "./src/index.html",
  ],
  content: ["./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        small: "0.62rem",
        med: "2rem",
      },
      fontSize: {
        ex: "1rem",
      },
    },
  },
  plugins: [],
};
