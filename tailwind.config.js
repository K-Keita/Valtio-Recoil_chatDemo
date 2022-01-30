module.exports = {
  content: [],
  theme: {
    extend: {
      animation: {
        "fade-in":
          "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
};
