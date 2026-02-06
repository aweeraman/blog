import type { Post } from '../types/post';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-theme-text-primary mb-6">You might also enjoy</h3>
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
              className="group block p-4 -m-0 rounded-xl bg-theme-bg-secondary/30 border border-theme-border-secondary/30 hover:bg-theme-bg-secondary/60 hover:border-theme-border-primary/50 transition-all duration-300"
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
