const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: colors.neutral, // renamed to 'neutral' in v3.0
        mapboxBase: '#343332'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
