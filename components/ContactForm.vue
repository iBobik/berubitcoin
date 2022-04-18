<template>
  <form v-if="!send" @submit.prevent="submit">
    <label>
      Tvé jméno
      <input type="text" class="form-input" name="name" required>
    </label>
    <label>
      Tvůj e-mail
      <input type="email" name="email" required>
    </label>
    <label>
      Tvůj telefon
      <input type="tel" name="phone" required>
    </label>
    <label>
      <input type="checkbox" name="signal">
      Máš Signal?
      <small>Používáš toto číslo na Signalu? To je bezpečná komunikační aplikace, která je standardem v krypto komunitě.</small>
    </label>
    <label>
      Odkaz na Google Maps
      <input type="url" name="company" placeholder="https://maps.google.com/...">
      <small>Odkaz na místo tvého podniku</small>
    </label>
    <div class="label mt-4">
      Píšu protože...
      <label class="my-0">
        <input v-model="intent" type="radio" name="intent" value="Chci přijímat Bitcoin" required>
        Chci přijímat Bitcoin
      </label>
      <label class="my-0">
        <input v-model="intent" type="radio" name="intent" value="Nabízím pomoc">
        Nabízím pomoc
      </label>
      <label class="my-0">
        <input v-model="intent" type="radio" name="intent" value="Něco jiného">
        Něco jiného
      </label>
    </div>
    <label>
      Tvá zpráva
      <small v-if="intent === 'Chci přijímat Bitcoin'">
        <p>Používáte už Bitcoin nějak? Hodlujete? Zkoušeli jste něco?</p>
        <p>Co s vydělaným Bitcoinem pak chcete dělat? Nechávat si na spoření? Vyplácet zaměstnancům? Směnit na koruny?</p>
        <p>Jaká je v podniku tvá role? Jak jsou na tom s Bitcoinem ostatní?</p>
        <p>Jste schopni zajistit aby plaby Bitcoinem uměli všichni zaměstnanci kdykoliv?</p>
        <p>Proč chcete přijímat Bitcoin?</p>
      </small>
      <small v-if="intent === 'Nabízím pomoc'">
        <p>Co nabízíš?</p>
        <p>Užijeme pomoc s propagací, webovým vývojem i víme jak smysluplně utratit peníze.</p>
      </small>
      <textarea name="message" rows="8" required />
    </label>
    <input type="submit" value="Odeslat zprávu">
  </form>
  <p v-else>
    Odesláno
  </p>
</template>

<script>
export default {
  data () {
    return {
      intent: '',
      send: false
    }
  },

  methods: {
    async submit ({ target }) {
      await this.$axios.post('/api/contact', new FormData(target))
      this.send = true
    }
  }
}
</script>

<style scoped>
label {
  @apply block;
}

small {
  @apply block;
}

small p {
  @apply my-2;
}
</style>
