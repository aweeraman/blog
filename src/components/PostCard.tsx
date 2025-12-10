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
    <article className="group">
      <a href={frontmatter.path} className="block" aria-label={`Read article: ${frontmatter.title}`}>
        <time className="text-base text-theme-text-tertiary block mb-2">{formattedDate}</time>
        <h2 className="text-xl sm:text-2xl font-semibold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors leading-snug mb-3">
          {frontmatter.title}
        </h2>
        {frontmatter.excerpt && (
          <p className="text-base sm:text-lg text-theme-text-tertiary leading-relaxed line-clamp-2">{frontmatter.excerpt}</p>
        )}
      </a>
    </article>
  );
}
