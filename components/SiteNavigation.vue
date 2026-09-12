<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const destinations = [
  { label: 'Profile', href: '#profile' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
] as const;

type DestinationHref = (typeof destinations)[number]['href'];

function toDestination(hash: string): DestinationHref {
  // The root URL shows the profile section, so it counts as current.
  return hash === '#about' || hash === '#projects' || hash === '#profile'
    ? hash
    : '#profile';
}

const route = useRoute();

/**
 * Native fragment clicks change window.location.hash without notifying the
 * router, so mirror them here. Null until the first hashchange: before that
 * the router's parsed hash is the source of truth, because startup rewrites
 * the visible URL via history.replaceState (no hashchange event) while the
 * route object keeps the initial fragment intact.
 */
const hashOverride = ref<string | null>(null);

function syncFromLocation(): void {
  hashOverride.value = window.location.hash;
}

const current = computed<DestinationHref>(() =>
  toDestination(hashOverride.value ?? route.hash),
);

onMounted(() => {
  window.addEventListener('hashchange', syncFromLocation);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', syncFromLocation);
});
</script>

<template>
  <header class="site-header fixed inset-x-0 top-0 z-50">
    <nav class="site-nav" aria-label="Portfolio sections">
      <ul
        class="site-nav-list m-0 flex list-none items-center justify-center gap-1 p-0"
      >
        <li v-for="destination in destinations" :key="destination.href">
          <a
            :href="destination.href"
            class="site-nav-link inline-flex min-h-11 min-w-11 items-center justify-center px-4 py-2"
            :class="{
              'site-nav-link--current': current === destination.href,
            }"
            :aria-current="
              current === destination.href ? 'location' : undefined
            "
          >
            {{ destination.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Always-visible single-page navigation: fixed, touch-sized links, no
 * hover-dependent disclosure. Restrained color transition only. The current
 * destination keeps a persistent high-contrast treatment independent of
 * hover or focus. */
.site-header {
  background: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.site-nav-link {
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.site-nav-link:hover {
  background: rgba(255, 255, 255, 0.12);
}

.site-nav-link--current {
  background: #ffffff;
  color: #0d0d0d;
}

.site-nav-link--current:hover {
  background: #ffffff;
}

@media (prefers-reduced-motion: reduce) {
  .site-nav-link {
    transition: none;
  }
}
</style>
