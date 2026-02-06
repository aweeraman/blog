import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  currentPage?: number;
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter, content } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const readingTime = estimateReadingTime(content);

  return (
    <article className="group relative">
      <a
        href={frontmatter.path}
        className="block py-2 -mx-4 px-4 rounded-lg transition-all duration-300 ease-out hover:bg-theme-bg-secondary/50"
        aria-label={`Read article: ${frontmatter.title}`}
      >
        <div className="flex gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <time className="text-sm text-theme-text-tertiary font-medium tracking-wide uppercase">{formattedDate}</time>
              <span className="text-theme-text-tertiary/40">·</span>
              <span className="text-sm text-theme-text-tertiary font-medium">{readingTime} min read</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors duration-300 leading-snug mb-3">
              {frontmatter.title}
            </h2>
            {frontmatter.excerpt && (
              <p className="text-base sm:text-lg text-theme-text-tertiary leading-relaxed line-clamp-2 group-hover:text-theme-text-secondary transition-colors duration-300">{frontmatter.excerpt}</p>
            )}
          </div>
          {frontmatter.feature_image && (
            <div className="hidden sm:block flex-shrink-0 w-32 h-24 lg:w-40 lg:h-28 rounded-lg overflow-hidden self-center">
              <img
                src={frontmatter.feature_image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}
        </div>
        {/* Subtle arrow indicator on hover */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300 text-theme-accent-primary sm:hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </a>
    </article>
  );
}
