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

    <Menu as="nav" v-slot="{ open }" class="relative flex-shrink-0 ml-4">
      <MenuButton class="relative flex p-0 my-0 text-sm" :class="open ? 'bg-gray-700' : 'bg-transparent'">
        <span class="absolute -inset-1" />
        <span class="sr-only">Open menu</span>
        <div class="p-4 space-y-1 peer-checked:bg-gray-700">
          <div class="w-5 h-0.5 bg-white" />
          <div class="w-5 h-0.5 bg-white" />
          <div class="w-5 h-0.5 bg-white" />
        </div>
      </MenuButton>
      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems class="absolute right-0 z-10 w-64 max-w-[90vw] py-1 origin-top-right bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem
            v-for="item in menuLinks"
            :key="item.to || item.href"
            v-slot="{ active }"
          >
            <NuxtLink
              :to="item.to || item.href"
              :target="item.href ? '_blank' : undefined"
              class="block px-4 no-underline border-b border-gray-800 hover:bg-gray-800"
              :class="item.category
                ? 'pt-4 pb-1 text-xs font-semibold'
                : 'py-2'
              "
            >
              {{ item.text }}
            </NuxtLink>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const props = defineProps<{
  absolute?: boolean
}>()

const menuLinks = [
  { to: '/add-place', text: 'Přidat nebo upravit podnik' },
  { href: 'https://github.com/ibobik/berubitcoin', text: 'GitHub ↗' },
  { category: true, href: 'https://www.berubitcoin.cz/', text: 'BeruBitcoin.cz' },
  { href: 'https://www.berubitcoin.cz/', text: 'O přijímání Bitcoinu ↗' },
  { href: 'https://www.berubitcoin.cz/#faq-proc-utracet', text: 'Proč Bitcoin utrácet? ↗' },
  { href: 'https://www.berubitcoin.cz/#kontakt', text: 'Kontakt ↗' }
]
</script>
