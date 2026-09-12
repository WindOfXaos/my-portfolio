<script setup lang="ts">
import type { AboutContent } from '~/content/portfolio';

defineProps<{
  about: AboutContent;
}>();
</script>

<template>
  <section
    id="about"
    class="about-section flex min-h-svh flex-col items-center justify-center text-white"
    aria-labelledby="about-heading"
  >
    <div
      class="about-background flex w-full flex-1 flex-col items-center justify-center"
    >
      <h2 id="about-heading" class="about-heading">{{ about.heading }}</h2>
      <p class="about-hero">{{ about.statement }}</p>
      <div class="about-interests w-full">
        <p class="about-interests-label">{{ about.interestsLabel }}</p>
        <ul class="badge-container list-none" aria-label="Interests">
          <li
            v-for="interest in about.interests"
            :key="interest.label"
            class="about-badge"
            :style="{ backgroundColor: interest.color }"
          >
            {{ interest.label }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Recognizable dark patterned about treatment, faithful to the legacy
 * design. Layout stays as Tailwind utilities; the diagonal pattern, badge
 * colors (via inline style from typed content), and restrained motion stay
 * authored here. */
.about-section {
  background: #0d0d0d;
  scroll-margin-top: 3.5rem;
}

.about-background {
  padding: 3rem;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(0, 0, 0, 0.1) 50%
  );
  background-size: 30px 30px;
  animation: about-slide 4s linear infinite;
}

.about-heading {
  /* Visually hidden but still exposed to assistive technology as the
   * section's accessible name: the legacy design leads with the
   * positioning statement, not a visible heading. */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.about-hero {
  max-width: 44rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.4;
}

.about-interests {
  max-width: 44rem;
  padding-top: 1rem;
}

.about-interests-label {
  padding: 0.3rem 0;
  font-size: 0.875rem;
  opacity: 0.8;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  margin: 0;
}

.about-badge {
  display: flex;
  padding: 0.2rem 0.4rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  transition: transform 0.2s ease;
}

.about-badge:hover {
  transform: scale(1.05);
}

@keyframes about-slide {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 30px -30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-background {
    animation: none;
  }

  .about-badge {
    transition: none;
  }

  .about-badge:hover {
    transform: none;
  }
}

@media (max-width: 40rem) {
  .about-background {
    padding: 1.5rem;
  }

  .about-hero {
    font-size: 1.125rem;
  }

  .about-badge {
    padding: 0.15rem 0.3rem;
    font-size: 0.8rem;
  }
}
</style>
