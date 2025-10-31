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
    <article className="border border-theme-border-primary rounded-lg p-6 hover:shadow-lg hover:shadow-black/20 transition-all hover:border-theme-border-secondary bg-theme-bg-secondary/50">
      <Link to={frontmatter.path} state={{ fromPage: currentPage }} className="block">
        <h2 className="text-2xl font-bold text-theme-text-primary mb-2 hover:text-theme-accent-primary transition-colors">
          {frontmatter.title}
        </h2>
        <time className="text-sm text-theme-text-tertiary mb-3 block">{formattedDate}</time>
        {frontmatter.excerpt && (
          <p className="text-theme-text-secondary leading-relaxed">{frontmatter.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
