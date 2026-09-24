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
        primary: '#E54503',
        secondary: '#1A1D1C',
        background: '#F8F8F6',
        surface: '#FFFFFF',
        muted: '#6B6F6D',
        border: '#E4E5E3',
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
