/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'mixology-lime': "rgb(155, 210, 30)",
      },
      boxShadow: {
        "glass-bronze":
          "inset 0 1px 0 rgba(200,130,60,0.16),  inset 0 -1px 0 rgba(0,0,0,0.42), 0 14px 44px rgba(0,0,0,0.72)",
        "glass-violet":
          "inset 0 1px 0 rgba(168,78,218,0.15),  inset 0 -1px 0 rgba(0,0,0,0.42), 0 14px 44px rgba(0,0,0,0.72)",
        "glass-red":
          "inset 0 1px 0 rgba(210,65,75,0.15),   inset 0 -1px 0 rgba(0,0,0,0.42), 0 14px 44px rgba(0,0,0,0.72)",
        "glass-sky":
          "inset 0 1px 0 rgba(80,190,250,0.16),  inset 0 -1px 0 rgba(0,0,0,0.42), 0 14px 44px rgba(0,0,0,0.72)",
        "glass-lime":
          "inset 0 1px 0 rgba(155,210,30,0.15),  inset 0 -1px 0 rgba(0,0,0,0.42), 0 14px 44px rgba(0,0,0,0.72)",
      },
      backgroundColor: {
        "glass-bronze": "rgba(90,  45,  10,  0.40)",
        "glass-violet": "rgba(55,  18,  72,  0.40)",
        "glass-red": "rgba(75,  12,  18,  0.40)",
        "glass-sky": "rgba(5,   55,  95,  0.38)",
        "glass-lime": "rgba(38,  58,  5,   0.40)",
      },
      borderColor: {
        "glass-bronze": "rgba(180, 110, 45,  0.28)",
        "glass-violet": "rgba(145, 60,  195, 0.26)",
        "glass-red": "rgba(185, 50,  60,  0.26)",
        "glass-sky": "rgba(50,  165, 230, 0.28)",
        "glass-lime": "rgba(130, 185, 20,  0.26)",
      },
    },
  },
  plugins: [],
};
