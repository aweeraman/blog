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
    <div className="min-h-screen bg-theme-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-theme-text-primary mb-2">My Blog</h1>
          <p className="text-theme-text-tertiary">A simple blog built with React, TypeScript, and Vite</p>
        </header>

        <main>
          <PostList posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </main>
      </div>
    </div>
  );
}
