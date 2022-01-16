<template>
  <ul
    class="
      absolute bottom-0 left-0 right-0 z-10
      grid grid-flow-col gap-4 pt-1 pb-10 px-[15vw] sm:px-[calc((100vw_-_24rem)/2)]
      overflow-x-scroll snap-mandatory snap-x scroll-smooth
    "
  >
    <li
      v-for="place in places"
      :key="place.slug || place.coinmapId"
      :data-place-id="place.slug || place.coinmapId"
      class="max-w-sm w-[70vw] p-4 bg-gray-700 snap-center drop-shadow-[0_0_1px_rgb(255,255,255)]"
      :class="{ 'bg-gray-800 drop-shadow-[0_0_2px_rgb(255,255,255)]': selectedPlaceId === place.slug || selectedPlaceId === place.coinmapId }"
    >
      <slot :place="place" />
    </li>
  </ul>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    places: { type: Array, default: () => [] },
    selectedPlaceId: { type: [Number, String, null], default: null }
  },

  watch: {
    selectedPlaceId (id) {
      this.$el.querySelector(`[data-place-id='${id}']`).scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  },

  mounted () {
    this.handleDebouncedScroll = debounce(this.scrollStopped, 100)
    this.$el.addEventListener('scroll', this.handleDebouncedScroll)
    if (!this.selectedPlaceId && this.places.length) {
      this.$emit('update:selectedPlaceId', this.places[0].slug || this.places[0].coinmapId)
    }
  },

  beforeDestroy () {
    this.$el.removeEventListener('scroll', this.handleDebouncedScroll)
  },

  methods: {
    scrollStopped (event) {
      const centerX = this.$el.offsetLeft + this.$el.offsetWidth / 2
      const centerY = this.$el.offsetTop + this.$el.offsetHeight / 2
      const centerEl = document.elementsFromPoint(centerX, centerY).find(el => el.dataset.placeId)
      if (centerEl) {
        this.$emit('update:selectedPlaceId', Number(centerEl.dataset.placeId) || centerEl.dataset.placeId)
      }
    }
  }
}
</script>
