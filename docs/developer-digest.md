# Developer Digest

The Astro blog publishes Markdown posts from `src/content/blog/`.

## Local Development

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## Create a Digest Manually

Use a date-prefixed filename:

```text
src/content/blog/2026-06-15-digest.md
```

Starter template:

```md
---
title: "Digest title"
description: "A short summary shown on the blog listing and in page metadata."
pubDate: 2026-06-15
tags: ["AI", "TypeScript", "Developer Tools"]
draft: false
---

Opening context for the day's digest.

## The signal

The first section of the article.
```

Required frontmatter:

| Field | Type | Purpose |
| --- | --- | --- |
| `title` | string | Article headline |
| `description` | string | Listing excerpt and page description |
| `pubDate` | date | Publication date in `YYYY-MM-DD` format |
| `tags` | string array | Topics displayed on listing and article pages |

Optional frontmatter:

| Field | Type | Purpose |
| --- | --- | --- |
| `updatedDate` | date | Date of the latest meaningful revision |
| `heroImage` | string | Site-relative or external hero image URL |
| `draft` | boolean | Hides the post when `true`; defaults to `false` |

Only non-draft posts appear on `/blog` or receive public routes. Posts are
sorted by publication date, newest first.

## Manual Publishing

```text
Create the Markdown file
→ run npm run build
→ commit and push to GitHub
→ the connected deployment rebuilds the site
```

Published posts are available at `/blog/YYYY-MM-DD-digest/`.

## Automated Draft Workflow

`.github/workflows/daily-digest.yml` runs every weekday at 7 AM in the
`Africa/Johannesburg` timezone:

```text
Scheduled GitHub Action
→ fetch public developer source feeds
→ generate a Markdown digest with the Gemini API
→ save it with draft: true
→ validate the Astro build
→ commit to a dated automation branch
→ open a draft pull request
```

The workflow refuses to overwrite an existing digest for the same date.

### GitHub Setup

1. Open **Settings → Secrets and variables → Actions**.
2. Add a repository secret named `GEMINI_API_KEY`.
3. Open **Settings → Actions → General → Workflow permissions**.
4. Select **Read and write permissions**.
5. Enable **Allow GitHub Actions to create and approve pull requests**.

The key is only required in GitHub Actions. The deployed Astro site does not
call the Gemini API. `GOOGLE_API_KEY` is accepted as a compatibility alias.

An optional Actions variable named `GEMINI_MODEL` can override the default
model. The default is `gemini-3.1-flash-lite`.

### Review and Publish

Each run opens a draft pull request containing:

```text
src/content/blog/YYYY-MM-DD-digest.md
```

Before merging:

1. Proofread the article and verify its source links.
2. Make any editorial changes on the pull request branch.
3. Change `draft: true` to `draft: false`.
4. Confirm the build passes.
5. Mark the pull request ready and merge it.

The merge triggers the existing deployment and publishes the post.

## Generate Locally

```sh
GEMINI_API_KEY=your-key npm run generate:digest
```

For a specific date:

```sh
GEMINI_API_KEY=your-key npm run generate:digest -- --date 2026-06-15
```
