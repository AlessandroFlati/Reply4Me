/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Prevent Tailwind from interfering with website styles
  corePlugins: {
    preflight: false,
  },
}
