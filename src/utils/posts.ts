import { Buffer } from 'buffer';
import matter from 'gray-matter';
import type { Post, PostFrontmatter } from '../types/post';

// Make Buffer available globally for gray-matter
globalThis.Buffer = Buffer;

// Use Vite's import.meta.glob to import all markdown files
const postFiles = import.meta.glob('../../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const [path, content] of Object.entries(postFiles)) {
    const { data, content: markdownContent } = matter(content as string);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    posts.push({
      frontmatter: data as PostFrontmatter,
      content: markdownContent,
      slug,
    });
  }

  // Sort by date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function filterPosts(posts: Post[], searchQuery: string): Post[] {
  if (!searchQuery || searchQuery.trim() === '') {
    return posts;
  }

  const query = searchQuery.toLowerCase().trim();

  return posts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(query);
    const excerptMatch = post.frontmatter.excerpt?.toLowerCase().includes(query) || false;
    const contentMatch = post.content.toLowerCase().includes(query);

    return titleMatch || excerptMatch || contentMatch;
  });
}

export function paginatePosts(posts: Post[], page: number, postsPerPage: number) {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / postsPerPage),
    currentPage: page,
    totalPosts: posts.length,
  };
}

export function getAdjacentPosts(slug: string): { previous: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null, // Previous (newer) post
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null, // Next (older) post
  };
}
