import type { PageContextServer } from 'vike/types';
import { getAllPosts } from '../../src/utils/posts';
import { getAllPages } from '../../src/utils/pages';

export function onBeforePrerenderStart() {
  const posts = getAllPosts();
  const pages = getAllPages();

  // Return URLs for all posts and pages
  const urls = [
    ...posts.map(post => `/${post.slug}`),
    ...pages.map(page => `/${page.slug}`)
  ];

  return urls;
}

export async function data(pageContext: PageContextServer) {
  // This runs for each pre-rendered page
  return {};
}
