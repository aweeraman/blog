import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Post } from '../types/post';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (posts.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const currentPost = posts[currentIndex];
  const { frontmatter } = currentPost;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="mb-12 md:mb-16">
      <div className="relative">
        {/* Main carousel slide */}
        <article
          className="relative border-2 border-theme-accent-primary/30 rounded-lg p-6 md:p-8 hover:shadow-xl hover:shadow-theme-accent-primary/10 transition-all hover:border-theme-accent-primary overflow-hidden group min-h-[340px] sm:min-h-[360px] md:min-h-[380px]"
          style={frontmatter.feature_image ? {
            backgroundImage: `url(${frontmatter.feature_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          {/* Featured badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-theme-accent-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Featured
            </div>
          </div>

          {/* Overlay for readability with radial transparency */}
          <div className="absolute inset-0 bg-gradient-to-br from-theme-bg-secondary/75 via-theme-bg-secondary/90 to-theme-bg-secondary/95 group-hover:from-theme-bg-secondary/70 group-hover:via-theme-bg-secondary/85 group-hover:to-theme-bg-secondary/90 transition-all"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,24,39,0.5)_70%)]"></div>

          <Link to={frontmatter.path} className="block relative z-10 h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-theme-accent-primary mb-3 md:mb-4 hover:text-theme-accent-hover transition-colors tracking-tight leading-tight">
                {frontmatter.title}
              </h3>
              <time className="text-sm md:text-base text-theme-text-tertiary block tracking-wide font-medium">{formattedDate}</time>
            </div>
            {frontmatter.excerpt && (
              <p className="text-sm md:text-base text-theme-text-secondary leading-relaxed mb-4">
                {frontmatter.excerpt}
              </p>
            )}
            <div className="flex items-center text-theme-accent-primary font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
              Read more
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Navigation arrows */}
          {posts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-theme-bg-secondary/80 hover:bg-theme-accent-primary text-theme-text-tertiary hover:text-white rounded-full transition-all shadow-lg backdrop-blur-sm"
                aria-label="Previous featured post"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-theme-bg-secondary/80 hover:bg-theme-accent-primary text-theme-text-tertiary hover:text-white rounded-full transition-all shadow-lg backdrop-blur-sm"
                aria-label="Next featured post"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </article>

        {/* Indicators */}
        {posts.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-8 md:w-10 h-2 bg-theme-accent-primary'
                    : 'w-2 h-2 bg-theme-border-primary hover:bg-theme-text-tertiary'
                } rounded-full`}
                aria-label={`Go to featured post ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
