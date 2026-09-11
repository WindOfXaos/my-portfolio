import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',

  modules: ['@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  nitro: {
    preset: 'cloudflare_module',
  },

  routeRules: {
    '/': { prerender: true },
  },

  runtimeConfig: {
    public: {
      // Production default; override per environment with NUXT_PUBLIC_SITE_URL.
      siteUrl: 'https://windofxaos.github.io/my-portfolio',
      // Empty by default: analytics stays off until NUXT_PUBLIC_GA_MEASUREMENT_ID is set.
      gaMeasurementId: '',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@700&display=swap',
        },
      ],
      meta: [{ name: 'theme-color', content: '#0d0d0d' }],
    },
  },
});
