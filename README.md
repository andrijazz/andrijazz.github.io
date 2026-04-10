# andrijazz.github.io

My personal site hosted on GitHub Pages. Built with Next.js (static export).

Visit [andrijazz.github.io](https://andrijazz.github.io).

## Development

```bash
npm install
npm run dev
```

## Content

| File / directory | What it controls |
|---|---|
| `content/home.md` | Homepage body (Markdown + HTML) |
| `content/site.json` | Social links shown in the footer |
| `content/posts/*.md` | Blog posts (filename = URL slug) |
| `public/ash/` | ASH project page (static HTML, served at `/ash`) |
| `public/static/` | CSS/JS assets used by the ASH page |

### Blog post frontmatter

```yaml
---
title: "Post title"
date: "2025-01-15"
---
```

KaTeX math is supported: `$inline$` and `$$block$$`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow which builds and deploys to GitHub Pages.
