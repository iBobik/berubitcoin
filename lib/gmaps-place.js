import axios from 'axios'

/**
 * @param {string} googleCloudApiKey
 * @param {string} placeId
 */
export default async (googleCloudApiKey, placeId) => {
  const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
    params: {
      placeid: placeId,
      key: googleCloudApiKey
      // TODO: fields https://developers.google.com/maps/documentation/places/web-service/details#fields
    }
  })

  if (data.status !== 'OK') {
    console.log(data)
    throw new Error('Failed to get Google Maps place ' + placeId)
  }

  data.result.photos = await Promise.all(data.result.photos.map(async (photo) => {
    const { headers: { location } } = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
      params: {
        photo_reference: photo.photo_reference,
        maxheight: 150,
        key: googleCloudApiKey
      },
      maxRedirects: 0,
      validateStatus: status => status >= 300 && status < 400
    })
    return location
  }))

  return data.result
}
