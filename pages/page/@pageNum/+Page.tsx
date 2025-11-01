import { useState } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { getAllPosts, paginatePosts, filterPosts } from '../../../src/utils/posts';
import { PostList } from '../../../src/components/PostList';
import { Header } from '../../../src/components/Header';
import { Footer } from '../../../src/components/Footer';
import { POSTS_PER_PAGE } from '../../../src/config';

export default function Page() {
  const pageContext = usePageContext();
  const { pageNum } = pageContext.routeParams;
  const currentPage = parseInt(pageNum, 10);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all posts and filter based on search query
  const allPosts = getAllPosts();
  const filteredPosts = filterPosts(allPosts, searchQuery);
  const { posts, totalPages } = paginatePosts(filteredPosts, currentPage, POSTS_PER_PAGE);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const getTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}" | Anuradha Weeraman`;
    }
    return `Blog - Page ${currentPage} | Anuradha Weeraman`;
  };

  const getDescription = () => {
    if (searchQuery) {
      return `Found ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} for "${searchQuery}"`;
    }
    return 'Personal blog and technical writings covering software development, systems programming, and technology.';
  };

  return (
    <div className="min-h-screen bg-theme-bg-primary flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <main className="max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex-1 pb-8 md:pb-12">
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

      <Footer />
    </div>
  );
}
