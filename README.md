# Anuradha Weeraman's Blog

A modern, SEO-optimized technical blog built with React, TypeScript, Vite, and Vike for static site generation.

## Features

- **Static Site Generation (SSG)** - Pre-renders all 60+ blog posts at build time using Vike
- **SEO Optimized** - Complete meta tags, Open Graph, Twitter Cards in pre-rendered HTML
- **Markdown Content** - Write blog posts and pages in Markdown with frontmatter
- **Featured Posts Carousel** - Auto-rotating carousel showcasing featured content
- **Search Functionality** - Client-side search across all posts
- **Pagination** - Automatic pagination with 12 posts per page
- **Dark Theme** - Modern dark theme with custom styling
- **Responsive Design** - Mobile-first design with TailwindCSS

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Vike** - SSG/SSR framework for Vite
- **TailwindCSS** - Utility-first CSS framework
- **React Markdown** - Render markdown content
- **Gray Matter** - Parse markdown frontmatter

## Project Structure

```
blog/
├── pages/              # Vike pages (file-based routing)
│   ├── index/         # Homepage
│   ├── @slug/         # Dynamic routes for posts/pages
│   ├── page/@pageNum/ # Pagination routes
│   └── +config.ts     # Vike configuration
├── posts/             # Markdown blog posts (60+ posts)
├── pages/             # Markdown static pages
├── src/
│   ├── components/    # React components
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript types
├── public/
│   └── images/        # Static images
└── docs/
    └── seo.md         # SEO optimization plan
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173

### Build

```bash
npm run build
```

Generates static HTML for pages in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Writing Content

### Blog Posts

Create markdown files in `posts/` directory with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
path: "/your-post-slug"
excerpt: "Brief description for SEO and previews"
feature_image: "/images/your-post/image.jpg"
featured: true  # Optional: show in featured carousel
---

Your markdown content here...
```

### Static Pages

Create markdown files in `pages/` directory:

```markdown
---
title: "Page Title"
slug: "page-slug"
---

Your page content...
```

## SEO Features

- ✅ Pre-rendered HTML with full content
- ✅ Dynamic meta tags per page
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Canonical URLs
- ✅ Article metadata with publish dates
- ✅ Robots directives

See `docs/seo.md` for the complete SEO optimization plan.

## Deployment

Build output in `dist/` can be deployed to any static hosting:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

```bash
npm run build
# Deploy dist/ directory
```

## Performance

- **Pre-rendered HTML pages** for instant loading
- **Optimized bundle size** with code splitting
- **Fast page navigation** with client-side routing
- **Lazy-loaded images** (planned)
