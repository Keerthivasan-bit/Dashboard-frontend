/* eslint-disable no-undef */
const { heroui } = require("@heroui/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F5C231',
        'secondary': '#292665',
        'regal-light':"#F6F6F6"
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    heroui()
  ],
}