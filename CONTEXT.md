# Portfolio context

## Purpose

This repository contains Moaaz Lotfi's public portfolio. It presents a profile,
interests, and selected projects as a single-page experience.

## Vocabulary

### Portfolio

The public website as a whole. The current migration preserves its identity,
content, and single-page behavior while replacing its technical foundation.

### Portfolio content

The typed personal details, social links, interests, and project metadata that
the interface renders. Content is kept separate from Vue components so it can
be maintained and consumed without coupling it to page markup.

### Portfolio section

One of the stable, full-page destinations in the portfolio: `profile`, `about`,
or `projects`. These names are also the public hash anchors and should remain
stable during the migration.

### Project

A selected piece of work presented in the projects section with a title, link,
description, technology reference, and media. In this repository, "project"
without qualification refers to this portfolio concept, not the repository or
the migration effort.

### Agentic representation

A future conversational experience through which visitors can ask questions
about Moaaz. It is outside the current migration scope. The migration must
leave a clean path to Nuxt server capabilities, but must not invent chat
services, schemas, storage bindings, or knowledge infrastructure yet.

## Current initiative: Nuxt migration

The current work is a faithful migration from plain HTML and CSS to Nuxt 4,
Tailwind CSS 4, and strict TypeScript. It preserves the recognizable design,
copy, project selection, and hash navigation while correcting accessibility,
responsive, keyboard, reduced-motion, metadata, and obvious loading defects.

The foundation is deliberately lean: pnpm, typed portfolio content, shallow
feature-oriented components, ESLint, Prettier, a unified check command, lean
continuous integration, and one browser smoke test with an accessibility scan.
Speculative platform layers and enterprise-grade tooling are explicitly out of
scope.

Deployment targets Cloudflare Workers while prerendering the public portfolio.
GitHub Pages remains the production host until the Cloudflare preview has
passed review and the site is ready to cut over.
