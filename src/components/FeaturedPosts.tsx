import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types/post';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (posts.length === 0) return null;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  // Auto-advance every 6 seconds (paused on hover)
  useEffect(() => {
    if (isPaused || posts.length <= 1) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, posts.length, nextSlide]);

  const currentPost = posts[currentIndex];
  const { frontmatter } = currentPost;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section
      className="mb-12 sm:mb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <article className="group relative">
        <a href={frontmatter.path} className="block">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-theme-accent-primary uppercase tracking-wider">Featured</span>
            <span className="text-theme-text-tertiary">·</span>
            <time className="text-base text-theme-text-tertiary">{formattedDate}</time>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors leading-tight mb-4">
            {frontmatter.title}
          </h2>
          {frontmatter.excerpt && (
            <p className="text-lg sm:text-xl text-theme-text-secondary leading-relaxed max-w-2xl">
              {frontmatter.excerpt}
            </p>
          )}
        </a>
      </article>

      {/* Carousel controls */}
      {posts.length > 1 && (
        <div className="flex items-center gap-4 mt-8">
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="p-2 text-theme-text-tertiary hover:text-theme-accent-primary transition-colors"
            aria-label="Previous featured post"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'w-6 h-1.5 bg-theme-accent-primary'
                    : 'w-1.5 h-1.5 bg-theme-border-primary hover:bg-theme-text-tertiary'
                }`}
                aria-label={`Go to featured post ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-theme-text-tertiary hover:text-theme-accent-primary transition-colors"
            aria-label="Next featured post"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <span className="text-sm text-theme-text-tertiary ml-auto">
            {currentIndex + 1} / {posts.length}
          </span>
        </div>
      )}

      <div className="mt-10 sm:mt-12 border-b border-theme-border-secondary"></div>
    </section>
  );
}
