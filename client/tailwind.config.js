/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        borderShadowColorChange: {
          '0%': { borderColor: 'red', boxShadow: '0 4px 6px rgba(255, 0, 0, 0.5)' },
          '50%': { borderColor: 'blue', boxShadow: '0 4px 6px rgba(0, 0, 255, 0.5)' },
          '100%': { borderColor: 'green', boxShadow: '0 4px 6px rgba(0, 255, 0, 0.5)' },
        },
      },
      animation: {
        borderShadowColorChange: 'borderShadowColorChange 2s infinite',
      },
    },
  },
  plugins: [],
}

