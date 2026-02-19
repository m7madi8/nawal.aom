<template>
  <section
    ref="revealEl"
    class="video-section section-reveal relative overflow-hidden bg-[var(--color-gray)] py-10 sm:py-12 md:py-16"
    :class="{ 'is-visible': isRevealed }"
    id="video"
  >
    <AppContainer>
      <div class="mx-auto max-w-6xl">
        <!-- Video (always) + Story (large screens only). On lg: title sits in video column. -->
        <div class="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <!-- Video side: title + video + caption in one column on large screens -->
          <div class="video-side lg:order-1 lg:flex lg:flex-col lg:items-center">
            <div class="video-column-content lg:w-full lg:max-w-[340px]">
              <div class="mb-6 text-center sm:mb-8 lg:mb-6 lg:text-left">
                <p class="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
                  Practice & presence
                </p>
                <h2 class="font-serif text-2xl font-light text-[var(--color-text)] sm:text-3xl md:text-4xl">
                  A moment of calm
                </h2>
              </div>
              <div class="video-frame group relative">
                <div class="absolute -inset-px rounded-2xl bg-gradient-to-b from-[var(--color-primary)]/40 via-[var(--color-primary)]/20 to-[var(--color-primary)]/40 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div class="relative mx-auto max-w-[280px] overflow-hidden rounded-2xl bg-[var(--color-secondary)] shadow-xl ring-1 ring-black/5 sm:max-w-[320px] md:max-w-[360px] lg:max-w-full">
                  <div class="aspect-[9/16] w-full relative">
                    <video
                      ref="videoEl"
                      class="h-full w-full object-cover"
                      src="/media/nawal_aom.mp4"
                      autoplay
                      muted
                      playsinline
                      webkit-playsinline="true"
                      loop
                      preload="auto"
                    >
                      Your browser does not support the video tag.
                    </video>

                    <button
                      type="button"
                      class="audio-toggle absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-white"
                      :aria-pressed="!isMuted"
                      :aria-label="isMuted ? 'Unmute video' : 'Mute video'"
                      @click="toggleAudio"
                    >
                      <span class="audio-toggle__icon" aria-hidden="true">
                        <svg
                          v-if="isMuted"
                          viewBox="0 0 24 24"
                          class="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M11 5L6 9H3v6h3l5 4V5z" />
                          <path d="M22 9L16 15" />
                          <path d="M16 9L22 15" />
                        </svg>
                        <svg
                          v-else
                          viewBox="0 0 24 24"
                          class="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M11 5L6 9H3v6h3l5 4V5z" />
                          <path d="M15 9a5 5 0 0 1 0 6" />
                          <path d="M18 7a8 8 0 0 1 0 10" />
                        </svg>
                      </span>
                      <span class="audio-toggle__label">{{ isMuted ? 'Muted' : 'Live audio' }}</span>
                    </button>
                  </div>
                  <div class="absolute inset-x-0 bottom-0 h-16 pointer-events-none rounded-b-2xl bg-gradient-to-t from-black/15 to-transparent" />
                </div>
              </div>
              <p class="mt-4 text-center text-sm text-[var(--color-secondary)] lg:text-left">
                Nawal Omar · Yoga & mindfulness
              </p>
            </div>
          </div>

          <!-- Trainer story (large screens only): centered in column, first-person -->
          <div class="story-side hidden lg:flex lg:order-2 lg:flex-col lg:justify-center lg:items-center lg:px-4">
            <div class="w-full max-w-md text-center">
              <p class="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-accent)]">
                My story
              </p>
              <h3 class="mb-3 font-serif text-xl font-medium text-[var(--color-text)]">
                Nawal Omar
              </h3>
              <p class="mb-4 text-sm leading-relaxed text-[var(--color-secondary)]">
                I'm a certified yoga instructor with over ten years of practice and teaching. What started as my personal search for calm and flexibility became a path to share yoga with others—Vinyasa, Yin, Hatha, and guided meditation.
              </p>
              <p class="text-sm leading-relaxed text-[var(--color-secondary)] sm:text-base">
                Whether in the studio or in nature, I design every session to help you reconnect with your body, breath, and inner stillness. I believe yoga is for everyone: gentle movement, mindful breath, and moments of silence that bring you back to yourself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
const { el: revealEl, isVisible: isRevealed } = useScrollReveal({ threshold: 0.1 })
const audioConsent = useState<'accepted' | 'declined' | null>('audio-consent-v2', () => null)
const videoEl = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)
let observer: IntersectionObserver | null = null
let isInViewport = false
let removeUnlockListener: (() => void) | null = null
let stopConsentWatch: (() => void) | null = null

const AUDIO_CONSENT_KEY = 'audio-consent-v2'

const toggleAudio = async () => {
  const video = videoEl.value
  if (!video) return

  const nextMuted = !video.muted
  video.muted = nextMuted
  isMuted.value = nextMuted

  if (!nextMuted) {
    audioConsent.value = 'accepted'
    if (import.meta.client) localStorage.setItem(AUDIO_CONSENT_KEY, 'accepted')
  }

  try {
    await video.play()
  } catch {
    video.muted = true
    isMuted.value = true
  }
}

onMounted(() => {
  if (!import.meta.client || !videoEl.value) return

  const video = videoEl.value
  video.defaultMuted = true
  video.muted = true
  isMuted.value = true

  const syncAudioMode = () => {
    if (audioConsent.value === 'accepted' && isInViewport) {
      video.muted = false
      isMuted.value = false
      video.play().catch(() => {
        video.muted = true
        isMuted.value = true
        video.play().catch(() => {})
      })
      return
    }

    video.muted = true
    isMuted.value = true
    if (isInViewport) {
      video.play().catch(() => {})
    }
  }

  const handleUnlock = () => {
    if (audioConsent.value !== 'accepted') return
    if (!isInViewport) return
    video.muted = false
    isMuted.value = false
    video.play().catch(() => {
      video.muted = true
      isMuted.value = true
    })
  }

  // Start fetching video data as soon as the page is mounted.
  video.load()
  video.play().catch(() => {})
  window.addEventListener('audio-consent-unlock', handleUnlock)
  removeUnlockListener = () => window.removeEventListener('audio-consent-unlock', handleUnlock)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isInViewport = entry.isIntersecting
        if (entry.isIntersecting) {
          syncAudioMode()
        } else {
          video.pause()
        }
      })
    },
    { threshold: 0.25, rootMargin: '0px' }
  )
  observer.observe(video)

  stopConsentWatch = watch(audioConsent, () => {
    syncAudioMode()
  })
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
  removeUnlockListener?.()
  removeUnlockListener = null
  stopConsentWatch?.()
  stopConsentWatch = null
})
</script>

<style scoped>
.video-frame {
  border-radius: var(--radius-xl, 1.5rem);
}
.video-frame video {
  display: block;
  border-radius: inherit;
}

.audio-toggle {
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(0, 0, 0, 0.22));
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.22);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.audio-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.28);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.28), rgba(0, 0, 0, 0.2));
}

.audio-toggle:active {
  transform: translateY(0);
}

.audio-toggle__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.audio-toggle__label {
  letter-spacing: 0.02em;
}
</style>
