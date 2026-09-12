<script setup lang="ts">
import AboutSection from '~/components/AboutSection.vue';
import ProfileSection from '~/components/ProfileSection.vue';
import ProjectsPlaceholder from '~/components/ProjectsPlaceholder.vue';
import SiteNavigation from '~/components/SiteNavigation.vue';
import { aboutContent, profileContent } from '~/content/portfolio';

const runtimeConfig = useRuntimeConfig();
const siteUrl = runtimeConfig.public.siteUrl;

const title = 'Moaaz W. Lotfi';
const description =
  'Portfolio of Moaaz W. Lotfi (WindOfXaos) — developer and designer.';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: siteUrl,
  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: description,
});

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
});
</script>

<template>
  <div>
    <SiteNavigation />
    <main>
      <ProfileSection :profile="profileContent" />
      <AboutSection :about="aboutContent" />
      <ProjectsPlaceholder
        heading="Projects"
        message="Selected projects are being migrated to this site — check back soon."
      />
    </main>
  </div>
</template>
