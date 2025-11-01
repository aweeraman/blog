import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Post } from '../types/post';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (posts.length === 0) return null;

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % posts.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % posts.length);
        setTimeout(() => setIsTransitioning(false), 700);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length, isTransitioning]);

  return (
    <section className="mb-12 md:mb-16 overflow-hidden">
      <div className="relative overflow-hidden rounded-lg border-2 border-theme-accent-primary/30">
        {/* Carousel container with parallax sliding animation */}
        <div className="relative min-h-[450px] sm:min-h-[420px] md:min-h-[440px] overflow-hidden">
          {posts.map((post, index) => {
            const { frontmatter } = post;
            const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            const isActive = index === currentIndex;
            const offset = index - currentIndex;

            return (
              <article
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={{
                  transform: `translateX(${offset * 100}%)`,
                }}
              >
                {/* Background image layer with slower parallax movement */}
                {frontmatter.feature_image && (
                  <div
                    className="absolute inset-0 transition-transform duration-1000 ease-in-out"
                    style={{
                      backgroundImage: `url(${frontmatter.feature_image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: `translateX(${offset * 30}%) scale(1.1)`,
                    }}
                  />
                )}

                {/* Enhanced radial transparency overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-theme-bg-secondary/80 via-theme-bg-secondary/85 to-theme-bg-secondary/90"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent_0%,rgba(17,24,39,0.3)_40%,rgba(17,24,39,0.7)_100%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,transparent_0%,rgba(17,24,39,0.5)_50%)]"></div>

                {/* Featured badge - responsive positioning */}
                <div className="absolute top-4 left-4 sm:top-auto sm:left-auto sm:bottom-24 sm:right-20 md:right-24 z-20">
                  <div className="bg-theme-accent-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Featured
                  </div>
                </div>

                {/* Content layer with faster parallax movement */}
                <div
                  className="relative z-10 h-full flex flex-col justify-center px-6 sm:pl-20 sm:pr-8 md:pl-24 md:pr-10 lg:pr-12 pb-24 pt-20 sm:pt-24 transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(${offset * 105}%)`,
                  }}
                >
                  <Link to={frontmatter.path} className="block group">
                    <div className="max-w-3xl mt-2">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-theme-accent-primary mb-4 md:mb-5 group-hover:text-theme-accent-hover transition-colors tracking-tight leading-tight">
                        {frontmatter.title}
                      </h3>
                      <time className="text-sm md:text-base text-theme-text-tertiary block tracking-wide font-medium mb-6 md:mb-8 uppercase">
                        {formattedDate}
                      </time>
                      {frontmatter.excerpt && (
                        <p className="text-sm sm:text-base md:text-lg text-theme-text-secondary leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-2xl drop-shadow-sm">
                          {frontmatter.excerpt}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-2 text-theme-accent-primary bg-theme-accent-primary/10 hover:bg-theme-accent-primary hover:text-white font-bold text-sm sm:text-base md:text-lg px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all shadow-md group-hover:shadow-lg group-hover:scale-105">
                        Read more
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation controls positioned at bottom to not block content */}
        {posts.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-8">
            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="p-2 md:p-3 bg-theme-bg-secondary/90 hover:bg-theme-accent-primary text-theme-text-tertiary hover:text-white rounded-full transition-all shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous featured post"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-8 md:w-10 h-2 bg-theme-accent-primary'
                      : 'w-2 h-2 bg-theme-border-primary hover:bg-theme-text-tertiary'
                  } rounded-full disabled:cursor-not-allowed`}
                  aria-label={`Go to featured post ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="p-2 md:p-3 bg-theme-bg-secondary/90 hover:bg-theme-accent-primary text-theme-text-tertiary hover:text-white rounded-full transition-all shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next featured post"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
