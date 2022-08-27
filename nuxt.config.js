export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BeruBitcoin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  publicRuntimeConfig: {
    mapBounds: [[12, 47.7], [23, 51.1]],
    mapStyle: 'mapbox://styles/mapbox/dark-v10',
    mapAccessToken: 'pk.eyJ1IjoicG9ib3JpbCIsImEiOiJja3dwY3lxYmMwYmk0MnBwNm96aDIzYWRiIn0.Sz9ldnB1zsjTVRFMdFrz0g',
    dooFrontendKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNGI2ZDkyMi1jOTA1LTQ1ODctYmJjZi02ODc4NjE5NWVjYTYiLCJ1bmlxdWVfbmFtZSI6ImFwaVRva2VuSWRfYWYxZmQxNDEtYjJhMi00OTRmLThlZDAtZjU5NzI3MDk2MDZiIiwicHVycG9zZSI6IkFQSVRva2VuIiwiYXBpVG9rZW5JZCI6ImFmMWZkMTQxLWIyYTItNDk0Zi04ZWQwLWY1OTcyNzA5NjA2YiIsIm5iZiI6MTY1Mzc0OTM4MywiZXhwIjo0ODA5NDIyOTgzLCJpYXQiOjE2NTM3NDkzODN9.r59Uf_aGUWSHktkacKB00rAT8D8LjTI9OHqxbYxYNLA'
  },
  privateRuntimeConfig: {
    googleCloudApiKey: process.env.GOOGLE_CLOUD_API_KEY
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      lang: 'cs',
      name: 'mapa.BeruBitcoin.cz',
      ogHost: 'https://mapa.berubitcoin.cz',
      ogImage: '/ogimage.jpg',
      theme_color: '#f7931a'
    },
    manifest: {
      name: 'mapa.BeruBitcoin.cz',
      short_name: 'BeruBitcoin',
      background_color: '#343332',
      lang: 'cs'
    }
  },

  devServerHandlers: [], // Workaround for https://github.com/nuxt-community/tailwindcss-module/issues/480

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    host: '0.0.0.0',
    port: 3300
  }
}
