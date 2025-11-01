import { Link } from 'react-router-dom';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  currentPage?: number;
}

export function PostCard({ post, currentPage = 1 }: PostCardProps) {
  const { frontmatter } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      className="relative border border-theme-border-primary rounded-lg p-4 sm:p-5 md:p-6 hover:shadow-lg hover:shadow-black/20 transition-all hover:border-theme-border-secondary overflow-hidden group h-full min-h-[280px] sm:min-h-[300px]"
      style={frontmatter.feature_image ? {
        backgroundImage: `url(${frontmatter.feature_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {/* Overlay for readability with radial transparency */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-bg-secondary/70 via-theme-bg-secondary/85 to-theme-bg-secondary/95 group-hover:from-theme-bg-secondary/65 group-hover:via-theme-bg-secondary/80 group-hover:to-theme-bg-secondary/90 transition-all"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,24,39,0.4)_70%)]"></div>

      <Link to={frontmatter.path} state={{ fromPage: currentPage }} className="block relative z-10 h-full flex flex-col">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-extrabold text-theme-accent-primary mb-2 md:mb-3 hover:text-theme-accent-hover transition-colors tracking-tight leading-tight">
          {frontmatter.title}
        </h2>
        <time className="text-xs sm:text-sm text-theme-text-tertiary mb-2 md:mb-3 block tracking-wide font-medium">{formattedDate}</time>
        {frontmatter.excerpt && (
          <p className="text-sm sm:text-base text-theme-text-secondary leading-relaxed line-clamp-3">{frontmatter.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
