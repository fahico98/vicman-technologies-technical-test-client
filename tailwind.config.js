/** @type {import('tailwindcss').Config} */
import flowbiteReact from "flowbite-react/plugin/tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      // If you want to add additional small breakpoints, you can’t use "extend" because the
      // small breakpoint would be added to the end of the breakpoint list, and breakpoints
      // need to be sorted from smallest to largest in order to work as expected with a
      // min-width breakpoint system.
      screens: {
        xs: "400px", // @media (min-width: 400px) { ... }
        ...defaultTheme.screens
      },
    },
  },
  plugins: [flowbiteReact],
  darkMode: 'selector'
}