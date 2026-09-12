<script setup lang="ts">
defineProps<{
  heading: string;
  message: string;
}>();
</script>

<template>
  <section
    id="projects"
    class="projects-placeholder flex min-h-svh flex-col items-center justify-center text-white"
    aria-labelledby="projects-heading"
  >
    <h2 id="projects-heading">{{ heading }}</h2>
    <p class="projects-message">{{ message }}</p>
  </section>
</template>

<style scoped>
/* Minimal semantic placeholder: keeps the stable #projects destination
 * without migrating project content (later ticket). */
.projects-placeholder {
  background: #0d0d0d;
  padding: 3rem 1.5rem;
  text-align: center;
  scroll-margin-top: 3.5rem;
}

.projects-placeholder h2 {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.8;
}

.projects-message {
  max-width: 32rem;
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}
</style>
