import config from '#config'
import { $fetch } from 'ohmyfetch'

export default async (request) => {
  let place_id
  if (typeof request === 'string') {
    place_id = request
  }
  else {
    const params = new URLSearchParams(request.url)
    place_id = params.get('id')
  }

  const { result, status } = await $fetch('https://maps.googleapis.com/maps/api/place/details/json', {
    params: {
      place_id,
      key: config.googleCloudApiKey,
      // TODO: fields https://developers.google.com/maps/documentation/places/web-service/details#fields
    }
  })

  if (status !== 'OK') {
    return { status }
  }

  return {
    name: result.name,
    address: result.formatted_address,
    phone: result.international_phone_number,
    openingHours: result.opening_hours.weekday_text,
    lonLat: [result.geometry.location.lng, result.geometry.location.lat],
    googlePhoto: result.photos[0]?.photo_reference,
    googleUrl: result.url,
    category: result.types,
    website: result.website
  }
}
