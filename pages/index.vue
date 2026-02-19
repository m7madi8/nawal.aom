<template>
  <main class="min-w-0 overflow-x-hidden">
    <HeroIsla />
    <AboutSection />
    <VideoSection />
    <MomentsGallerySection />
    <WorkshopsSection />
    <FooterIsla />
  </main>
</template>

<script setup lang="ts">
import HeroIsla from '~/components/sections/HeroIsla.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import VideoSection from '~/components/sections/VideoSection.vue'
import MomentsGallerySection from '~/components/sections/MomentsGallerySection.vue'
import WorkshopsSection from '~/components/sections/WorkshopsSection.vue'
import FooterIsla from '~/components/sections/FooterIsla.vue'
</script>
