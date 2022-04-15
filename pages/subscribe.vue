<template>
  <div>
    <NavBar />
    <h1>Zasílat novinky</h1>
    <form @submit.prevent="submit">
      <label>
        Tvůj e-mail
        <input type="email" name="email">
      </label>
      <input type="submit" value="Přihlásit se">
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    submit ({ target }) {
      this.$axios.post('/api/subscribe', new FormData(target))
    }
  }
}
</script>
