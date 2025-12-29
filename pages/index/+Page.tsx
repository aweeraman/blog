import { useState } from 'react';
import { getAllPosts, paginatePosts, filterPosts, getFeaturedPosts } from '../../src/utils/posts';
import { PostList } from '../../src/components/PostList';
import { FeaturedPosts } from '../../src/components/FeaturedPosts';
import { HeroSection } from '../../src/components/HeroSection';
import { BottomCTA } from '../../src/components/BottomCTA';
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

      <main className="max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-8 flex-1 py-8 sm:py-12">
        {searchQuery && (
          <div className="mb-6 text-sm text-theme-text-tertiary">
            {filteredPosts.length === 0 ? (
              <p>No posts found for "{searchQuery}"</p>
            ) : (
              <p>Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
            )}
          </div>
        )}

        {!searchQuery && <HeroSection />}

        <div id="writing">
          {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}

          <PostList posts={posts} currentPage={currentPage} totalPages={totalPages} />
        </div>
      </main>

      <BottomCTA />

      <Footer />
    </div>
  );
}
