/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'reveal': 'reveal 1s forwards',
        'slide-in': 'slide-in 0.7s ease-out forwards',
        'slide-out': 'slide-out 0.7s ease-out forwards',
      },
      keyframes: {
        reveal: {
          '0%': { 
            opacity: '0',
            transform: 'translate3d(0, 100px, 0)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-out': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};