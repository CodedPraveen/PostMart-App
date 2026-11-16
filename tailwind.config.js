/** @type {import('tailwindcss').Config} */
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
        primary: '#171717',
        accent: '#E54503',
        secondary: '#171717',
        background: '#F7F7F5',
        surface: '#FFFFFF',
        muted: '#737373',
        border: '#E5E5E3',
        success: '#18794E',
        warning: '#A86200',
        error: '#C62828',
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
