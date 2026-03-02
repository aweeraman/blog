# Publishing a New Post

## 1. Write the post

Create a markdown file in `posts/` using kebab-case:

```
posts/my-new-post.md
```

Add YAML front matter at the top:

```yaml
---
title: "My New Post"
date: "2026-03-02"
path: "/my-new-post"
excerpt: "A short description for previews and SEO."
feature_image: "/images/my-new-post/my-new-post.jpg"
featured: true
---
```

- `path` must match the filename (without `.md`, with a leading `/`)
- `featured: true` displays the post in the featured section on the homepage

## 2. Add the feature image

Create a directory under `public/images/` matching the post slug and place the image there:

```sh
mkdir -p public/images/my-new-post
cp source-image.jpg public/images/my-new-post/my-new-post.jpg
```

## 3. Optimize the image

Run the optimize script targeting just the new image or its directory:

```sh
bun run optimize-images public/images/my-new-post/my-new-post.jpg
```

This generates WebP, AVIF, and responsive variants (400w, 800w, 1200w) automatically.

To optimize all images (e.g. after a bulk update):

```sh
bun run optimize-images
```

## 4. Regenerate the sitemap

```sh
bun run sitemap
```

## 5. Preview locally

```sh
bun run dev
```

## 6. Build and deploy

```sh
bun run build
```
