<template>
  <div class="absolute top-0 bottom-0 left-0 right-0 h-[calc(100%_+_env(safe-area-inset-top,_0))]">
    <client-only>
      <MapboxMap
        :access-token="config.mapAccessToken"
        :map-style="config.mapStyle"
        :max-bounds="config.mapBounds"
        :fit-bounds-options="fitBoundsOptions"
        :class="{ loading }"
        @loaded="mapLoaded"
        @update:center="moved"
      >
        <MapboxMarker
          v-for="marker in dotMarkers"
          :key="marker.id"
          :lng-lat="marker.lngLat"
          @click="$emit('update:selectedPlaceId', marker.id)"
        >
          <template v-slot:icon>
            <div slot="marker" :style="{ 'z-index': marker.id === selectedPlaceId ? 10 : 1 }">
              <img src="~assets/coinmap_marker.svg" width="10" height="10" :class="{ 'animate-breath' : marker.id === selectedPlaceId }">
            </div>
          </template>
        </MapboxMarker>

        <MapboxMarker
          v-for="marker in lightningMarkers"
          :key="marker.id"
          :lng-lat="marker.lngLat"
          anchor="bottom"
          @click="$emit('update:selectedPlaceId', marker.id)"
        >
          <template v-slot:icon>
            <div slot="marker" :style="{ 'z-index': marker.id === selectedPlaceId ? 10 : 1 }">
              <img src="~assets/ln_marker.svg" width="25" height="25" :class="{ 'animate-bounce' : marker.id === selectedPlaceId }">
            </div>
          </template>
        </MapboxMarker>

        <MapboxGeolocateControl position="bottom-right" :fit-bounds-options="fitBoundsOptions" track-user-location />
      </MapboxMap>
    </client-only>

    <div v-if="loading" class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div class="w-16 h-16 border-8 border-white border-dotted rounded-full opacity-50 animate-spin" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MapboxMap, MapboxMarker, MapboxGeolocateControl } from 'vue-mapbox-ts'
import type { Map, LngLatLike, LngLatBounds } from 'mapbox-gl'

const emit = defineEmits<{
  (event: 'update:selectedPlaceId', placeId: Number): void
  (event: 'update:currentBounds', bounds: LngLatBounds): void
}>()

interface MarkerProp {
  id: Number
  lngLat: LngLatLike
}
const props = defineProps<{
  dotMarkers: MarkerProp[]
  lightningMarkers: MarkerProp[]
  selectedPlaceId: Number | undefined
  currentBounds: LngLatBounds
}>()

const { public: config } = useRuntimeConfig()

let map: Map | null = null
let position: [number, number] | null = null

const loading = ref(true)
const fitBoundsOptions = { padding: { top: 220, bottom: 244, left: 0, right: 0 }, maxZoom: 13 }

onMounted(async () => {
  try {
    position = await $fetch('/api/location')
    if (map && position) {
      flyTo(position)
    }
  } catch (e) {
    console.error(e)
  }
})

function mapLoaded (loadedMap: Map) {
  loading.value = false
  map = loadedMap
  if (position) {
    flyTo(position)
  }
}

function moved () {
  emit('update:currentBounds', map!.getBounds())
}

function flyTo (position: [number, number]) {
  map!.fitBounds(
    [[position[0] + 0.17, position[1] + 0.14], [position[0] - 0.17, position[1] - 0.14]],
    fitBoundsOptions
  )
}
</script>

<style scoped>
.mapbox-map.loading {
  visibility: hidden;
  height: 100%;
}

/* :deep(.mapboxgl-ctrl-bottom-right .mapboxgl-ctrl-group) {
  margin-bottom: 15rem;
}
Fix until https://gitlab.com/relief-melone/vue-mapbox-ts/-/merge_requests/70
*/
:deep(.mapboxgl-ctrl-top-right) {
  top: auto;
  bottom: 10rem;
}

:deep(.mapboxgl-ctrl-bottom-right) {
  display: none;
}

:deep(.mapboxgl-ctrl-bottom-left) {
  margin-bottom: env(safe-area-inset-bottom, 0);
}

:deep(button) {
  margin: 0;
}
</style>
