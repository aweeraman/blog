import type { Post } from '../types/post';
import { PostCard } from './PostCard';
import { Pagination } from './Pagination';

interface PostListProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}

export function PostList({ posts, currentPage, totalPages }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-theme-text-tertiary">No posts found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7 flex items-end justify-between gap-4 pt-12 sm:pt-16">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent-hover">Ideas &amp; field notes</p>
          <h2 className="font-display text-3xl font-normal text-theme-text-primary sm:text-4xl">
            {currentPage === 1 ? 'Latest writing' : 'Writing archive'}
          </h2>
        </div>
        <span className="hidden text-sm text-theme-text-tertiary sm:block">Essays on AI, systems, and engineering</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post.slug}>
            <PostCard post={post} currentPage={currentPage} />
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
