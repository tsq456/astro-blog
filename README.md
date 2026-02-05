# Personal Blog (Astro)

A minimalist personal blog built with Astro, driven by Markdown + Content Collections.

## Requirements

- Node.js 20+
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/pages/` - Routes
- `src/layouts/` - Base layout
- `src/styles/` - Global styles
- `src/content/posts/` - Markdown posts
- `src/content/config.ts` - Content schema
- `astro.config.mjs` - Astro config
- `netlify.toml` - Netlify build settings

## Content Model (Frontmatter)

Each post in `src/content/posts/*.md` uses the following frontmatter:

```yaml
title: 文章标题
date: 2026-02-01
category: AI / 设计
excerpt: 摘要内容
hero: https://images.unsplash.com/...
readTime: 8 分钟
draft: false
tags:
  - 标签一
  - 标签二
```

Notes:
- `hero` is optional. If omitted, the list card will render without an image.
- `draft: true` will hide the post from lists and RSS.

## Deploy to Netlify

1. Push this repo to GitHub/GitLab.
2. Create a new site in Netlify and connect the repo.
3. Netlify will use `netlify.toml` automatically:
   - Build: `npm run build`
   - Publish: `dist`
4. Once deployed, set the site URL in `astro.config.mjs` if you want a fixed domain.

## Notes

- RSS is available at `/rss.xml`.
- Remote images are allowed from `images.unsplash.com` in `astro.config.mjs`.
