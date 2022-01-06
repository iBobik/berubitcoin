<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
  >

    <ol-view ref="view" :center="fromLonLat(center)" :zoom="zoom" :extent="extent" constrainOnlyCenter :minZoom="7" />

    <ol-tile-layer>
        <ol-source-xyz :url="$config.mapTilesUrl" :tilePixelRatio="pixelRatio" :tileSize="[512, 512]" />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector>

        <ol-feature v-for="place in places">
          <ol-geom-point :coordinates="fromLonLat(place.lonLat)" />
          <ol-style :z-index="place.type === 'ln_verified' ? 10 : 1">
            <ol-style-icon v-if="place.type === 'ln_verified'" src="assets/ln_marker.svg" :scale="0.1" />
            <ol-style-icon v-if="place.type === 'coinmap'" src="assets/coinmap_marker.svg" :scale="0.05" />
          </ol-style>
        </ol-feature>

      </ol-source-vector>
    </ol-vector-layer>

    <nuxt-link to="/">go to home</nuxt-link>
    <nuxt-link to="/cm-1234">go to cm</nuxt-link>
    <nuxt-link to="/@test-te">go to slug</nuxt-link>
    <nuxt-link to="/@test-2">go to slug2</nuxt-link>
    <div v-if="places" class="map-content">
      <NuxtPage class="map-content__popup" :places="places" />
    </div>

  </ol-map>
</template>

<script setup>
import { ref } from 'vue'
import { fromLonLat } from 'ol/proj'
const $config = useRuntimeConfig()
const pixelRatio = window.devicePixelRatio

const view = ref(null)
const center = ref([15, 50])
const zoom = ref(8);
const extent = [...fromLonLat($config.mapBounds[0]), ...fromLonLat($config.mapBounds[1])]

$fetch('http://www.geoplugin.net/json.gp').then(data => {
  view.value.animate({ center: fromLonLat([data.geoplugin_longitude, data.geoplugin_latitude]) })
  view.value.animate({ zoom: 10 })
})

const { data: places } = await useFetch('/api/places')

</script>

<style>
.map-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  pointer-events: none;
}

.map-content__popup {
  margin: 20px auto;
  max-width: 340px;
  pointer-events: auto;
  background: #444;
  color: #fff;
}
</style>
