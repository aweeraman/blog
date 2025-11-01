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
      className="relative border border-theme-border-primary rounded-lg p-6 hover:shadow-lg hover:shadow-black/20 transition-all hover:border-theme-border-secondary overflow-hidden group"
      style={frontmatter.feature_image ? {
        backgroundImage: `url(${frontmatter.feature_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-theme-bg-secondary/85 group-hover:bg-theme-bg-secondary/80 transition-colors"></div>

      <Link to={frontmatter.path} state={{ fromPage: currentPage }} className="block relative z-10">
        <h2 className="text-2xl font-extrabold text-theme-accent-primary mb-3 hover:text-theme-accent-hover transition-colors tracking-tight leading-tight">
          {frontmatter.title}
        </h2>
        <time className="text-sm text-theme-text-tertiary mb-3 block tracking-wide font-medium">{formattedDate}</time>
        {frontmatter.excerpt && (
          <p className="text-theme-text-secondary leading-relaxed">{frontmatter.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
