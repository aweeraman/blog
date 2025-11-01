import type { PageContextServer } from 'vike/types';
import { getAllPosts } from '../../../src/utils/posts';
import { POSTS_PER_PAGE } from '../../../src/config';

export function onBeforePrerenderStart() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // Generate URLs for all pagination pages (excluding page 1, which is the index)
  const urls = [];
  for (let i = 2; i <= totalPages; i++) {
    urls.push(`/page/${i}`);
  }

  return urls;
}

export async function data(pageContext: PageContextServer) {
  // This runs for each pre-rendered page
  return {};
}
