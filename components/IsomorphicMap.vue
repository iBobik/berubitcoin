<template>
  <div class="absolute top-0 bottom-0 left-0 right-0">
    <client-only>
      <MglMap
        :access-token="$config.mapAccessToken"
        :map-style="$config.mapStyle"
        :bounds="$config.mapBounds"
        :fit-bounds-options="fitBoundsOptions"
        @load="mapLoaded"
      >
        <MglMarker
          v-for="marker in coinmapMarkers"
          :key="marker.id"
          v-bind="marker"
          @click="$emit('update:selectedPlaceId', marker.id)"
        >
          <div slot="marker">
            <img src="~assets/coinmap_marker.svg" width="10" height="10" :style="{ scale: marker.id === selectedPlaceId ? 2 : 1 }">
          </div>
        </MglMarker>

        <MglMarker
          v-for="marker in verifiedMarkers"
          :key="marker.id"
          v-bind="marker"
          anchor="bottom"
          @click="$emit('update:selectedPlaceId', marker.id)"
        >
          <div slot="marker">
            <img src="~assets/ln_marker.svg" width="20" height="20" :style="{ scale: marker.id === selectedPlaceId ? 2 : 1 }">
          </div>
        </MglMarker>

        <MglGeolocateControl style="margin-bottom: 10rem" position="bottom-right" :fit-bounds-options="fitBoundsOptions" />
      </MglMap>
    </client-only>
    <div v-if="loading" class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div class="w-16 h-16 border-8 border-white border-dotted rounded-full opacity-50 animate-spin" />
    </div>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css'
import 'v-mapbox/dist/v-mapbox.css'

export default {
  components: {
    MglMap: async () => process.client ? await import('v-mapbox').then(m => m.MglMap) : {},
    MglMarker: async () => process.client ? await import('v-mapbox').then(m => m.MglMarker) : {},
    MglGeolocateControl: async () => process.client ? await import('v-mapbox').then(m => m.MglGeolocateControl) : {}
  },

  props: {
    coinmapMarkers: { type: Array, default: () => [] },
    verifiedMarkers: { type: Array, default: () => [] },
    selectedPlaceId: { type: [Number, String, null], default: null }
  },

  data: () => ({
    loading: true,
    fitBoundsOptions: { padding: { top: 48, bottom: 148 } }
  }),

  async mounted () {
    const data = await this.$axios.$get('https://api.freegeoip.app/json/?apikey=7322d930-76e8-11ec-9e78-3715ca488a24')
    this.position = [data.longitude, data.latitude]
    if (this.map) {
      this.map.flyTo({ center: this.position, zoom: 8 })
    }
  },

  methods: {
    mapLoaded ({ map }) {
      this.loading = false

      this.map = map
      if (this.position) {
        map.flyTo({ center: this.position, zoom: 10 })
      }

      map.on('moveend', () => {
        this.$emit('moveend', map.getBounds())
      })
    }
  }
}
</script>

<style scoped>
::v-deep .mapboxgl-ctrl-group {
  margin-bottom: 8rem;
}
</style>
