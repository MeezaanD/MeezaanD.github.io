# meezaan.dev Design System

This guide captures the visual and editorial system behind `meezaan.dev` so it can be reused across future projects without turning every new site into a copy-paste clone.

## Framing

The site is an editorial digital home, not a portfolio-first showcase. It should feel like a living notebook for software, systems thinking, learning, and taste.

Use this direction when starting a new project:

- Lead with presence and point of view before credentials.
- Prefer story flow over dashboards, resume blocks, or marketing sections.
- Let work, learning, and contact details appear as part of the narrative.
- Keep the interface quiet enough that the writing and rhythm can carry the page.

Avoid these defaults unless a project explicitly needs them:

- project showcase grids as the main homepage gesture;
- resume-style timelines as the first impression;
- oversized product marketing heroes;
- decorative UI that does not reveal content or state.

## Information Architecture

The active public structure is compact and intentional:

- `Home`
- `Now`
- `Profile`
- `Transcript`
- `Contact`

Use stable labels where possible. `Contact` should be direct and lightweight, usually a `mailto:` link rather than a form workflow.

For future projects, keep navigation short enough to scan in one breath. If a link is repeated in nav, footer, or contact areas, store it in shared site metadata instead of duplicating it inside components.

## Visual Language

The visual system is soft, editorial, and slightly tactile:

- mineral paper light theme;
- charcoal dark theme;
- fine dividing rules;
- subtle paper texture;
- generous vertical rhythm;
- restrained accent color;
- serif-like display energy through script typography;
- mono labels for metadata, navigation, counts, and small commands.

Use semantic tokens from `src/styles/global.css`:

- `--paper`, `--paper-soft`, `--ink`, `--ink-muted`, `--ink-subtle`;
- `--accent`, `--accent-soft`;
- `--rule`, `--rule-strong`;
- Tailwind theme aliases such as `text-muted`, `text-subtle`, `border-border`, and `bg-surface`.

Avoid scattering one-off palette values through pages. Add or adjust tokens when the system needs a new reusable visual role.

## Typography

The typography stack is part of the personality:

- Display: `Satisfy`, used for large expressive headings and brand moments.
- Body: `Inter`, used for readable prose and UI text.
- Metadata: `IBM Plex Mono`, used for nav, dates, labels, counts, and compact actions.

Use display type boldly but sparingly. It works best when surrounded by space, fine rules, and plain supporting copy. Inside compact UI, keep type smaller and tighter so it does not feel like a hero headline trapped in a box.

Keep letter spacing at `0` for body and headings. Use uppercase mono labels only for small metadata and commands.

## Layout Patterns

The homepage is built from full-screen story scenes:

- each scene has one clear idea;
- content sits inside a constrained width;
- sections breathe vertically;
- visual glyphs support the story instead of becoming framed cards;
- the next section should feel naturally discoverable through scroll.

Use Tailwind utilities for page and component layout. Do not add page-level `<style>` blocks for layouts that utilities can express.

Cards should be rare. Use them for repeated items, modals, and genuinely framed tools. Page sections should be full-width bands or unframed layouts, not nested cards.

## Component Patterns

Navigation:

- fixed at the top;
- logo left, compact links right;
- mobile menu uses the same source data as desktop nav;
- active labels should stay readable in both themes.

Story scenes:

- large display heading;
- one supporting visual or structured content group;
- mono metadata as rhythm markers;
- staggered alignment can add play without becoming messy.

Timelines and orbit lists:

- border-top rules create structure;
- current status may be louder through accent labels, scale, or spacing;
- older entries should be present but quieter;
- copy should feel human and specific, not like a job board.

Transcript rows:

- use structured content collections;
- keep rows scan-friendly with title, institution, status, date, description, and tags;
- certificate actions stay compact and mono.

Certificate modals:

- attach fixed overlays to `document.body`;
- lock and restore scroll deliberately;
- keep previews inside the viewport on desktop and mobile;
- close via button, overlay click, and Escape;
- return focus to the trigger after close.

## Copy Style

Write like a capable person with taste, not a corporate profile.

Good copy is:

- concise;
- warm;
- a little playful;
- specific about craft;
- comfortable with fragments when the rhythm benefits.

Examples that fit:

- `Build it.`
- `Current gravity`
- `Built by repetition`
- `Made, not listed.`
- `Formal study, bootcamps, and certificates. Kept tidy, not loud.`

Avoid bloated claims, generic passion statements, and copy that turns the site back into a conventional resume.

## Implementation Defaults

Use the existing architecture unless a project asks for a different stack:

- Astro pages and layouts;
- Astro content collections for maintained copy and structured records;
- Tailwind CSS v4 utilities;
- semantic theme tokens in `global.css`;
- shared metadata in `src/data/site.ts`;
- route-level composition for public pages.

Before adding new UI, decide whether the change belongs in:

- `src/data/site.ts` for shared links and metadata;
- `src/content/*` for authored records and editorial copy;
- `src/pages/*` for route composition;
- `src/styles/global.css` for reusable tokens and component styles.

## Verification

For meaningful UI changes, verify:

- production build succeeds;
- homepage, transcript, and 404 render;
- light and dark themes remain readable;
- mobile menu still works;
- certificate previews open centered and close cleanly;
- homepage does not drift into old portfolio framing.

The intended feeling is simple: calm surface, clear craft, enough personality to make the page unmistakably Meezaan.
