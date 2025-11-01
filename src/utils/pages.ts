import { Buffer } from 'buffer';
import matter from 'gray-matter';
import type { Page, PageFrontmatter } from '../types/page';

// Make Buffer available globally for gray-matter
(globalThis as any).Buffer = Buffer;

// Use Vite's import.meta.glob to import all markdown files
const pageFiles = import.meta.glob('../../pages/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export function getAllPages(): Page[] {
  const pages: Page[] = [];

  for (const [path, content] of Object.entries(pageFiles)) {
    const { data, content: markdownContent } = matter(content as string);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    pages.push({
      frontmatter: data as PageFrontmatter,
      content: markdownContent,
      slug,
    });
  }

  return pages;
}

export function getPageBySlug(slug: string): Page | undefined {
  const pages = getAllPages();
  return pages.find((page) => page.slug === slug);
}
