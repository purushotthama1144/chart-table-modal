/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      vsm: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '26px'],
      xl: ['24px', '32px'],
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },

    extend: {
      fontFamily: {
        'sans': ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        // 'ipadpro':{'min': '1000px', 'max': '1289px'},
        // 'desktop':{'min': '1020px', 'max': '1370px'},
        // 'desktop1':{'min': '1400px', 'max': '1470px'},
        // 1366*768=> @media (min-width: 1300px and max-width: 1370px) { ... }
        'xs':'300px',
        'xl-2xl': '1400px',
        '3xl': '1800px',
        // => @media (min-width: 1800px) { ... }
        '4xl': '2500px',
        // => @media (min-width: 2500px) { ... }
      },
      width: {
        'fit-content': 'fit-content',
      }
    },
  },

  plugins: [
  ],
}

