<template>
  <dialog v-show="open" :open="open" class="absolute px-5 py-4 z-20 max-w-[80%] w-80 mx-auto text-white bg-gray-700 top-[calc(4rem_+_env(safe-area-inset-top,_0))] drop-shadow-white-2">
    <button class="absolute top-0 right-0 m-0 text-2xl bg-transparent" @click="close" aria-label="Zavřít">×</button>

    <img src="~assets/ln_marker.svg" width="15" class="float-left mt-1 mr-2">
    <h1 class="mb-2 text-xl pe-3">Ověřená místa s Bitcoinem</h1>

    <p class="pb-2 text-xs">Tady můžete zaplatit Bitcoinem přes Lightning network. Místa jsou pravidelně kontrolována a podnikům <a href="https://www.berubitcoin.cz" target="_blank">poskytujeme podporu</a>.</p>
    <p class="text-xs">Data jsou z <a href="https://btcmap.org" target="_blank">BTC Map</a> / <a href="https://www.openstreetmap.org/" target="_blank">OSM</a>, ale jinak prezentována - místa bez LN, neověřována nebo Qerko jsou zobrazeny jako šedé tečky.</p>
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
