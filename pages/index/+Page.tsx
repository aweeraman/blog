import { useState } from 'react';
import { getAllPosts, paginatePosts, filterPosts, getFeaturedPosts } from '../../src/utils/posts';
import { PostList } from '../../src/components/PostList';
import { FeaturedPosts } from '../../src/components/FeaturedPosts';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { POSTS_PER_PAGE } from '../../src/config';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const currentPage = 1;

  // Get all posts and filter based on search query
  const allPosts = getAllPosts();
  const filteredPosts = filterPosts(allPosts, searchQuery);
  const { posts, totalPages } = paginatePosts(filteredPosts, currentPage, POSTS_PER_PAGE);

  // Get featured posts (only show on first page and when not searching)
  const featuredPosts = !searchQuery ? getFeaturedPosts() : [];

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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

        {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}

        <PostList posts={posts} currentPage={currentPage} totalPages={totalPages} />
      </main>

      <Footer />
    </div>
  );
}
