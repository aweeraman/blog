import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://weeraman.com';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function generateSitemap(): string {
  const entries: SitemapEntry[] = [];

  // Add homepage
  entries.push({
    url: SITE_URL,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0,
  });

  // Add blog posts
  const postsDir = path.join(process.cwd(), 'posts');
  const postFiles = getAllMarkdownFiles(postsDir);

  for (const file of postFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);

    if (data.path && data.date) {
      const slug = data.path.replace(/^\//, '');
      entries.push({
        url: `${SITE_URL}/${slug}`,
        lastmod: new Date(data.date).toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Add static pages
  const pagesDir = path.join(process.cwd(), 'pages');
  if (fs.existsSync(pagesDir)) {
    const pageFiles = getAllMarkdownFiles(pagesDir);

    for (const file of pageFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const { data } = matter(content);

      if (data.slug) {
        entries.push({
          url: `${SITE_URL}/${data.slug}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.7,
        });
      }
    }
  }

  // Add TSX-based pages (not markdown)
  const tsxPages = ['speaking'];
  for (const page of tsxPages) {
    entries.push({
      url: `${SITE_URL}/${page}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  // Add pagination pages
  const POSTS_PER_PAGE = 12;
  const totalPages = Math.ceil(postFiles.length / POSTS_PER_PAGE);

  for (let i = 2; i <= totalPages; i++) {
    entries.push({
      url: `${SITE_URL}/page/${i}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 0.6,
    });
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}

// Generate and save sitemap
const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemap);
console.log(`✓ Sitemap generated at ${outputPath}`);
console.log(`  Total URLs: ${sitemap.split('<url>').length - 1}`);
