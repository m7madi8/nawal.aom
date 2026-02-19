<template>
  <main class="retreat-page min-w-0 overflow-x-hidden bg-[var(--bg-body)]">
    <section class="border-b border-[var(--color-primary)]/25 bg-[#faf8f5] pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
      <AppContainer>
        <div class="mx-auto max-w-4xl text-center">
          <p class="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Wadi Rum Retreat
          </p>
          <h1 class="font-serif text-3xl font-light text-[var(--color-secondary)] sm:text-4xl md:text-5xl">
            A path back to yourself
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)] sm:text-lg">
            Wadi Rum Retreat is a path back. Back to your body, your breath, and the quiet part in you that may have been forgotten between pressure, responsibilities, and constant noise.
          </p>
        </div>
      </AppContainer>
    </section>

    <section class="py-12 sm:py-14 md:py-16">
      <AppContainer>
        <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div class="overflow-hidden rounded-2xl border border-[var(--color-primary)]/25 bg-[var(--color-gray)]">
            <img
              src="/media/retreat.jpg"
              alt="Retreat by Nawal Omar"
              class="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          <div class="rounded-2xl border border-[var(--color-primary)]/25 bg-white p-6 sm:p-8">
            <h2 class="font-serif text-2xl font-medium text-[var(--color-secondary)]">
              From an aware, safe, and real place
            </h2>
            <p class="mt-5 text-sm leading-relaxed text-[var(--text-soft)] sm:text-base">
              I am Nawal Omar, a yoga teacher and a nurse, and I guide women through this kind of journey from an aware, safe, and authentic place — no big promises, just honest presence and a deeply felt experience.
            </p>
            <p class="mt-4 text-sm leading-relaxed text-[var(--text-soft)] sm:text-base">
              The retreat will take place at <strong>SHARAZAD CAMP – Wadi Rum</strong>, with very comfortable 5-star glamping rooms, nourishing meals included, and a space where you can feel held — without needing to prove, perform, or stay “strong.”
            </p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="pb-14 sm:pb-16 md:pb-20">
      <AppContainer>
        <div class="mx-auto max-w-4xl rounded-2xl border border-[var(--color-primary)]/25 bg-[#faf8f5] p-6 sm:p-8">
          <h3 class="font-serif text-xl font-medium text-[var(--color-secondary)] sm:text-2xl">
            What we will share during these days
          </h3>
          <p class="mt-5 text-sm leading-relaxed text-[var(--text-soft)] sm:text-base">
            During the retreat we will move, breathe, write, sit in silence, laugh, and even cry if tears arise. There will be yoga, sound healing, sharing circles, silence, and fire under the stars.
          </p>
          <p class="mt-4 text-sm leading-relaxed text-[var(--text-soft)] sm:text-base">
            Most importantly, there will be space for you — exactly as you are.
          </p>
          <p class="mt-6 text-sm leading-relaxed text-[var(--text-soft)] sm:text-base">
            After you fill out the form, we will contact you as soon as possible with all details, the full schedule, and pricing, and we can see together whether this path is right for you at this stage of your life.
          </p>

          <div class="mt-8 flex flex-col items-center gap-3">
            <p class="text-sm text-[var(--color-secondary)]">
              For questions or inquiries:
            </p>
            <div class="mt-1 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://docs.google.com/forms/d/1UcSico2Q0DcMQQdb5wPlXKNLQulRSB7JoPHjpaO-MAg/viewform?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnWZUjcTV6SnnAKzPkKui7nYqfuNYsS99LpRZEV4LHjtvIPHqXSIMkmoLBprg_aem_xlpyJ5tKTtP3I2yN6llW7A&edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
              >
                Submit request
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="https://wa.me/972522496366?text=Hi%20Nawal%2C%20I%20have%20a%20question%20about%20the%20Wadi%20Rum%20Retreat."
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full border border-[var(--color-secondary)]/30 bg-white px-6 py-3 text-sm font-medium text-[var(--color-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                WhatsApp
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Wadi Rum Retreat | Nawal Omar',
  meta: [
    {
      name: 'description',
      content: 'Wadi Rum Retreat with Nawal Omar: yoga, sound healing, mindfulness, and deep restoration in nature.'
    }
  ]
})
</script>
