import { useParams } from 'react-router-dom';
import { getPageBySlug } from '../utils/pages';
import { Page } from './Page';
import { PostDetail } from './PostDetail';

/**
 * Routes to either a Page or PostDetail based on whether the slug
 * exists as a page first, then falls back to checking posts
 */
export function SlugRouter() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <PostDetail />;
  }

  // Check if this slug corresponds to a page first
  const page = getPageBySlug(slug);

  if (page) {
    return <Page />;
  }

  // Fall back to post detail
  return <PostDetail />;
}
