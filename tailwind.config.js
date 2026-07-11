/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        flicker: 'flicker 1.1s steps(1) infinite',
        marquee: 'marquee 28s linear infinite',
      },
      fontFamily: {
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'monospace'],
      },
      colors: {
        paper: "#f6f5f2", // warm off-white background
        surface: "#ffffff", // raised card surface
        ink: "#0f0f0f", // near-black primary text
        muted: "#6b6b6b", // secondary text
        line: "#e6e4de", // hairline borders
        accent: "#ff4655", // valorant red, used sparingly
      },
    },
  },
  plugins: [],
};
