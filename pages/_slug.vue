<template>
  <div>
    test slug
    {{ $route.params.slug }}
    {{ place }}
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    return {
      place: await $content('places', params.slug).fetch().catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    }
  }
}
</script>

<style>

</style>
