import { useParams } from 'react-router-dom';
import { getAllPosts, paginatePosts } from '../utils/posts';
import { PostList } from '../components/PostList';
import { POSTS_PER_PAGE } from '../config';

export function Home() {
  const { page } = useParams<{ page?: string }>();
  const currentPage = page ? parseInt(page, 10) : 1;

  const allPosts = getAllPosts();
  const { posts, totalPages } = paginatePosts(allPosts, currentPage, POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Blog</h1>
          <p className="text-gray-600">A simple blog built with React, TypeScript, and Vite</p>
        </header>

        <main>
          <PostList posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </main>
      </div>
    </div>
  );
}
