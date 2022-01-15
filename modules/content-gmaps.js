import gmapsPlace from '../lib/gmaps-place'

export default function () {
  this.nuxt.hook('content:file:beforeInsert', (document) => {
    if (document.dir === '/places') {
      gmapsPlace(process.env.GOOGLE_CLOUD_API_KEY, document.googleMapsId).then((place) => {
        document.googleMaps = place
      })
    }
  })
}
