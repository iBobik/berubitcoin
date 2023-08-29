<template>
  <el-dropdown ref="dropdown" split-button @click="openClick(defaultApp)" @command="openClick" trigger="click">
    Otevřít v {{ defaultApp ?? '...' }}
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="_, name in servicesLinks" :command="name">{{ name }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { DropdownInstance } from 'element-plus'

const props = defineProps<{
  lngLat: [number, number]
  osmId: number
  name: string
}>()

const servicesLinks = {
  'Google Maps': `https://www.google.com/maps/search/?api=1&query=${props.lngLat[1]},${props.lngLat[0]}`,
  'Apple Maps': `https://maps.apple.com/?sll=${props.lngLat[1]},${props.lngLat[0]}&q=${props.name}`,
  'Mapy.cz': `https://mapy.cz/zakladni?q=${props.lngLat[1]},${props.lngLat[0]}`,
  'OpenStreetMap': `https://www.openstreetmap.org/node/${props.osmId}`,
}

const defaultApp = useLocalStorage<keyof typeof servicesLinks | null>('defaultApp', null)


const dropdown = ref<DropdownInstance>()

function openClick (command: typeof defaultApp.value) {
  if (command) {
    defaultApp.value = command
    window.open(servicesLinks[command], '_blank')
  } else {
    dropdown.value?.handleOpen()
  }
}
</script>
