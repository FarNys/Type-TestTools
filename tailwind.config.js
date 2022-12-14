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
      keyframes: {
        getfill: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(200%)" },
        },
        fadeInOut: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        getfill: "getfill 2s ease-in-out infinite",
        fadeInOut: "fadeInOut 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
