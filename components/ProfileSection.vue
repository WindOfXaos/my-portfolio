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
    class="profile-hero flex min-h-svh flex-col items-center justify-center overflow-hidden text-profile-paper"
    aria-labelledby="profile-name"
    :style="{ '--profile-bg': `url('${profile.backgroundImage}')` }"
  >
    <h1 id="profile-name" class="profile-name flex justify-center">
      {{ profile.name }}
      <span class="profile-alias font-alias">{{ profile.alias }}</span>
    </h1>
    <p class="profile-role font-role">{{ profile.role }}</p>
    <ul
      class="profile-social flex list-none gap-0.5 p-0"
      aria-label="Social links"
    >
      <li v-for="link in profile.socialLinks" :key="link.href">
        <a
          :href="link.href"
          :aria-label="link.label"
          target="_blank"
          rel="noopener noreferrer"
          class="profile-social-link inline-flex h-11 w-11 items-center justify-center"
        >
          <svg
            class="h-[0.75em] w-[0.75em]"
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

<style scoped>
/* Recognizable centered monochrome profile treatment, faithful to the
 * legacy design. Ordinary layout, spacing, and typography live as Tailwind
 * utilities in the template; only the distinctive backdrop, badge, role
 * scale, hover/focus treatment, and chevron animation stay authored here. */
.profile-hero {
  --profile-bg: none;
  font-size: 18px;
  font-weight: 600;
  background-image:
    var(--profile-bg),
    radial-gradient(circle, #ffffff 50%, rgba(1, 1, 1, 0.7) 100%);
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  background-repeat: no-repeat;
}

.profile-name {
  font-weight: 600;
  line-height: 1.36;
  font-size: 7vw;
  letter-spacing: -0.01em;
}

.profile-alias {
  position: relative;
  height: fit-content;
  margin-block-start: 3.17em;
  color: #000000;
  background: var(--color-profile-paper);
  font-size: 1.5vw;
  line-height: normal;
  white-space: nowrap;
}

.profile-role {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 25px;
  line-height: normal;
  white-space: nowrap;
  word-spacing: 0.16em;
}

.profile-social {
  height: 41px;
  margin: 0;
  font-size: 30px;
  line-height: normal;
}

.profile-social-link {
  transition: transform 0.2s ease;
}

.profile-social-link:hover {
  transform: scale(1.15);
}

/* Scroll affordance: cascading chevrons, as in the legacy design. */
.scroll-hint {
  position: relative;
  top: 15vh;
  width: 1.75rem;
  height: 0.5rem;
}

.scroll-hint__chevron {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  animation: scroll-hint-move 3s ease-out infinite;
}

.scroll-hint__chevron:first-child {
  animation-delay: 1s;
}

.scroll-hint__chevron:nth-child(2) {
  animation-delay: 2s;
}

.scroll-hint__chevron::before,
.scroll-hint__chevron::after {
  content: ' ';
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--color-profile-paper);
}

.scroll-hint__chevron::before {
  left: 0;
  width: 51%;
  transform: skew(0deg, 30deg);
}

.scroll-hint__chevron::after {
  right: 0;
  width: 50%;
  transform: skew(0deg, -30deg);
}

@keyframes scroll-hint-move {
  25% {
    opacity: 1;
  }

  33% {
    opacity: 1;
    transform: translateY(30px);
  }

  67% {
    opacity: 1;
    transform: translateY(40px);
  }

  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .profile-social-link {
    transition: none;
  }

  .profile-social-link:hover {
    transform: none;
  }

  .scroll-hint__chevron {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 40rem) {
  .profile-name {
    flex-direction: column;
    align-items: center;
    font-size: clamp(2.25rem, 11vw, 3.5rem);
  }

  .profile-alias {
    margin-block-start: 0;
    font-size: clamp(0.75rem, 4vw, 1rem);
  }

  .profile-role {
    font-size: clamp(1rem, 6vw, 1.5625rem);
  }
}
</style>
