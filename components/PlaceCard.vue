<template>
  <div
    class="max-w-sm w-[70vw] px-4 py-3 text-xs transition-all hover:brightness-110 border border-gray-200"
    :class="{
      'bg-gray-800 border-opacity-80': selected,
      'bg-gray-700 border-opacity-40': !selected,
      'h-[min(calc(100vh-6rem),30rem)] overflow-scroll flex flex-col': expanded,
      'h-20 cursor-pointer overflow-hidden': !expanded,
    }"
  >
    <div class="flex flex-wrap gap-4 mb-3" :class="{ 'h-7 overflow-hidden select-none': !expanded }">
      <h2 class="text-base truncate">{{ item.name }}</h2>
      <p class="text-right grow">{{ item.type }}</p>
    </div>

    <div class="flex flex-wrap gap-4 mt-1 text-gray-300" :class="{ 'h-9 select-none': !expanded }">
      <p>
        <img v-if="item.verifiedIcon" src="~assets/ln_marker.svg" width="15" class="inline-block mr-1 -mt-2 -mb-1">
        přijímá Bitcoin přes {{ acceptsStrs.join(', ') }}
      </p>
      <p class="text-right grow">
        <span v-if="item.verified">
          ✓ {{ formatDistanceToNowStrict(item.verified, { locale: cs }) }}
        </span>
        <span v-else>neověřeno</span>
      </p>
    </div>

    <div v-if="expanded" class="mt-4 text-sm grow">
      <p v-if="item.description" class="mb-2">{{ item.description }}</p>
      <a v-if="item.phone" class="block mb-2" :href="`tel:${item.phone.replace(/ \(\)/, '')}`">{{ item.phone }}</a>
      <a v-if="item.website" class="block mb-2" :href="item.website">{{ item.website }}</a>

      <OpenInMapApp :osm-id="item.id" :name="item.name" :lng-lat="item.lngLat" />
    </div>

    <p v-if="expanded" class="mt-8 text-xs text-center">
      Sedí vše? Dej ostatním vědět že se na to můžou spolehnout:<br>
      <el-button type="primary">Ověřit platnost</el-button>
      <NuxtLink :to="`/verify?placeId=${item.id}`" class="button">Ověřit platnost</NuxtLink>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { formatDistanceToNowStrict } from 'date-fns'
import { cs } from 'date-fns/locale'
import OpenInMapApp from './OpenInMapApp.vue';

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
    lngLat: [number, number]
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
