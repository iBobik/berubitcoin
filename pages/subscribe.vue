<template>
  <div>
    <NavBar />
    <div class="container">
      <h1 class="text-lg">Zasílat novinky</h1>
      <form v-if="!send" @submit.prevent="submit">
        <label>
          Tvůj e-mail
          <input type="email" name="email" required>
        </label>
        <input type="hidden" name="topics[]" value="Nová ověřená místa">
        <input type="submit" value="Přihlásit se">
      </form>
      <p v-else>
        Přihlášeno
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      send: false
    }
  },

  methods: {
    async submit ({ target }) {
      await this.$axios.post('/api/subscribe', new FormData(target))
      this.send = true
    }
  }
}
</script>
