import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  publicRuntimeConfig: {
    mapBounds: [[12, 47.7], [23, 51.1]],
    mapTilesUrl: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicG9ib3JpbCIsImEiOiJja3dwY3lxYmMwYmk0MnBwNm96aDIzYWRiIn0.Sz9ldnB1zsjTVRFMdFrz0g',
  },
  privateRuntimeConfig: {
    googleCloudApiKey: process.env.GOOGLE_CLOUD_API_KEY,
  },
})
