const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: colors.neutral, // renamed to 'neutral' in v3.0
        mapboxBase: '#343332',
        btcOrange: '#f7931a'
      },
      container: {
        center: true,
        padding: '1rem'
      },
      dropShadow: {
        'white-1': '0 0 1px rgb(255, 255, 255)',
        'white-2': '0 0 2px rgb(255, 255, 255)',
        'white-3': '0 0 3px rgb(255, 255, 255)'
      },
      scale: {
        200: '2'
      },
      animation: {
        breath: 'breath 1s infinite'
      },
      keyframes: {
        breath: {
          '0%, 100%': { transform: 'scale(1.5)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'scale(2.2)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
