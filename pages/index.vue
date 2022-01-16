<template>
  <div>
    <NavBar />

    <IsomorphicMap
      :coinmap-markers="coinmapPlaces.map(place => ({
        coordinates: place.lonLat,
        id: place.coinmapId,
      }))"
      :verified-markers="verifiedPlaces.map(place => ({
        coordinates: place.lonLat,
        id: place.slug,
      }))"
      :selected-place-id.sync="selectedPlaceId"
      @moveend="(bounds) => currentBounds = bounds"
    />

    <PlacesScrollList :places="placesInMap" :selected-place-id.sync="selectedPlaceId">
      <template slot-scope="{ place }">
        <NuxtLink v-if="place.slug" :to="'/' + place.slug" class="block">
          <h2>{{ place.name }}</h2>
        </NuxtLink>
        <template v-else>
          <h2>{{ place.name }}</h2>
        </template>
      </template>
    </PlacesScrollList>
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
      selectedPlaceId: null,
      currentBounds: null
    }
  },

  computed: {
    placesInMap () {
      return this.verifiedPlaces.concat(this.coinmapPlaces)
    }
  }
}
</script>
