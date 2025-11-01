# SEO Optimization Plan

## 🎯 SEO OPTIMIZATION PLAN

### **Current State Assessment**
- **SEO Score**: 2/10 ⚠️
- **Critical Issues**: Pure CSR, no meta tags, no sitemap, 800KB bundle, no image optimization
- **Content**: 60 blog posts + 1 page (bio)
- **Tech Stack**: Vite + React 19 + React Router + TailwindCSS

---

## 📋 **PRIORITY 1: IMMEDIATE WINS** (High Impact, Low Effort)

### **1.1 Dynamic Meta Tags with React Helmet Async**
**Impact**: 🔥🔥🔥🔥🔥 | **Effort**: ⭐⭐
**Goal**: Each page gets unique title, description, OG tags, Twitter cards

**Implementation**:
- Install `react-helmet-async`
- Create `<SEO>` component with props for title, description, image, url
- Add to Home, PostDetail, Page components
- Include Open Graph, Twitter Card, canonical URL tags

**Expected Results**:
- Proper social media sharing previews
- Better click-through rates from search results
- Unique titles/descriptions per page

---

### **1.2 Generate Static Sitemap**
**Impact**: 🔥🔥🔥🔥 | **Effort**: ⭐⭐
**Goal**: Help search engines discover all 60+ posts efficiently

**Implementation**:
- Create build script to generate sitemap.xml from markdown files
- Include all posts, pages, and paginated routes
- Add lastmod dates from post frontmatter
- Place in public/ folder

**Format**:
```xml
<url>
  <loc>https://yoursite.com/post-slug</loc>
  <lastmod>2025-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

### **1.3 Create robots.txt**
**Impact**: 🔥🔥🔥 | **Effort**: ⭐
**Goal**: Guide search engine crawlers

**Implementation**:
```txt
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml

# Optimize crawl budget
Disallow: /page/1$  # Duplicate of homepage
```

---

### **1.4 Add Structured Data (JSON-LD)**
**Impact**: 🔥🔥🔥🔥 | **Effort**: ⭐⭐
**Goal**: Rich snippets in search results (author, date, article markup)

**Implementation**:
- Add `BlogPosting` schema to PostDetail
- Add `Person` schema to bio page
- Add `WebSite` schema with search action to homepage
- Add `BreadcrumbList` for navigation

**Example for blog posts**:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2025-01-15",
  "author": {
    "@type": "Person",
    "name": "Anuradha Weeraman"
  },
  "image": "https://yoursite.com/images/post.jpg"
}
```

---

### **1.5 Optimize Images**
**Impact**: 🔥🔥🔥🔥 | **Effort**: ⭐⭐⭐
**Goal**: Faster load times, better Core Web Vitals

**Implementation**:
- Add `loading="lazy"` to all images
- Add proper `alt` attributes
- Use `vite-plugin-imagetools` for WebP conversion
- Add responsive images with `srcset`
- Compress existing images (TinyPNG/Squoosh)

---

## 📋 **PRIORITY 2: CRITICAL IMPROVEMENTS** (High Impact, Medium Effort)

### **2.1 Pre-rendering for Static Pages**
**Impact**: 🔥🔥🔥🔥🔥 | **Effort**: ⭐⭐⭐⭐
**Goal**: Search engines see full HTML content immediately

**Options**:
1. **vite-plugin-ssr** (now Vike) - Add SSR/SSG to Vite
2. **vite-plugin-prerender** - Simple static prerendering
3. **prerender-spa-plugin** - Webpack alternative for Vite

**Recommended**: Use **vite-plugin-prerender** for simplicity

**Benefits**:
- Generates static HTML for all 60+ posts at build time
- Search engines see full content immediately
- No runtime performance penalty
- Faster First Contentful Paint (FCP)

---

### **2.2 Bundle Optimization**
**Impact**: 🔥🔥🔥🔥 | **Effort**: ⭐⭐⭐
**Goal**: Reduce 800KB JS bundle, improve Core Web Vitals

**Implementation**:
- **Code splitting**: Lazy load PostDetail and Page components
- **Route-based splitting**: Use React.lazy() with Suspense
- **Markdown optimization**: Don't bundle all 60 posts eagerly
- **Tree shaking**: Ensure unused code is removed
- **Analyze bundle**: Use `rollup-plugin-visualizer`

**Before**: 800KB (all posts loaded upfront)
**After Target**: <200KB initial + lazy-loaded posts

---

### **2.3 Canonical URLs & URL Management**
**Impact**: 🔥🔥🔥 | **Effort**: ⭐⭐
**Goal**: Prevent duplicate content issues

**Implementation**:
- Add canonical tag to all pages via Helmet
- Handle trailing slashes consistently
- Redirect `/page/1` to `/` (homepage)
- Add proper pagination rel="prev/next" tags

---

### **2.4 Performance Monitoring**
**Impact**: 🔥🔥🔥🔥 | **Effort**: ⭐⭐
**Goal**: Track Core Web Vitals

**Implementation**:
- Add `web-vitals` package
- Send metrics to analytics (Google Analytics 4)
- Monitor LCP, FID, CLS scores
- Set up Lighthouse CI in GitHub Actions

---

## 📋 **PRIORITY 3: ADVANCED OPTIMIZATIONS** (Medium Impact, Higher Effort)

