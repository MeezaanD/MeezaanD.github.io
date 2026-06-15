# meezaan.dev

Personal site and developer intelligence blog built with Astro.

## Local Development

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## Daily Developer Digest

Blog posts live in `src/content/blog/`. Each digest is a Markdown file and is
published as a static page under `/blog/<filename>/`.

Use a date-prefixed filename so posts remain easy to find:

```text
src/content/blog/2026-06-15-digest.md
```

### Create a Digest Manually

1. Generate or write the digest.
2. Create a `.md` file in `src/content/blog/`.
3. Add the required frontmatter at the top of the file.
4. Add the article body below the frontmatter.
5. Run `npm run build` to validate the content.
6. Commit and push the file to GitHub.

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

### Frontmatter

Required fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `title` | string | Article headline |
| `description` | string | Listing excerpt and page description |
| `pubDate` | date | Publication date in `YYYY-MM-DD` format |
| `tags` | string array | Topics displayed on listing and article pages |

Optional fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `updatedDate` | date | Date of the latest meaningful revision |
| `heroImage` | string | Site-relative or external hero image URL |
| `draft` | boolean | Hides the post when `true`; defaults to `false` |

Only non-draft posts appear on the blog listing or receive generated public
routes. Posts are sorted by publication date, newest first.

## Deployment

The site is deployed from the GitHub repository to the connected hosting
service and custom domain. The manual publishing flow is:

```text
Generate digest elsewhere
→ add the Markdown file to src/content/blog
→ validate with npm run build
→ commit and push to GitHub
→ the connected deployment rebuilds the site
```

The hosting configuration is managed outside this repository, so no
provider-specific deployment steps are required here.

## Automated Draft Workflow

The repository includes `.github/workflows/daily-digest.yml`. It runs every
weekday at 7 AM in the `Africa/Johannesburg` timezone:

```text
Scheduled GitHub Action
→ search current developer updates with the OpenAI API
→ generate a Markdown digest
→ save it with draft: true
→ validate the Astro build
→ commit it to a dated automation branch
→ open a draft pull request
```

The workflow refuses to overwrite an existing digest for the same date. Draft
posts are excluded from the public blog and do not receive generated routes.

### Enable the Workflow

1. In GitHub, open **Settings → Secrets and variables → Actions**.
2. Add a repository secret named `OPENAI_API_KEY`.
3. Open **Settings → Actions → General → Workflow permissions**.
4. Select **Read and write permissions**.
5. Enable **Allow GitHub Actions to create and approve pull requests**.
6. Push the workflow to the repository's default branch.

The API key is only required in GitHub Actions. It does not need to be added to
the website deployment environment because the deployed Astro site never calls
the OpenAI API. `OPEN_API_KEY` is also accepted as a compatibility alias, but
`OPENAI_API_KEY` is the recommended name.

You can optionally add an Actions repository variable named `OPENAI_MODEL` to
override the generator's default model.

### Review and Publish

Each successful run opens a draft pull request containing:

```text
src/content/blog/YYYY-MM-DD-digest.md
```

Proofread and edit the post on the pull request branch. When it is ready:

1. Change `draft: true` to `draft: false`.
2. Confirm the build passes.
3. Mark the pull request ready for review.
4. Merge it into the default branch.

The merge triggers the existing deployment and publishes the post at
`/blog/YYYY-MM-DD-digest/`.

Run the generator locally when needed:

```sh
OPENAI_API_KEY=your-key npm run generate:digest
```

Generate a digest for a specific date:

```sh
OPENAI_API_KEY=your-key npm run generate:digest -- --date 2026-06-15
```

## Contact

- Email: meezaandavids365@gmail.com
- LinkedIn: [Meezaan Davids](https://www.linkedin.com/in/meezaan-davids/)
