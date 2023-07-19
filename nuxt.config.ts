import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devServer: { port: 3300 },

  app: {
    head: {
      title: 'Mapa.BeruBitcoin.cz',
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },

  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    public: {
      mapBounds: [[12, 47.7], [23, 51.1]],
      mapStyle: 'dark-v10',
      mapAccessToken: 'pk.eyJ1IjoicG9ib3JpbCIsImEiOiJja3dwY3lxYmMwYmk0MnBwNm96aDIzYWRiIn0.Sz9ldnB1zsjTVRFMdFrz0g',
      dooFrontendKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmNGI2ZDkyMi1jOTA1LTQ1ODctYmJjZi02ODc4NjE5NWVjYTYiLCJ1bmlxdWVfbmFtZSI6ImFwaVRva2VuSWRfYWYxZmQxNDEtYjJhMi00OTRmLThlZDAtZjU5NzI3MDk2MDZiIiwicHVycG9zZSI6IkFQSVRva2VuIiwiYXBpVG9rZW5JZCI6ImFmMWZkMTQxLWIyYTItNDk0Zi04ZWQwLWY1OTcyNzA5NjA2YiIsIm5iZiI6MTY1Mzc0OTM4MywiZXhwIjo0ODA5NDIyOTgzLCJpYXQiOjE2NTM3NDkzODN9.r59Uf_aGUWSHktkacKB00rAT8D8LjTI9OHqxbYxYNLA'
    },

  },

  pwa: {
    manifest: {
      background_color: '#343332',
      lang: 'cs',
      name: 'Mapa.BeruBitcoin.cz',
      short_name: 'BeruBitcoin'
    },
    registerWebManifestInRouteRules: true,
    /* meta: {
      appleStatusBarStyle: 'black-translucent',
      lang: 'cs',
      mobileAppIOS: true,
      name: 'Mapa.BeruBitcoin.cz',
      ogHost: 'https://mapa.berubitcoin.cz',
      ogImage: '/ogimage.jpg',
      theme_color: '#f7931a',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui, viewport-fit=cover'
    } */
  },

  telemetry: false,

  vite: {
    server: {
      fs: {
        allow: [
          '/Users/Bobik/Applications/vue-mapbox-ts',
        ],
      },
    },
  },
})
