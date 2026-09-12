# my-portfolio

Nuxt 4 migration of Moaaz W. Lotfi's portfolio (see `CONTEXT.md`). Production
still serves from GitHub Pages; Cloudflare Workers is the preview target under
review (see `docs/adr/0001-cloudflare-workers-with-prerendered-portfolio.md`).

## Prerequisites

- Node 24 LTS (see `.nvmrc`; `engines` enforces `>=24 <25`)
- pnpm 12.3.4 (`package.json` pins it via `packageManager`; CI uses the same)

## Commands

| Command                   | What it does                                               |
| ------------------------- | ---------------------------------------------------------- |
| `pnpm install`            | Install dependencies (also runs `nuxt prepare`)            |
| `pnpm dev`                | Local development server                                   |
| `pnpm format:check`       | Verify Prettier formatting without changing files          |
| `pnpm format`             | Apply Prettier formatting (local fix command)              |
| `pnpm lint`               | Run ESLint without changing files                          |
| `pnpm lint:fix`           | Run ESLint with autofix (local fix command)                |
| `pnpm typecheck`          | Strict type check via `nuxt typecheck`                     |
| `pnpm build`              | Production build for Cloudflare Workers (prerenders `/`)   |
| `pnpm test`               | Playwright journey against the built app (run build first) |
| `pnpm preview:cloudflare` | Serve the production build locally with `wrangler dev`     |
| `pnpm check`              | Unified gate: format check, lint, typecheck, build, test   |

## Structure

- `content/portfolio.ts` — strict typed portfolio-content boundary (the only
  place profile copy and social destinations live)
- `components/ProfileSection.vue` — profile presentation; consumes the content
  module via props and owns no personal data
- `components/profile-icons.ts` — inlined brand-mark paths (no icon library)
- `pages/index.vue` — prerendered root page plus SEO metadata
- `assets/css/main.css` — Tailwind v4 import, CSS-first `@theme` tokens, and
  authored CSS for the backdrop, alias badge, and chevron animation
- `plugins/analytics.client.ts` — production-only Google Analytics loader
- `tests/e2e/` — visitor-level Playwright journey with an axe scan
- `index.html`, `css/`, `assets/` — legacy static site, kept as reference for
  the upcoming about/projects slices; `public/` holds byte-identical copies of
  the profile slice assets (`profile-bg.jpg`, plus the legacy PNG favicon
  renamed to `favicon.png` so its extension matches its `image/png` content)

## Compatibility notes

- TypeScript is pinned to 5.9.3 (newest stable 5.x) instead of the named
  7.0.2: the native TS 7 package no longer ships the `typescript/lib/tsc`
  entry that vue-tsc 3.3.11 requires, so `nuxt typecheck` crashes with
  `ERR_PACKAGE_PATH_NOT_EXPORTED`, and typescript-eslint 8.70.0 refuses TS 7
  (`typescript-eslint does not support TS 7.0`), breaking `pnpm lint`.
  Revisit when the Vue/ESLint toolchain supports TS 7.
- wrangler is pinned to 4.130.0 instead of 4.131.0: pnpm 12's default
  minimum-release-age supply-chain gate rejects the 4.131.0 release published
  the same day. Same 4.x line; `wrangler dev` behavior is unchanged.

## Configuration

- `NUXT_PUBLIC_SITE_URL` — canonical/OG base URL (default
  `https://windofxaos.github.io/my-portfolio`)
- `NUXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics ID; unset by default, and
  analytics loads only in production builds when it is set. The Nuxt analytics
  plugin does not contain a hardcoded measurement identifier.

## Testing and deployment

Tests exercise the built page as a visitor sees it: `pnpm build`, then
`pnpm test` (Playwright starts `wrangler dev` for you). CI (`.github/workflows/ci.yml`)
pins Node 24 and pnpm 12.3.4 and runs format check, lint, typecheck, build,
test, and a Chromium install. Preview a production build any time with
`pnpm build && pnpm preview:cloudflare`.
