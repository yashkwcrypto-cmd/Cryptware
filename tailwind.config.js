/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#06A3DA",
        "brand-h": "#058bbd",
        "brand-glow": "rgba(6, 163, 218, 0.18)",
        "brand-light": "rgba(6, 163, 218, 0.08)",
        ink: "#0b0b0f",
        "ink-2": "#2e2e38",
        "ink-3": "#72727a",
        paper: "#fafaf8",
        "paper-2": "#f3f2ee",
        "paper-3": "#e6e4de",
      },
      fontFamily: {
        serif: ["'DM Serif Display'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
