<template>
  <div class="absolute top-0 left-0 right-0 z-10 flex items-center h-12 place-content-between">
    <NuxtLink to="/">
      <h1 class="ml-2">
        <img class="h-6" src="~assets/logo_bb.svg" alt="BeruBitcoin.cz">
      </h1>
    </NuxtLink>

    <label role="navigation" class="relative">
      <input type="checkbox" class="sr-only peer" aria-controls="menu">
      <div class="p-4 space-y-1 peer-checked:bg-gray-700">
        <div class="w-5 h-0.5 bg-white" />
        <div class="w-5 h-0.5 bg-white" />
        <div class="w-5 h-0.5 bg-white" />
      </div>
      <nav id="menu" class="absolute right-0 hidden bg-gray-700 peer-checked:block top-12 w-max">
        <component
          :is="item.href ? 'a' : 'NuxtLink'"
          v-for="item in menuLinks"
          :key="item.to"
          :to="item.to"
          :href="item.href"
          class="block px-4 py-2 no-underline border-b border-gray-800 hover:bg-gray-800"
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
      { href: 'https://www.berubitcoin.cz/#faq-proc-utracet', text: 'Proč Bitcoin utrácet?' },
      { href: 'https://www.berubitcoin.cz/#kontakt', text: 'Kontakt' }
    ]
  })
}
</script>
