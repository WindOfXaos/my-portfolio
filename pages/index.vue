<script setup lang="ts">
import ProfileSection from '~/components/ProfileSection.vue';
import { profileContent } from '~/content/portfolio';

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
  <main>
    <ProfileSection :profile="profileContent" />
  </main>
</template>
