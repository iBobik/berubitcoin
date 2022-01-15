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

  return data.result
  /*   name: result.name,
    address: result.formatted_address,
    phone: result.international_phone_number,
    openingHours: result.opening_hours.weekday_text,
    googlePhoto: result.photos[0]?.photo_reference,
    googleUrl: result.url,
    category: result.types,
    website: result.website
  } */
}
