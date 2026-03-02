/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C10",
        riwa: "#D54518",
      },
      fontFamily: {
        display: ['"Cinzel"', "serif"],
        sans: ["Lato", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      borderRadius: {
        xl2: "20px",
        xl3: "28px",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,.22)",
        pill: "0 10px 30px rgba(0,0,0,.20)",
      },
    },
  },
  plugins: [],
};