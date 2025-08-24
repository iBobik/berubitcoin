import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devServer: { port: 3300 },

  app: {
    head: {
      title: 'Mapa kde berou Bitcoin | BeruBitcoin.cz',
      meta: [
        { name: 'og:name', content: 'Mapa.BeruBitcoin.cz' },
        { name: 'og:host', content: 'https://mapa.berubitcoin.cz' },
        { name: 'og:image', content: '/ogimage.jpg' },
        { name: 'apple-mobile-web-app-title', content: 'Mapa BB' },
        { charset: 'utf-8' },
        { name: 'lang', content: 'cs' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'theme_color', content: '#f7931a' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui, viewport-fit=cover' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/icon.png', sizes: '348x348' },
      ],
      htmlAttrs: {
        class: 'dark',
      },
    },
  },

  devtools: { enabled: true, vueDevTools: true },

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

  nitro: {
    storage: {
      cache: {
        driver: 'cloudflare-kv-binding',
      },
    },
  },

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
      short_name: 'Mapa BB',
      icons: [{ src: '/icon.png', sizes: '348x348', type: 'image/png', purpose: 'any' }],
    },
    registerWebManifestInRouteRules: true,
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
