# ADR-0001: Deploy the prerendered portfolio on Cloudflare Workers

- Status: Accepted
- Date: 2026-09-09

## Context

The existing portfolio is a static single-page website hosted on GitHub Pages.
The Nuxt migration should retain static-site performance and portability, while
the planned agentic representation will eventually need server-side behavior.
Building chat infrastructure now would be premature, but choosing a static-only
deployment target would create an avoidable platform migration later.

## Decision

Build the portfolio with Nuxt 4 and target Cloudflare Workers. Prerender the
public portfolio content so the current site is delivered as complete HTML and
static assets. Commit only the minimal Worker configuration needed to build,
preview, and deploy the site; do not configure storage, AI, or other Cloudflare
bindings until a concrete feature requires them.

Keep GitHub Pages serving production during the migration. Use a Cloudflare
preview to verify functional behavior, accessibility, visual fidelity, and
deployment configuration before cutting production traffic over.

## Consequences

- The migrated portfolio retains fast initial delivery and indexable HTML.
- Nuxt server routes can be added later without replacing the frontend
  architecture or hosting platform.
- Cloudflare-specific configuration becomes part of the repository and must
  remain minimal and documented.
- The initial scaffold does not include chat abstractions, databases, storage,
  AI bindings, or generalized backend infrastructure.
- The GitHub Pages deployment remains a rollback point through the cutover.
