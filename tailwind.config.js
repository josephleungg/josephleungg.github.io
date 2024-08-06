/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        'weak': '2px',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        flicker: 'flicker 1s infinite',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto Mono', 'monospace'],
      },
      colors: {
        primary: "#22092C",
        menuColor: "#130518",
        secondary: "#e61c39",
        tertiary: "#cb374b",
      },
    },
  },
  plugins: [],
};
