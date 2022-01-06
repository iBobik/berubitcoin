<template>
  <div>
    test slug
    {{ $route.params.slug }}
    {{ place }}
  </div>
</template>

<script>
export default {
  props: {
    places: { type: Array, default: [] }
  },
  computed: {
    place () {
      return this.places.find(place => place.slug === this.$route.params.slug)
    }
  }
}
</script>

<style>

</style>
