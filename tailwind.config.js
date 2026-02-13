/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F28C28", // Cadmium Orange
        primaryDark: "#E67E22",
        background: "#FFFFFF",
        textPrimary: "#1F2937",
        textSecondary: "#6B7280",
      },
    },
  },
  plugins: [],
}