export function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const el = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!import.meta.client) return
    nextTick(() => {
      if (!el.value) return
      const threshold = options?.threshold ?? 0.15
      const rootMargin = options?.rootMargin ?? '0px 0px -8% 0px'
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) isVisible.value = true
          })
        },
        { threshold, rootMargin }
      )
      observer.observe(el.value)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { el, isVisible }
}
