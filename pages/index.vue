<template>
  <div>
    <NavBar absolute />

    <WelcomePopup />

    <CustomMap
      :dot-markers="placesAll?.filter(place => !place.verifiedIcon)"
      :lightning-markers="placesAll?.filter(place => place.verifiedIcon)"
      v-model:selected-place-id="selectedPlaceId"
      v-model:current-bounds="currentBounds"
    />

    <PlacesScrollList :items="placesInMap" v-model:selected-item-id="selectedPlaceId">
      <template #default="{ item }: { item: Place }">
        <ScrollExpandCard :can-expand="item.id === selectedPlaceId">
          <template #default="{ expanded }">
            <PlaceCard :item="item" :selected="item.id === selectedPlaceId" :expanded="expanded" @expanded="selectedPlaceId = item.id" />
          </template>
        </ScrollExpandCard>
      </template>
    </PlacesScrollList>
  </div>
</template>

<script lang="ts" setup>
import type { BtcMapPlace } from '@/btcmap'
import mapboxgl from 'mapbox-gl'

const selectedPlaceId = ref<number>()
const { public: config } = useRuntimeConfig()
const globalBounds = new mapboxgl.LngLatBounds(config.mapBounds as [[number, number], [number, number]])
const currentBounds = ref<mapboxgl.LngLatBounds>(globalBounds)

definePageMeta({
  keepalive: true,
})

interface Place {
  id: number
  name: string
  description?: string
  website?: string
  phone?: string
  type?: string
  lngLat: [number, number]
  verified?: Date
  verifiedIcon: boolean
  accepts: {
    ln?: true
    lnNfc?: true
    onchain?: true
  }
}

const { data: placesCompressed } = useAsyncData('places', async () => {
  let btcmap = await $fetch<BtcMapPlace[]>('https://api.btcmap.org/v2/elements')

  type PlaceCompressed = Omit<Omit<Place, 'verifiedIcon'>, 'verified'> & { verified?: string }

  return btcmap
    .filter(place => place.osm_json?.lon && place.osm_json?.lat && globalBounds.contains([place.osm_json.lon, place.osm_json.lat]))
    .map(place => {
      try {
        const verified = [
          place.osm_json.tags['survey:date'],
          place.osm_json.tags['survey:date:currency:XBT'],
        ].filter(d => d).sort().reverse()[0]

        return trimFalseProps({
          id: place.osm_json.id,
          name: place.osm_json.tags.name ?? place.osm_json.tags.operator,
          description: place.osm_json.tags.description,
          website: place.osm_json.tags.website,
          phone: place.osm_json.tags.phone,
          type: place.osm_json.tags.amenity,
          lngLat: [place.osm_json.lon, place.osm_json.lat],
          verified,
          accepts: {
            ln: place.osm_json.tags['payment:lightning'] === 'yes',
            lnNfc: place.osm_json.tags['payment:lighning_contactless'] === 'yes',
            onchain: place.osm_json.tags['payment:onchain'] === 'yes' || place.osm_json.tags['payment:bitcoin'] === 'yes',
            qerko: place.osm_json.tags['payment:qerko:lightning'] === 'yes',
          }
        })
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
    }) as PlaceCompressed[]
}, { lazy: true })

const placesAll = computed(() => {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const oneYearAgoString = oneYearAgo.toISOString().substring(0, 10)

  return placesCompressed.value?.map(place => ({
    ...place,
    verified: place.verified ? new Date(place.verified) : undefined,
    verifiedIcon: place.verified && place.verified > oneYearAgoString && place.accepts.ln,
  })) ?? []
})

const placesInMap = computed(() => {
  if (placesAll.value && currentBounds.value) {
    return placesAll.value.filter(place => currentBounds.value.contains(place.lngLat))
  }
  return placesAll.value
})


useHead({
  htmlAttrs: {
    class: 'h-full overflow-hidden overscroll-none'
  },
  bodyAttrs: {
    class: 'h-full overflow-hidden'
  },
})
</script>
