// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Custom purple gradient colors
          'purple': {
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed'
          },
          'indigo': {
            500: '#6366f1',
            600: '#4f46e5'
          },
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        },
        backdropBlur: {
          xs: '2px',
        }
      },
    },
    plugins: [],
  }