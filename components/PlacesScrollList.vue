<template>
  <ul
    ref="containerRef"
    class="
      absolute bottom-0 left-0 right-0 z-10
      grid grid-flow-col gap-4 pt-1 pb-10 px-[15vw] sm:px-[calc((100vw_-_24rem)/2)]
      overflow-x-scroll snap-mandatory snap-x scroll-smooth
    "
  >
    <li
      v-for="item in items"
      :key="item.id"
      :data-item-id="item.id"
      :ref="el => el ? itemsRefs.set(item.id, el as HTMLElement) : itemsRefs.delete(item.id)"
      class="self-end snap-center"
      @click="$emit('update:selectedItemId', item.id)"
    >
      <slot :item="item" />
    </li>
  </ul>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
  (event: 'update:selectedItemId', placeId: number): void
}>()

const props = defineProps<{
  items: any[]
  selectedItemId: number | undefined
}>()

const containerRef = ref<HTMLElement>()
const itemsRefs = ref<Map<number, HTMLElement>>(new Map())

watch(() => props.items, () => {
  // If the selected item is not in the list, select the first item
  if (!props.selectedItemId || props.items.find(item => item.id === props.selectedItemId) === undefined) {
    emit('update:selectedItemId', props.items[0].id)
  }
}, { immediate: true })

watch(() => props.selectedItemId, id => {
  itemsRefs.value.get(id!)?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
})

const { isScrolling } = useScroll(containerRef)
watch(isScrolling, () => {
  if (!isScrolling.value) {
    // Find which card is at the center of the container
    const centerX = containerRef.value!.offsetLeft + containerRef.value!.offsetWidth / 2
    const centerY = containerRef.value!.offsetTop + containerRef.value!.offsetHeight - 50
    const centerEl = document.elementsFromPoint(centerX, centerY).find(el => (el as HTMLElement).dataset.itemId) as HTMLElement
    if (centerEl.dataset.itemId) {
      emit('update:selectedItemId', parseInt(centerEl.dataset.itemId))
    }
  }
})

</script>
