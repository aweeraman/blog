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
    <article className="group relative h-full">
      <a
        href={frontmatter.path}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-theme-border-secondary bg-theme-bg-secondary/25 transition duration-300 hover:-translate-y-0.5 hover:border-theme-border-primary hover:bg-theme-bg-secondary/60"
        aria-label={`Read article: ${frontmatter.title}`}
      >
        {frontmatter.feature_image && (
          <div className="aspect-[16/8] overflow-hidden bg-theme-bg-tertiary">
            <img
              src={frontmatter.feature_image}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <time className="text-xs font-semibold uppercase tracking-[0.12em] text-theme-text-tertiary">{formattedDate}</time>
              <span className="text-theme-text-tertiary/40">·</span>
              <span className="text-xs font-medium text-theme-text-tertiary">{readingTime} min read</span>
            </div>
            <h3 className="font-editorial text-xl font-semibold leading-snug text-theme-text-primary transition-colors duration-300 group-hover:text-theme-accent-hover sm:text-2xl">
              {frontmatter.title}
            </h3>
            {frontmatter.excerpt && (
              <p className="font-editorial mt-3 line-clamp-3 text-sm leading-relaxed text-theme-text-tertiary transition-colors duration-300 group-hover:text-theme-text-secondary sm:text-base">{frontmatter.excerpt}</p>
            )}
            <span className="mt-auto pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-theme-accent-primary">Read article →</span>
        </div>
      </a>
    </article>
  );
}
