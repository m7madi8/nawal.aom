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
const audioConsent = useState<'accepted' | 'declined' | null>('audio-consent', () => null)
const videoEl = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | null = null
let isInViewport = false

onMounted(() => {
  if (!import.meta.client || !videoEl.value) return

  const video = videoEl.value
  video.defaultMuted = true
  video.muted = true

  const syncAudioMode = () => {
    if (audioConsent.value === 'accepted' && isInViewport) {
      video.muted = false
      video.play().catch(() => {
        video.muted = true
        video.play().catch(() => {})
      })
      return
    }

    video.muted = true
    if (isInViewport) {
      video.play().catch(() => {})
    }
  }

  // Start fetching video data as soon as the page is mounted.
  video.load()
  video.play().catch(() => {})

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

  watch(audioConsent, () => {
    syncAudioMode()
  })
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
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
</style>
