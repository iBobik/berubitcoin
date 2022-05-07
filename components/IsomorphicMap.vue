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
          <div slot="marker" :style="{ 'z-index': marker.id === selectedPlaceId ? 10 : 1 }">
            <img src="~assets/coinmap_marker.svg" width="10" height="10" :class="{ 'animate-breath' : marker.id === selectedPlaceId }">
          </div>
        </MglMarker>

        <MglMarker
          v-for="marker in verifiedMarkers"
          :key="marker.id"
          v-bind="marker"
          anchor="bottom"
          @click="$emit('update:selectedPlaceId', marker.id)"
        >
          <div slot="marker" :style="{ 'z-index': marker.id === selectedPlaceId ? 10 : 1 }">
            <img src="~assets/ln_marker.svg" width="25" height="25" :class="{ 'animate-bounce' : marker.id === selectedPlaceId }">
          </div>
        </MglMarker>

        <MglGeolocateControl position="bottom-right" :fit-bounds-options="fitBoundsOptions" track-user-location />
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
    fitBoundsOptions: { padding: { top: 220, bottom: 244 }, maxZoom: 13 }
  }),

  async mounted () {
    try {
      this.position = await this.$axios.$get('/api/location')
      if (this.map) {
        this.flyTo(this.position)
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },

  methods: {
    mapLoaded ({ map }) {
      this.loading = false

      this.map = map
      if (this.position) {
        this.flyTo(this.position)
      }

      map.on('moveend', () => {
        this.$emit('moveend', map.getBounds())
      })
    },

    flyTo (position) {
      this.map.fitBounds(
        [[position[0] + 0.17, position[1] + 0.14], [position[0] - 0.17, position[1] - 0.14]],
        this.fitBoundsOptions
      )
    }
  }
}
</script>

<style scoped>
::v-deep .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl-group {
  margin-bottom: 15rem;
}

::v-deep button {
  margin: 0;
}
</style>
