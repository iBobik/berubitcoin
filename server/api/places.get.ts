import type { OverpassJson, OverpassNode } from 'overpass-ts'
import { overpass } from 'overpass-ts'
import { trimFalseProps } from '~/composables/data'

const { public: config } = useRuntimeConfig()
const boundsStr = [
  config.mapBounds[0][1],
  config.mapBounds[0][0],
  config.mapBounds[1][1],
  config.mapBounds[1][0],
].map(v => v.toString()).join(',')


export default defineCachedEventHandler(async () => {
  const data: OverpassJson = await (await overpass(`
    [out:json];
    node["currency:XBT"="yes"](${boundsStr});
    out body;
  `)).json()

  return (data.elements as OverpassNode[]).map(place => {
    try {
      if (!place.tags) throw Error(`Node ${place.id} have empty tags.`)

      const verified = [
        place.tags['survey:date'],
        place.tags['check_date:currency:XBT'],
      ].filter(d => d).sort().reverse()[0]

      return trimFalseProps({
        id: place.id,
        name: place.tags.name ?? place.tags.operator,
        description: place.tags.description,
        website: place.tags.website,
        phone: place.tags.phone,
        type: place.tags.amenity,
        lngLat: [place.lon, place.lat],
        verified,
        accepts: {
          ln: place.tags['payment:lightning'] === 'yes',
          lnNfc: place.tags['payment:lighning_contactless'] === 'yes',
          onchain: place.tags['payment:onchain'] === 'yes' || place.tags['payment:bitcoin'] === 'yes',
          qerko: place.tags['payment:qerko:lightning'] === 'yes',
        }
      } as Place)
    } catch (e) {
      console.log(place, e)
    }
  })
  .filter(place => place)
  .sort((a, b) => {
    if (a!.verified && b!.verified) {
      return a!.verified > b!.verified ? -1 : 1
    }
    if (a!.verified) return -1
    if (b!.verified) return 1
    return 0
  }) as Place[]
}, {
  maxAge: 60 * 60 * 24, // 1 day
  staleMaxAge: -1,
})
