/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
      },
      fontFamily: {
        aloevera: ['"Aloevera"', "sans-serif"],
        poppins: ["Poppins-Regular", "sans-serif"],
        poppinsbold: ["Poppins-Bold", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
