<template>
  <dialog v-show="open" :open="open" class="absolute z-20 max-w-[80%] w-80 mx-auto text-white bg-gray-700 top-16 drop-shadow-white-2">
    <img src="~assets/ln_marker.svg" width="15" class="float-left mt-1 mr-2">
    <h1 class="mb-2 text-xl">Ověřená místa s Bitcoinem</h1>
    <p class="text-sm">Tady můžete zaplatit Bitcoinem přes Lightning network. Místa jsou pravidelně kontrolována a podnikům <a href="https://www.berubitcoin.cz" target="_blank">poskytujeme podporu</a>.</p>
    <form class="-mb-2" method="dialog">
      <input class="w-auto mx-auto" type="submit" value="✓ Rozumím" @click="close">
    </form>
  </dialog>
</template>

<script>
export default {
  data () {
    return {
      open: (typeof window === 'undefined') ? false : !window.localStorage.getItem('WelcomePopupClosed')
    }
  },

  methods: {
    close () {
      this.open = false
      window.localStorage.setItem('WelcomePopupClosed', true)
    }
  }
}
</script>
