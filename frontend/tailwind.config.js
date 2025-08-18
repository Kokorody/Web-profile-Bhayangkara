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
        'reveal': 'reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in': 'slide-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-out': 'slide-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 8s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'reverse-spin': 'reverse-spin 25s linear infinite',
        'breathing': 'breathing 5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'orbit': 'orbit 30s linear infinite',
        'morph': 'morph 10s ease-in-out infinite',
        'morph-reverse': 'morph-reverse 12s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
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
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        'spin-slow': {
          'from': {
            transform: 'rotate(0deg)',
          },
          'to': {
            transform: 'rotate(360deg)',
          },
        },
        'reverse-spin': {
          'from': {
            transform: 'rotate(360deg)',
          },
          'to': {
            transform: 'rotate(0deg)',
          },
        },
        'breathing': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.8',
          },
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'orbit': {
          'from': {
            transform: 'rotate(0deg) translateX(120px) rotate(0deg)',
          },
          'to': {
            transform: 'rotate(360deg) translateX(120px) rotate(-360deg)',
          },
        },
        'morph': {
          '0%, 100%': {
            borderRadius: '50%',
            transform: 'scale(1)',
          },
          '50%': {
            borderRadius: '30%',
            transform: 'scale(1.1)',
          },
        },
        'morph-reverse': {
          '0%, 100%': {
            borderRadius: '30%',
            transform: 'scale(1.1)',
          },
          '50%': {
            borderRadius: '50%',
            transform: 'scale(1)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};