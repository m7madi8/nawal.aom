<template>
  <div id="app-root" class="min-h-screen min-w-0 overflow-x-hidden bg-[var(--bg-body)] text-[var(--text-main)]">
    <AppCursorFX />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useHead({
  bodyAttrs: {
    class: 'antialiased'
  }
})

onMounted(() => {
  if (!import.meta.client) return
  document.documentElement.style.scrollBehavior = 'auto'

  const scrollStep = 80
  const pageStep = window.innerHeight * 0.8

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
    if (isInput) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
        break
      case 'ArrowUp':
        e.preventDefault()
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
        break
      case 'PageDown':
        e.preventDefault()
        window.scrollBy({ top: pageStep, behavior: 'smooth' })
        break
      case 'PageUp':
        e.preventDefault()
        window.scrollBy({ top: -pageStep, behavior: 'smooth' })
        break
      case 'Home':
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        break
      case 'End':
        e.preventDefault()
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
        break
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  onUnmounted(() => document.removeEventListener('keydown', handleKeyDown))
})
</script>

