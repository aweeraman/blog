---
name: new-post
description: Create and publish a new blog post from a markdown file and feature image
argument-hint: [content.md] [image-file]
disable-model-invocation: true
allowed-tools: Read, Bash, Write, Glob, Grep
---

# New Post

Publish a new blog post using the provided content file and feature image.

**Arguments:**
- `$0` — path to the markdown content file (the body of the post, with or without front matter)
- `$1` — path to the feature image (JPG or PNG)

## Steps

### 1. Read the content file

Read `$0`. If it has YAML front matter, use it. If not, derive the metadata:
- **title**: use the first `# heading` in the file
- **date**: use today's date in `YYYY-MM-DD` format
- **path**: derive from the filename as `/<kebab-case-slug>` (strip the `.md` extension)
- **excerpt**: use the first paragraph of body text, truncated to ~200 characters
- **featured**: set to `true`

### 2. Determine the post slug

The slug is the filename of `$0` without the `.md` extension. Use it for:
- The post file: `posts/<slug>.md`
- The image directory: `public/images/<slug>/`
- The front matter `path`: `/<slug>`

### 3. Create the image directory and copy the image

```sh
mkdir -p public/images/<slug>
cp <image-file> public/images/<slug>/<slug>.jpg
```

If the source image is a PNG, keep the `.png` extension instead.

### 4. Optimize the image

```sh
bun run optimize-images public/images/<slug>/<slug>.jpg
```

This generates WebP, AVIF, and responsive variants automatically.

### 5. Write the post file

Write `posts/<slug>.md` with the following format:

```markdown
---
title: "<title>"
date: "<YYYY-MM-DD>"
path: "/<slug>"
excerpt: "<excerpt>"
feature_image: "/images/<slug>/<slug>.jpg"
featured: true
---

<body content here, without the original # heading>
```

The `feature_image` path must match the image copied in step 3.

### 6. Regenerate the sitemap

```sh
bun run sitemap
```

### 7. Report

Confirm the post was created and list:
- Post file path
- Image directory path
- Number of image variants generated
- Updated sitemap URL count
