<template>
  <div
    v-if="!isTouch && !prefersReducedMotion"
    ref="cursorEl"
    class="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
  >
    <div
      class="h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/10 shadow-soft backdrop-blur-md transition-transform duration-200 will-change-transform"
      :style="cursorStyle"
    />
  </div>
</template>

<script setup lang="ts">
const cursorEl = ref<HTMLDivElement | null>(null)
const x = ref(0)
const y = ref(0)
const scale = ref(1)
const isTouch = ref(false)
let handleMove: ((event: MouseEvent) => void) | null = null
let handleLeave: (() => void) | null = null
let handleEnter: (() => void) | null = null

const { prefersReducedMotion } = useReducedMotion()

const cursorStyle = computed(() => ({
  transform: `translate3d(${x.value}px, ${y.value}px, 0) scale(${scale.value})`
}))

onMounted(() => {
  if (import.meta.server) return

  isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouch.value || prefersReducedMotion.value) {
    return
  }

  handleMove = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
    scale.value = 1.1
  }

  handleLeave = () => {
    scale.value = 0.8
  }

  handleEnter = () => {
    scale.value = 1
  }

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseleave', handleLeave)
  window.addEventListener('mouseenter', handleEnter)
})

onBeforeUnmount(() => {
  if (handleMove) window.removeEventListener('mousemove', handleMove)
  if (handleLeave) window.removeEventListener('mouseleave', handleLeave)
  if (handleEnter) window.removeEventListener('mouseenter', handleEnter)
})
</script>

