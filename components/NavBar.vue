<template>
  <div class="flex place-content-between items-center absolute top-0 right-0 left-0 h-12 z-10">
    <NuxtLink to="/">
      <h1 class="ml-2">
        <img class="h-6" src="~assets/logo_bb.svg" alt="BeruBitcoin.cz">
      </h1>
    </NuxtLink>

    <label role="navigation" class="relative">
      <input type="checkbox" class="peer sr-only" aria-controls="menu">
      <div class="space-y-1 p-4 peer-checked:bg-gray-700">
        <div class="w-5 h-0.5 bg-white" />
        <div class="w-5 h-0.5 bg-white" />
        <div class="w-5 h-0.5 bg-white" />
      </div>
      <nav id="menu" class="peer-checked:block hidden absolute top-12 right-0 bg-gray-700 w-max">
        <component
          :is="item.href ? 'a' : 'NuxtLink'"
          v-for="item in menuLinks"
          :key="item.to"
          :to="item.to"
          :href="item.href"
          class="block py-2 px-4 border-b border-gray-800 hover:bg-gray-800"
        >
          {{ item.text }}
        </component>
      </nav>
    </label>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuLinks: [
      { to: '/online-podniky', text: 'On-line podniky' },
      { href: 'https://www.berubitcoin.cz/', text: 'O přijímání Bitcoinu' },
      { to: '/pridat-podnik', text: 'Přidat podnik' },
      { href: 'https://www.berubitcoin.cz/#kontakt', text: 'Kontakt' }
    ]
  })
}
</script>
