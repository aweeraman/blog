import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  currentPage?: number;
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="group relative">
      <a
        href={frontmatter.path}
        className="block py-2 -mx-4 px-4 rounded-lg transition-all duration-300 ease-out hover:bg-theme-bg-secondary/50"
        aria-label={`Read article: ${frontmatter.title}`}
      >
        <time className="text-sm text-theme-text-tertiary block mb-2 font-medium tracking-wide uppercase">{formattedDate}</time>
        <h2 className="text-xl sm:text-2xl font-semibold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors duration-300 leading-snug mb-3">
          {frontmatter.title}
        </h2>
        {frontmatter.excerpt && (
          <p className="text-base sm:text-lg text-theme-text-tertiary leading-relaxed line-clamp-2 group-hover:text-theme-text-secondary transition-colors duration-300">{frontmatter.excerpt}</p>
        )}
        {/* Subtle arrow indicator on hover */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300 text-theme-accent-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </a>
    </article>
  );
}
