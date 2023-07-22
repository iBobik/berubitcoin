<template>
  <div @click="expand" @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove" ref="container">
    <slot :expanded="expanded" />
  </div>
</template>

<script lang="ts" setup>
const container = ref<HTMLElement>()
const card = computed(() => {
  if (container.value) {
    if (container.value.children.length === 1) {
      return container.value.children[0] as HTMLElement
    } else {
      throw new Error('ScrollExpandCard must have exactly one child')
    }
  }
})


const props = defineProps<{
  canExpand: boolean
}>()

const emit = defineEmits<{
  (event: 'expanded'): void
}>()

const expanded = ref(false)

watch(() => props.canExpand, () => {
  if (!props.canExpand) {
    expanded.value = false
  }
})

function expand () {
  if (props.canExpand) {
    expanded.value = true
    emit('expanded')
  }
}


let touchStart: Touch | null = null

function onTouchStart (event: TouchEvent) {
  touchStart = event.changedTouches[0]
}

function onTouchMove (event: TouchEvent) {
  if (!touchStart) return // Touch cancelled

  const diffX = event.changedTouches[0].clientX - touchStart.clientX
  const diffY = event.changedTouches[0].clientY - touchStart.clientY

  if (Math.abs(diffX) > Math.abs(diffY)) return // Horizontal swipe

  if (diffY > 10 && expanded.value) { // Swipe down
    expanded.value = false
    touchStart = null
  }
  else if (diffY < -10 && !expanded.value) { // Swipe up
    expand()
    touchStart = null
  }
}
</script>
