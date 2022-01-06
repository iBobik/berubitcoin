import config from '#config'
import { $fetch } from 'ohmyfetch'
import gmapsPlace from './gmaps-place'

export default async (req, res) => {
  const results = await Promise.all([getCoinmapVenues(), getVerifiedPlaces()])
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
  return results.flat()
}

async function getCoinmapVenues() {
  const { venues } = await $fetch('https://coinmap.org/api/v1/venues/', {
    params: {
      mode: 'full',
      lon1: config.mapBounds[0][0],
      lon2: config.mapBounds[1][0],
      lat1: config.mapBounds[0][1],
      lat2: config.mapBounds[1][1]
    }
  })

  return venues
    .filter(venue => ['CZ', 'SK'].includes(venue.country))
    .map(venue => ({
      type: 'coinmap',
      coinmapId: venue.id,
      name: venue.name,
      lonLat: [venue.lon, venue.lat],
      category: venue.category,
      website: venue.website
    }))
}

async function getVerifiedPlaces() {
  const places = [
    { // https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
      slug: 'brno-akvarna',
      name: 'Akvárna',
      googleMapsId: 'ChIJQe_OAg6VEkcRRux_tsXXVAM',
      coinMapId: 15205
    }
  ]

  const promises = places.map(async place => ({
    ...(await gmapsPlace(place.googleMapsId)),
    ...place,
    type: 'ln_verified',
  }))

  return Promise.all(promises)
}
