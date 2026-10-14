/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        custom: ['"PT Sans Caption"', "Roboto"],
        roboto: ["Roboto"],
      },

      colors: {
        brandRed: "rgb(208, 37, 45)",
      },

      keyframes: {
        fade: {
          "0%, 100%": {
            opacity: "0.2",
          },
          "50%": {
            opacity: "1",
          },
        },
      },

      animation: {
        fade: "fade 1.5s infinite",
      },
    },
  },

  plugins: [],
};
