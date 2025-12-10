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
      <div className="divide-y divide-theme-border-secondary">
        {posts.map((post) => (
          <div key={post.slug} className="py-6 first:pt-0">
            <PostCard post={post} currentPage={currentPage} />
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