### **3.1 Self-host Fonts**
**Impact**: 🔥🔥🔥 | **Effort**: ⭐⭐
- Download Inter & JetBrains Mono fonts
- Use `@fontsource` packages
- Eliminate external Google Fonts requests
- Improve LCP by 200-500ms

---

### **3.2 Service Worker & PWA**
**Impact**: 🔥🔥 | **Effort**: ⭐⭐⭐⭐
- Add Workbox for caching strategies
- Offline reading capability
- Faster repeat visits
- Add manifest.json for installability

---

### **3.3 RSS Feed**
**Impact**: 🔥🔥 | **Effort**: ⭐⭐
- Generate RSS/Atom feed at build time
- Include full post content
- Better for feed readers and discovery

---

### **3.4 Internal Linking Strategy**
**Impact**: 🔥🔥🔥 | **Effort**: ⭐⭐
- Add related posts section
- Implement tag/category system
- Add breadcrumbs
- Link between posts strategically

---

### **3.5 Consider SSG Framework Migration** (Optional Long-term)
**Impact**: 🔥🔥🔥🔥🔥 | **Effort**: ⭐⭐⭐⭐⭐⭐

**If you need maximum SEO**:
- **Astro**: Best for content-heavy sites (recommended for blogs)
- **Next.js**: Full-featured React framework with SSG/SSR
- **Remix**: Modern routing + SSR

**Why Astro is ideal for your blog**:
- Generates fully static HTML
- Partial hydration (only interactive parts load JS)
- Native markdown support
- Would reduce your bundle from 800KB to ~50KB
- Perfect Lighthouse scores

---

## 📊 **IMPLEMENTATION ROADMAP**

### **Week 1: Quick Wins**
✅ Install react-helmet-async
✅ Create SEO component
✅ Add meta tags to all pages
✅ Create robots.txt
✅ Generate sitemap.xml
✅ Add structured data (JSON-LD)

### **Week 2: Performance**
✅ Implement image lazy loading
✅ Optimize and compress images
✅ Add bundle analyzer
✅ Implement code splitting
✅ Lazy load route components

### **Week 3: Pre-rendering**
✅ Install vite-plugin-prerender
✅ Configure prerendering for all posts
✅ Test pre-rendered output
✅ Deploy and verify

### **Week 4: Advanced**
✅ Self-host fonts
✅ Add canonical URLs
✅ Implement RSS feed
✅ Set up analytics & monitoring
✅ Lighthouse CI automation

---

## 🎯 **EXPECTED OUTCOMES**

### **Before** (Current):
- Google PageSpeed: ~60-70
- Lighthouse SEO: 50-60/100
- Search visibility: Poor (empty HTML shell)
- Social sharing: Broken previews

### **After** (All optimizations):
- Google PageSpeed: 90-95+
- Lighthouse SEO: 95-100/100
- Search visibility: Excellent (full pre-rendered content)
- Social sharing: Perfect OG previews
- Bundle size: 800KB → ~150-200KB
- FCP: Improved by 1-2 seconds
- LCP: <2.5s (good Core Web Vitals)

---

## 🚀 **RECOMMENDED STARTING POINT**

**Start with Priority 1 (Immediate Wins)**, which will give you:
- ✅ Proper meta tags and social sharing
- ✅ Sitemap for search engines
- ✅ Structured data for rich snippets
- ✅ Basic image optimization

These can be done in **1-2 days** and will provide **70% of the SEO benefit**.

---

## 📝 **DETAILED CODEBASE ANALYSIS**

### **Build Tool**
- **Vite** (version 7.1.7)
- Config: `vite.config.ts`
- Preview server: port 8000
- Buffer polyfill configured for gray-matter

### **Routing**
- **React Router DOM** (v7.9.5)
- Routes: `/`, `/page/:page`, `/:slug`
- SlugRouter checks pages first, then posts

### **Current HTML Structure**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anuradha Weeraman</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### **Critical SEO Gaps**
1. No meta description
2. No Open Graph tags
3. No Twitter Card tags
4. No canonical URLs
5. Static title (doesn't change per page)
6. No structured data (JSON-LD)
7. No favicon links
8. No robots meta tags

### **Content Management**
- **60 blog posts** in `/posts/`
- **1 page** (bio.md) in `/pages/`
- Posts loaded with `import.meta.glob('../../posts/*.md', { query: '?raw', import: 'default', eager: true })`
- Frontmatter parsed with gray-matter

### **Post Frontmatter Structure**
```typescript
interface PostFrontmatter {
  title: string;
  date: string;
  path: string;
  excerpt?: string;
  feature_image?: string;
  featured?: boolean;
}
```

### **Component Structure**
```
src/
├── App.tsx (Router)
├── main.tsx (Entry)
├── config.ts (POSTS_PER_PAGE = 12)
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FeaturedPosts.tsx
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   ├── Pagination.tsx
│   └── ScrollToTop.tsx
├── pages/
│   ├── Home.tsx
│   ├── PostDetail.tsx
│   ├── Page.tsx
│   └── SlugRouter.tsx
└── utils/
    ├── posts.ts
    └── pages.ts
```

### **Images**
- Location: `/public/images/`
- Currently unoptimized
- No lazy loading
- No responsive images
- No WebP conversion

### **Performance**
- Current bundle: ~800KB JS
- All markdown content bundled eagerly
- No code splitting beyond Vite defaults
- Google Fonts loaded externally
