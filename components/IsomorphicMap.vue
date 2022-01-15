<template>
  <div class="absolute top-0 bottom-0 left-0 right-0">
    <client-only>
      <MglMap
        :access-token="$config.mapAccessToken"
        :map-style="$config.mapStyle"
        @load="loading = false"
      >
        <MglMarker
          v-for="marker in coinmapMarkers"
          :key="marker.id"
          v-bind="marker"
          @click="$emit('marker-click', marker.id)"
        >
          <div slot="marker">
            <img src="~assets/coinmap_marker.svg" width="10" height="10" :style="{ scale: marker.selected ? 2 : 1 }">
          </div>
        </MglMarker>
        <MglMarker
          v-for="marker in verifiedMarkers"
          :key="marker.id"
          v-bind="marker"
          anchor="bottom"
          @click="$emit('marker-click', marker.id)"
        >
          <div slot="marker">
            <img src="~assets/ln_marker.svg" width="20" height="20" :style="{ scale: marker.selected ? 2 : 1 }">
          </div>
        </MglMarker>
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
    MglMarker: async () => process.client ? await import('v-mapbox').then(m => m.MglMarker) : {}
  },

  props: {
    coinmapMarkers: { type: Array, default: () => [] },
    verifiedMarkers: { type: Array, default: () => [] }
  },

  data: () => ({
    loading: true
  })
}
</script>
