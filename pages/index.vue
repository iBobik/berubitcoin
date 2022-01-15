<template>
  <div>
    <NavBar />

    <IsomorphicMap
      :coinmap-markers="coinmapPlaces.map(place => ({
        coordinates: place.lonLat,
        id: place.coinmapId,
        selected: place.coinmapId === selectedPlaceId
      }))"
      :verified-markers="verifiedPlaces.map(place => ({
        coordinates: place.lonLat,
        id: place.slug,
        selected: place.slug === selectedPlaceId
      }))"
      @marker-click="(id) => selectedPlaceId = id"
    />

    <ul
      class="
        absolute bottom-0 left-0 right-0 z-10
        grid grid-flow-col gap-4 pt-1 pb-8 px-[15vw] sm:px-[calc((100vw_-_24rem)/2)]
        overflow-x-scroll snap-mandatory snap-x scroll-smooth
      "
    >
      <li
        v-for="place in placesInMap"
        :ref="place.slug || place.coinmapId"
        :key="place.slug || place.coinmapId"
        class="max-w-sm w-[70vw] p-4 bg-gray-700 snap-center drop-shadow-[0_0_1px_rgb(255,255,255)]"
        :class="{ 'bg-gray-800 drop-shadow-[0_0_2px_rgb(255,255,255)]': selectedPlaceId === place.slug || selectedPlaceId === place.coinmapId }"
      >
        <NuxtLink v-if="place.slug" :to="'/' + place.slug" class="block">
          <h2>{{ place.name }}</h2>
        </NuxtLink>
        <template v-else>
          <h2>{{ place.name }}</h2>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import coinmapPlacesLoad from '~/lib/coinmap-places'
import gmapsPlace from '~/lib/gmaps-place'

export default {
  async asyncData ({ $content, $config }) {
    if (process.client) { // Fetching does not work client-side, so enforce SSR
      location.reload()
    }

    let verifiedPlaces = await $content('places').fetch()
    verifiedPlaces = await Promise.all(verifiedPlaces.map(async place => ({
      ...place,
      googleMaps: await gmapsPlace($config.googleCloudApiKey, place.googleMapsId)
    })))

    const verifiedPlacesCoinmapIDs = verifiedPlaces.map(p => p.coinMapId).filter(p => p)

    return {
      verifiedPlaces: verifiedPlaces.map(place => ({
        name: place.name,
        slug: place.slug,
        photo: place.googleMaps.photos[0]?.photo_reference,
        lonLat: [place.googleMaps.geometry.location.lng, place.googleMaps.geometry.location.lat]
      })),
      coinmapPlaces: (await coinmapPlacesLoad($config.mapBounds)).map(place => ({
        coinmapId: place.id,
        name: place.name,
        lonLat: [place.lon, place.lat],
        website: place.website
      })).filter(place => !verifiedPlacesCoinmapIDs.includes(place.coinmapId))
    }
  },

  data () {
    return {
      selectedPlaceId: null
    }
  },

  computed: {
    placesInMap () {
      return this.verifiedPlaces.concat(this.coinmapPlaces)
    }
  },

  watch: {
    selectedPlaceId (id) {
      this.$refs[id][0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
</script>
