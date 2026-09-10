<script setup lang="ts">
import type { ProfileContent, SocialIcon } from '~/content/portfolio';
import { SOCIAL_ICON_PATHS } from '~/components/profile-icons';

defineProps<{
  profile: ProfileContent;
}>();

function iconPath(icon: SocialIcon): string {
  return SOCIAL_ICON_PATHS[icon];
}
</script>

<template>
  <section
    id="profile"
    class="profile-hero flex min-h-svh flex-col items-center justify-center gap-5 overflow-hidden px-5 pb-16 pt-8 text-center text-profile-paper"
    aria-labelledby="profile-name"
    :style="{ '--profile-bg': `url('${profile.backgroundImage}')` }"
  >
    <h1
      id="profile-name"
      class="profile-name flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2"
    >
      {{ profile.name }}
      <span class="profile-alias font-alias">{{ profile.alias }}</span>
    </h1>
    <p class="profile-role font-role">{{ profile.role }}</p>
    <ul class="mt-2 flex list-none gap-3 p-0" aria-label="Social links">
      <li v-for="link in profile.socialLinks" :key="link.href">
        <a
          :href="link.href"
          :aria-label="link.label"
          target="_blank"
          rel="noopener noreferrer"
          class="profile-social-link inline-flex h-12 w-12 items-center justify-center rounded-full"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            fill="currentColor"
          >
            <path :d="iconPath(link.icon)" />
          </svg>
        </a>
      </li>
    </ul>
    <div class="scroll-hint" role="img" :aria-label="profile.scrollHint">
      <span class="scroll-hint__chevron" aria-hidden="true" />
      <span class="scroll-hint__chevron" aria-hidden="true" />
      <span class="scroll-hint__chevron" aria-hidden="true" />
    </div>
  </section>
</template>
