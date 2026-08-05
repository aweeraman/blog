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
  const displayPage = searchQuery ? 1 : currentPage;
  const { posts, totalPages } = paginatePosts(filteredPosts, displayPage, POSTS_PER_PAGE);

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

      <main className="page-enter mx-auto w-full max-w-6xl flex-1 px-5 pb-12 sm:px-8">
        {searchQuery && (
          <div className="mb-6 text-sm text-theme-text-tertiary">
            {filteredPosts.length === 0 ? (
              <p>No posts found for "{searchQuery}"</p>
            ) : (
              <p>Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
            )}
          </div>
        )}

        <PostList posts={posts} currentPage={displayPage} totalPages={totalPages} />
      </main>

      <Footer />
    </div>
  );
}
