import { useParams } from 'react-router-dom';
import { getAllPosts, paginatePosts } from '../utils/posts';
import { PostList } from '../components/PostList';
import { Header } from '../components/Header';
import { POSTS_PER_PAGE } from '../config';

export function Home() {
  const { page } = useParams<{ page?: string }>();
  const currentPage = page ? parseInt(page, 10) : 1;

  const allPosts = getAllPosts();
  const { posts, totalPages } = paginatePosts(allPosts, currentPage, POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-theme-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Header />

        <main>
          <PostList posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </main>
      </div>
    </div>
  );
}
