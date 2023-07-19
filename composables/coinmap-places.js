import axios from 'axios'

/** @param {number[][]} mapBounds */
export default async function (mapBounds) {
  const { data: { venues } } = await axios.get('https://coinmap.org/api/v1/venues/', {
    params: {
      mode: 'full',
      lon1: mapBounds[0][0],
      lon2: mapBounds[1][0],
      lat1: mapBounds[0][1],
      lat2: mapBounds[1][1]
    }
  })

  return venues.filter(venue => ['CZ', 'SK'].includes(venue.country))
}
