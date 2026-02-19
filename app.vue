<template>
  <div id="app-root" class="min-h-screen min-w-0 overflow-x-hidden bg-[var(--bg-body)] text-[var(--text-main)]">
    <AppCursorFX />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div
      v-if="showAudioPrompt"
      class="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-md rounded-2xl border border-[var(--color-primary)]/30 bg-white/95 p-4 shadow-xl backdrop-blur-md"
      role="dialog"
      aria-live="polite"
      aria-label="Audio permission"
    >
      <p class="text-sm font-medium text-[var(--color-secondary)]">
        Enable sound for the intro video?
      </p>
      <div class="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          class="rounded-lg border border-[var(--color-primary)]/40 px-3 py-1.5 text-sm text-[var(--color-secondary)] transition hover:bg-[var(--color-primary)]/10"
          @click="declineAudio"
        >
          Not now
        </button>
        <button
          type="button"
          class="rounded-lg bg-[var(--color-secondary)] px-3 py-1.5 text-sm text-white transition hover:bg-[var(--color-accent)]"
          @click="acceptAudio"
        >
          Enable sound
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const audioConsent = useState<'accepted' | 'declined' | null>('audio-consent', () => null)
const showAudioPrompt = ref(false)

const handleKeyDown = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
  if (isInput) return

  const scrollStep = 80
  const pageStep = window.innerHeight * 0.8

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      window.scrollBy({ top: scrollStep, behavior: 'auto' })
      break
    case 'ArrowUp':
      e.preventDefault()
      window.scrollBy({ top: -scrollStep, behavior: 'auto' })
      break
    case 'PageDown':
      e.preventDefault()
      window.scrollBy({ top: pageStep, behavior: 'auto' })
      break
    case 'PageUp':
      e.preventDefault()
      window.scrollBy({ top: -pageStep, behavior: 'auto' })
      break
    case 'Home':
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'auto' })
      break
    case 'End':
      e.preventDefault()
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'auto' })
      break
  }
}

useHead({
  bodyAttrs: {
    class: 'antialiased'
  }
})

onMounted(() => {
  if (!import.meta.client) return
  document.documentElement.style.scrollBehavior = 'auto'
  document.addEventListener('keydown', handleKeyDown)

  const savedConsent = localStorage.getItem('audio-consent')
  if (savedConsent === 'accepted' || savedConsent === 'declined') {
    audioConsent.value = savedConsent
    showAudioPrompt.value = false
  } else {
    showAudioPrompt.value = true
  }
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.removeEventListener('keydown', handleKeyDown)
})

const acceptAudio = () => {
  audioConsent.value = 'accepted'
  if (import.meta.client) localStorage.setItem('audio-consent', 'accepted')
  showAudioPrompt.value = false
}

const declineAudio = () => {
  audioConsent.value = 'declined'
  if (import.meta.client) localStorage.setItem('audio-consent', 'declined')
  showAudioPrompt.value = false
}
</script>

