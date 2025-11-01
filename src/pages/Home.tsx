import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getAllPosts, paginatePosts, filterPosts } from '../utils/posts';
import { PostList } from '../components/PostList';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { POSTS_PER_PAGE } from '../config';

export function Home() {
  const { page } = useParams<{ page?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = page ? parseInt(page, 10) : 1;

  // Get search query from URL
  const searchQuery = searchParams.get('q') || '';

  // Get all posts and filter based on search query
  const allPosts = getAllPosts();
  const filteredPosts = filterPosts(allPosts, searchQuery);
  const { posts, totalPages } = paginatePosts(filteredPosts, currentPage, POSTS_PER_PAGE);

  const handleSearchChange = (query: string) => {
    // Update URL search params
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
    // Reset to page 1 when search changes
    if (currentPage !== 1) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg-primary flex flex-col">
      <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 flex-1">
        <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        <main>
          {searchQuery && (
            <div className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base text-theme-text-secondary">
              {filteredPosts.length === 0 ? (
                <p>No posts found for "{searchQuery}"</p>
              ) : (
                <p>Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
              )}
            </div>
          )}
          <PostList posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
