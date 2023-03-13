/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1200px',
      },
      zIndex: {
        1: 1,
        2: 2,
      },
      colors: {
        black:{
        },
        blue: {
          300: "#7480FF",
          500: "#4381FF",
          600: "#4420FF",
        },
        green:{
          500: "#2DCE89"
        },
        yellow: {
          500: "#F1CB06",
        },
        red:{
          500: "#F04438",
        },
        pink: {
          300: "#AC489D",
          400: "#C954AA",
          500: "#D46FB7",
          600: "#ED72E1",
        },
        gray: {
          50: "#C0BFCA",
          100: "#A4A7B6",
          200: "#8A8C9E",
          300: "#6F7389",
          400: "#5D617A",
          500: "#494E69",
          600: "#3B4059",
          700: "#2D424F",
          800: "#1E2A43",
          900: "#0C0E2E",
          background: "#2D424FAB", 
          button:"rgba(255, 255, 255, 0.1)",
          light: "#9497AB",
          lighter: "#F9FAFB",
          dark: "#656E78",
          border: "var(--color-gray-border)",
          divider: "#2D424F",
          gradient: "linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #151F28"
        },
        input:{
          light: "#FFFFFF",
          DEFAULT: "var(--color-input-default)",
          secondary: "var(--color-input-secondary)",
          disabled: "#E5E7EB",
          muted: '#C0BFCA',
          muted2: '#A4A7B6',
          subtle: '#4B5563',
          title: '#E5D6BE',
        },
        paper:{
          DEFAULT: "var(--color-paper-default)",
          gray: "var(--color-paper-gray-default)",
          subtle: "#2C2C4C",
          canvas: "#1E2A43",
          canvasSubtle: "#2D424F",
        },
        icon:{
          default: "#A4A7B6",
          hover: "#6F7389"
        },
        chain: {
          main: "#2ED8A7",
        }
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'mono': ['Barlow', 'ui-monospace']
      },
      backgroundImage:{
        'gradient-primary': "linear-gradient(180deg, rgba(41, 69, 85, 0.42) 29.46%, rgba(44, 50, 73, 0.42) 100%)",
      },
      keyframes: {
        ripple: {
          '0% 100%':{
            transform: 'scaleY(1.3)'
          },
          '50%': {
            transform: 'scaleY(0.8)',
          }
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
})
