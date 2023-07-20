<template>
  <div
    class="max-w-sm w-[70vw] px-4 py-3 text-xs transition-all hover:brightness-110"
    :class="{
      'bg-gray-800 drop-shadow-white-2': selected && !expanded,
      'bg-gray-700 drop-shadow-white-1': !selected && !expanded,
      'h-[calc(100vh-5rem)] bg-gray-800 drop-shadow-white-3': expanded,
      'h-20 cursor-pointer': !expanded,
    }"
  >
    <p class="float-right">{{ item.type }}</p>
    <h2 class="mb-4 text-base truncate">{{ item.name }}</h2>

    <div class="mt-1 text-gray-300">
      <p class="float-right">
        <span v-if="item.verified">
          ✓ {{ formatDistanceToNowStrict(item.verified, { locale: cs }) }}
        </span>
        <span v-else>neověřeno</span>
      </p>
      <p>
        <img v-if="item.verifiedIcon" src="~assets/ln_marker.svg" width="15" class="inline-block mr-1 -mt-2 -mb-1">
        přijímá Bitcoin přes {{ acceptsStrs.join(', ') }}
      </p>
    </div>

    <div v-if="expanded" class="mt-4 text-sm">
      <p v-if="item.description" class="mb-2">{{ item.description }}</p>
      <a v-if="item.phone" class="block mb-2" :href="`tel:${item.phone.replace(/ \(\)/, '')}`">{{ item.phone }}</a>
      <a v-if="item.website" class="block mb-2" :href="item.website">{{ item.website }}</a>

      TODO: Adresa

      TODO: Otevřít v mapách - Google, Apple, Mapy.cz, OSM

      <p class="mt-8 text-xs text-center">
        Sedí vše? Dej ostatním vědět že se na to můžou spolehnout:
        <NuxtLink :to="`/verify?placeId=${item.id}`" class="button">Ověřit platnost</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDistanceToNowStrict } from 'date-fns'
import { cs } from 'date-fns/locale'

const props = defineProps<{
  item: {
    id: number
    name: string
    description?: string
    website?: string
    phone?: string
    type?: string
    verified?: Date
    verifiedIcon: boolean
    accepts: {
      ln?: true
      lnNfc?: true
      onchain?: true
    }
  }
  selected: boolean
  expanded: boolean
}>()

const acceptsStrs = computed(() => {
  const accepts = props.item.accepts
  const acceptsStrs = []

  if (accepts.ln) acceptsStrs.push('LN')
  if (accepts.lnNfc) acceptsStrs.push('NFC')
  if (accepts.onchain) acceptsStrs.push('on-chain')

  return acceptsStrs
})
</script>
