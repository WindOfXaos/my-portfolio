/**
 * Google Analytics, isolated behind public runtime configuration.
 *
 * Loads only in production builds and only when
 * `NUXT_PUBLIC_GA_MEASUREMENT_ID` is configured. No measurement identifier
 * is hardcoded here; without configuration this plugin renders nothing.
 */
export default defineNuxtPlugin(() => {
  const gaMeasurementId = useRuntimeConfig().public.gaMeasurementId;

  if (!gaMeasurementId || import.meta.dev) {
    return;
  }

  const encodedId = encodeURIComponent(gaMeasurementId);

  useHead({
    script: [
      {
        key: 'ga-loader',
        src: `https://www.googletagmanager.com/gtag/js?id=${encodedId}`,
        async: true,
      },
      {
        key: 'ga-config',
        innerHTML: [
          'window.dataLayer = window.dataLayer || []',
          'function gtag(){window.dataLayer.push(arguments)}',
          "gtag('js', new Date())",
          `gtag('config', ${JSON.stringify(gaMeasurementId)})`,
        ].join(';'),
      },
    ],
  });
});
