/** @type {import('tailwindcss').Config} */
const palette = require('./constants/palette.json');

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: palette.deepDark,
        accent: palette.orange,
        secondary: palette.deepDark,
        background: palette.warmOffWhite,
        surface: palette.white,
        muted: palette.mutedGrey,
        border: palette.borderGrey,
        success: palette.success,
        warning: palette.warning,
        error: palette.error,
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};
