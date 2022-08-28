<template>
  <div>
    <NavBar absolute />

    <WelcomePopup />

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
      <template #default="{ place }">
        <div v-if="place.photos" class="flex gap-1 overflow-x-hidden h-28">
          <img
            v-for="(photo, i) in place.photos"
            :key="photo"
            :src="photo"
            :lazy="i ? 'lazy' : 'eager'"
          >
        </div>

        <div class="p-4">
          <h2 class="mb-4 truncate">{{ place.name }}</h2>
          <div class="mt-1 text-xs text-gray-300">
            <p class="float-right">
              <a v-if="place.gMapsUrl" :href="place.gMapsUrl" target="bb-place">
                Google Maps
              </a>
              <span v-if="place.coinmapId">
                zdroj:
                <a :href="`https://coinmap.org/venue/${place.coinmapId}`" target="bb-place">
                  coinmap.org
                </a>
              </span>
            </p>
            <p v-if="place.verified">
              <img src="~assets/ln_marker.svg" width="15" class="inline-block mr-1 -mt-2 -mb-1">
              přijímá <a href="https://www.alza.cz/lightning-network">Bitcoin LN</a>
            </p>
            <p v-else>neověřeno</p>
          </div>
        </div>
      </template>
    </PlacesScrollList>
  </div>
</template>

<script>
import coinmapPlacesLoad from '~/lib/coinmap-places'
import gmapsPlace from '~/lib/gmaps-place'
import { fetchDoo } from '~/lib/tabidoo'

export default {
  async asyncData ({ $config }) {
    if (process.client) { // Fetching does not work client-side, so enforce SSR
      location.reload()
    }

    let { data: verifiedPlaces } = await fetchDoo(process.env.TABIDOO_JWT, 'tables/Places/data?filter=active(eq)true')
    verifiedPlaces = await Promise.all(verifiedPlaces.map(async record => ({
      ...record.fields,
      googleMaps: await gmapsPlace($config.googleCloudApiKey, record.fields.googleMapsID)
    })))

    const verifiedPlacesCoinmapIDs = verifiedPlaces.map(p => p.coinMapID).filter(p => p)

    return {
      verifiedPlaces: verifiedPlaces.map(place => ({
        slug: place.slug,
        name: place.name,
        verified: true,
        photos: place.googleMaps.photos,
        lonLat: [place.googleMaps.geometry.location.lng, place.googleMaps.geometry.location.lat],
        gMapsUrl: place.googleMaps.url
      })),
      coinmapPlaces: (await coinmapPlacesLoad($config.mapBounds)).map(place => ({
        coinmapId: place.id,
        name: place.name,
        lonLat: [place.lon, place.lat]
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
      const all = this.verifiedPlaces.concat(this.coinmapPlaces)
      if (this.currentBounds) {
        return all.filter(place => this.currentBounds.contains(place.lonLat))
      }
      return all
    }
  }
}
</script>
