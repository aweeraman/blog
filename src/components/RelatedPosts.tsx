import type { Post } from '../types/post';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-theme-accent-hover">Continue exploring</p>
      <h3 className="font-display mb-6 text-3xl font-normal text-theme-text-primary">Related writing</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => {
          const formattedDate = new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <a
              key={post.slug}
              href={post.frontmatter.path}
              className="group block rounded-xl border border-theme-border-secondary/60 bg-theme-bg-secondary/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-theme-border-primary hover:bg-theme-bg-secondary/60"
            >
              {post.frontmatter.feature_image && (
                <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                  <img
                    src={post.frontmatter.feature_image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              <time className="text-xs text-theme-text-tertiary font-medium tracking-wide uppercase">{formattedDate}</time>
              <h4 className="text-base font-semibold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors duration-300 leading-snug mt-1.5 line-clamp-2">
                {post.frontmatter.title}
              </h4>
            </a>
          );
        })}
      </div>
    </div>
  );
}
