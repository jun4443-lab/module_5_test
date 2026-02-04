/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1117',
          card: '#1a1d2e',
          sidebar: '#141726',
          border: '#2a2d3e',
          hover: '#252840',
        },
        severity: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#eab308',
          low: '#22c55e',
          info: '#3b82f6',
        },
        action: {
          deny: '#ef4444',
          allow: '#22c55e',
          drop: '#eab308',
        },
      },
    },
  },
  plugins: [],
};
