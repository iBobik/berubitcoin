<template>
  <div @click="expand" ref="container">
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

watch(card, (el, prevEl) => {
  if (el) {
    el.style.overflow = 'scroll'
    el.style.paddingBottom = '100px'
  }
  if (prevEl) {
    prevEl.style.overflow = ''
    prevEl.style.paddingBottom = ''
  }
}, { immediate: true })


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

const { directions, y: scrollYPosition } = useScroll(card)
const { top: scrollingToTop, bottom: scrollingToBottom } = toRefs(directions)

watch(scrollingToBottom, () => {
  if (!expanded.value && scrollingToBottom.value) {
    expand()
  }
})

watch(scrollingToTop, () => {
  if (expanded.value && scrollingToTop.value && scrollYPosition.value <= 0) {
    expanded.value = false
  }
})
</script>
