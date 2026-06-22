# AGENTS.md

## Purpose
This repository powers `meezaan.dev`, a personal digital presence built with Astro and Tailwind CSS v4. It is not a portfolio site anymore. Agents working here should preserve that framing and evolve the site as an editorial, content-driven home on the web.

The current site emphasizes:
- a thoughtful homepage
- current focus via `Now`
- background via `/profile`
- credentials and certificates via `/transcript`

## Active Information Architecture
Primary public routes:
- `/`
- `/now`
- `/profile`
- `/transcript`

Homepage structure should remain:
- introduction
- now preview
- elsewhere links
- contact

The homepage should not drift back toward:
- project showcase grids
- resume-style timelines
- education or experience as primary homepage sections
- portfolio framing in nav or hero copy

Public labels that should remain stable unless a task explicitly redesigns them:
- `Home`
- `Now`
- `Profile`
- `Contact`

`Contact` is a direct `mailto:` flow, not a form workflow.

## Source Of Truth
Use these files as the main sources of truth before changing behavior:

### Site metadata and shared links
- `src/data/site.ts`

This file owns:
- primary navigation
- social links
- product links
- references like CV and transcript
- site-wide contact metadata

Do not duplicate nav, footer, contact, or external-link data across components when `site.ts` can be extended instead.

### Content collections
- `src/content.config.ts`
- `src/content/*`

Current authored collections include:
- `now`
- `experience`
- `education`
- `transcript`

Legacy-but-still-present collections include:
- `hero`
- `projects`
- `cta`

Use collections for maintained copy and structured content. Prefer extending content models over hardcoding new editorial copy into page components.

### Styling and design tokens
- `src/styles/global.css`

This is the active design-system layer. It defines:
- semantic colors and theme tokens
- typography stacks
- document-wide base behavior

Page and component layout should use Tailwind utilities directly. Prefer semantic utilities such as:
- `text-muted`
- `text-subtle`
- `border-border`
- `bg-surface`

Avoid reintroducing ad hoc opacity-heavy color styling when a semantic token already exists.

### Shell and route composition
- `src/layouts/Layout.astro`
- top-level files in `src/pages/`

Use these for:
- route structure
- page metadata
- canonical URLs
- shared shell behavior
- route-level information architecture

## Architecture Guidance
Keep the current architecture:
- Astro pages and layouts
- Astro content collections
- Tailwind CSS v4 utilities with tokens defined through `@theme`

Do not add page-level `<style>` blocks or recreate shared CSS aliases for layouts that Tailwind utilities can express.

When making changes:
- prefer extending the current content-driven pattern
- prefer updating `site.ts` for repeated link data
- prefer route-level composition over one-off duplicated sections
- preserve the editorial visual language

Visual system to preserve unless a redesign task explicitly changes it:
- serif display typography
- sans-serif body text
- mono metadata and navigation details
- softened mineral light theme
- charcoal dark theme
- semantic theme tokens instead of direct palette scattering

## Legacy Components
The following files are legacy artifacts from the older portfolio-era site and should not be reintroduced into the homepage or primary nav without an explicit task:
- `src/components/Projects.astro`
- `src/components/Experience.astro`
- `src/components/Education.astro`
- `src/components/Hero.astro`
- `src/components/BottomCTA.astro`
- `src/components/GitHubHeatmap.astro`

They are not the active experience. Treat them as legacy unless the task is specifically to migrate, revive, or remove them.

## Working Conventions For Agents
Before editing:
- inspect the current route and content flow
- check whether the change belongs in `site.ts`, a content collection, a page, or `global.css`
- preserve existing uncommitted user changes unless the task explicitly changes them

Prefer these commands:
- `astro dev`
- `astro build`

Preferred verification flow:
1. Run a production build.
2. Verify the changed route in the in-app browser when available.
3. Check both light and dark themes for contrast and tone.
4. Confirm navigation and route labels still match the current IA.

## Verification Checklist
Future agents should verify the following after meaningful UI or IA changes:
- `astro build` succeeds
- `/`, `/now`, `/profile`, `/transcript`, and `404` still render
- theme toggle still persists correctly
- both themes remain readable and keep the intended editorial tone
- active nav states still work
- mobile menu behavior still works
- transcript certificate modal still opens, closes, and restores body scroll
- homepage and nav have not regressed toward old Projects / Experience / Education framing

## Known Caveat
`astro check` may not be available unless `@astrojs/check` is installed. Do not assume it is part of the working verification path unless the dependency has been added.
