import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types/post';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (posts.length === 0) return null;

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
      setIsTransitioning(false);
    }, 200);
  }, [posts.length]);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
      setIsTransitioning(false);
    }, 200);
  }, [posts.length]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

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
      <article className={`group relative transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <a href={frontmatter.path} className="block">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-accent-primary uppercase tracking-widest px-3 py-1 bg-theme-accent-primary/10 rounded-full border border-theme-accent-primary/20">
              <span className="w-1.5 h-1.5 bg-theme-accent-primary rounded-full animate-pulse"></span>
              Featured
            </span>
            <span className="text-theme-border-primary">|</span>
            <time className="text-sm text-theme-text-tertiary font-medium">{formattedDate}</time>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors duration-300 leading-tight mb-4">
            {frontmatter.title}
          </h2>
          {frontmatter.excerpt && (
            <p className="text-lg sm:text-xl text-theme-text-secondary leading-relaxed max-w-2xl group-hover:text-theme-text-primary/80 transition-colors duration-300">
              {frontmatter.excerpt}
            </p>
          )}
          {/* Read more indicator */}
          <span className="inline-flex items-center gap-2 mt-6 text-theme-accent-primary font-medium opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
            Read article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </a>
      </article>

      {/* Carousel controls */}
      {posts.length > 1 && (
        <div className="flex items-center gap-4 mt-10">
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="p-2.5 text-theme-text-tertiary hover:text-theme-accent-primary hover:bg-theme-bg-secondary/50 rounded-full transition-all duration-300"
            aria-label="Previous featured post"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-theme-accent-primary'
                    : 'w-2 h-2 bg-theme-border-primary hover:bg-theme-text-tertiary hover:scale-125'
                }`}
                aria-label={`Go to featured post ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2.5 text-theme-text-tertiary hover:text-theme-accent-primary hover:bg-theme-bg-secondary/50 rounded-full transition-all duration-300"
            aria-label="Next featured post"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <span className="text-xs text-theme-text-tertiary ml-auto font-medium tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}
          </span>
        </div>
      )}

      <div className="mt-12 sm:mt-14 border-b border-theme-border-secondary/50"></div>
    </section>
  );
}
