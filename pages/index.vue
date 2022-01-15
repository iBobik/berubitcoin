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
        grid grid-flow-col gap-4 pb-8 px-[15vw]
        overflow-x-scroll snap-mandatory snap-x scroll-smooth
      "
    >
      <li
        v-for="place in verifiedPlaces.concat(coinmapPlaces)"
        :key="place.slug || place.coinmapId"
        class="max-w-sm w-[70vw] p-4 bg-gray-700 snap-center"
        :class="{}"
      >
        <NuxtLink v-if="place.slug" :to="'/' + place.slug" class="block">
          <h2>{{ place.name }}</h2>
        </NuxtLink>
        <template v-else>
          <h2>{{ place.name }}</h2>
        </template>
      </li>

      <!-- <li
        v-for="place in coinmapPlaces"
        :key="place.coinmapId"
        class="max-w-sm w-[70vw] p-4 bg-gray-700 snap-center"
      >
        <h2>{{ place.name }}</h2>
      </li> -->
    </ul>
  </div>
</template>

<script>
import coinmapPlacesLoad from '~/lib/coinmap-places'

export default {
  async asyncData ({ $content, $config }) {
    if (process.client) { // Fetching does not work client-side, so enforce SSR
      location.reload()
    }

    const verifiedPlaces = await $content('places').fetch()
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
      return this.places
    }
  },

  methods: {
    log (val) {
      console.log(val)
    }
  }
}
</script>
