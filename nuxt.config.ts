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
      ],
      htmlAttrs: {
        class: ['dark']
      },
    },
  },

  elementPlus: {
    importStyle: 'scss',
    themes: ['dark'],
  },

  modules: [
    '@element-plus/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    public: {
      mapBounds: [[12, 47.7], [23, 51.1]],
      mapStyle: 'dark-v10',
      mapAccessToken: 'pk.eyJ1IjoicG9ib3JpbCIsImEiOiJja3dwY3lxYmMwYmk0MnBwNm96aDIzYWRiIn0.Sz9ldnB1zsjTVRFMdFrz0g',
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/el-override.scss" as element;`,
        },
      },
    },
    server: {
      fs: {
        allow: [
          '/Users/Bobik/Applications/vue-mapbox-ts',
        ],
      },
    },
  },

  compatibilityDate: '2024-08-13',
})
