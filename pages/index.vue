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
      <template #default="{ item }">
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
import mapboxgl from 'mapbox-gl'

const selectedPlaceId = ref<number>()
const { public: config } = useRuntimeConfig()
const globalBounds = new mapboxgl.LngLatBounds(config.mapBounds as [[number, number], [number, number]])
const currentBounds = ref<mapboxgl.LngLatBounds>(globalBounds)

definePageMeta({
  keepalive: true,
})


const { data: placesCompressed } = useFetch('/api/places', { lazy: true })


function parseDateOrUndefined(date: string | undefined): Date | undefined {
  if (!date) return undefined
  const d = new Date(date)
  if (isNaN(d.getTime())) return undefined
  return d
}

const placesAll = computed(() => {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const oneYearAgoString = oneYearAgo.toISOString().substring(0, 10)

  return placesCompressed.value?.map(place => ({
    ...place,
    verified: parseDateOrUndefined(place.verified),
    verifiedIcon: !!(place.verified && place.verified > oneYearAgoString && place.accepts.ln),
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
