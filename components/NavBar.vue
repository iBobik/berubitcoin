<template>
  <div
    :class="absolute ? 'absolute top-0 left-2 right-0 z-10' : '-mr-4'"
    class="pt-[env(safe-area-inset-top,_0)] flex items-center place-content-between"
  >
    <h1 class="grow">
      <NuxtLink to="/">
        <img class="inline-block h-7" src="~assets/logo_bb.svg" alt="BeruBitcoin.cz">
      </NuxtLink>
    </h1>

    <label role="navigation" class="relative my-0">
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
          :key="item.to || item.href"
          :to="item.to"
          :href="item.href"
          class="block px-4 no-underline border-b border-gray-800 hover:bg-gray-800"
          :class="item.category
            ? 'pt-4 pb-1 text-xs font-semibold'
            : 'py-2'
          "
        >
          {{ item.text }}
        </component>
      </nav>
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  absolute?: boolean
}>()

const menuLinks = [
  { to: '/add-place', text: 'Přidat podnik' },
  { href: 'https://github.com/ibobik/berubitcoin', text: 'GitHub ↗' },
  { category: true, href: 'https://www.berubitcoin.cz/', text: 'BeruBitcoin.cz' },
  { href: 'https://www.berubitcoin.cz/', text: 'O přijímání Bitcoinu ↗' },
  { href: 'https://www.berubitcoin.cz/#faq-proc-utracet', text: 'Proč Bitcoin utrácet? ↗' },
  { href: 'https://www.berubitcoin.cz/#kontakt', text: 'Kontakt ↗' }
]
</script>
