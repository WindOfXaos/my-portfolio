import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8787',
    trace: 'on-first-retry',
  },
  // Exercise the built/prerendered app through the documented Cloudflare
  // preview (Nitro's prescribed `wrangler dev` invocation for this output).
  // Run `pnpm build` first so `.output/` exists.
  webServer: {
    command:
      'pnpm exec wrangler dev .output/server/index.mjs --assets .output/public --port 8787',
    url: 'http://127.0.0.1:8787',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
