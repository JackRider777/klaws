/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
        grotesk: ['"Space Grotesk"', "sans-serif"], // Free alternative to URW Grotesk
      },
    },
  },
  plugins: [],
};
