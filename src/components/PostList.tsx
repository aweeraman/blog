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
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No posts found. Add some markdown files to the posts/ directory.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} currentPage={currentPage} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
