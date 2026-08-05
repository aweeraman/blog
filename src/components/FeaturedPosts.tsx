import type { Post } from '../types/post';

interface FeaturedPostsProps {
  posts: Post[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  const [primary, ...more] = posts;
  const { frontmatter } = primary;

  return (
    <section className="border-b border-theme-border-primary/70 py-12 sm:py-16" aria-labelledby="featured-heading">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent-hover">Selected work</p>
          <h2 id="featured-heading" className="font-brand-display text-3xl font-normal text-theme-text-primary sm:text-4xl">Featured writing</h2>
        </div>
        <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-theme-text-tertiary sm:block">From the archive</span>
      </div>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.85fr)]">
        <a href={frontmatter.path} className="group grid overflow-hidden rounded-2xl border border-theme-border-primary bg-theme-bg-secondary transition hover:-translate-y-0.5 hover:border-theme-accent-primary/50 sm:grid-cols-[1.05fr_1fr]">
          {frontmatter.feature_image && (
            <div className="aspect-[16/10] overflow-hidden bg-theme-bg-tertiary sm:aspect-auto sm:min-h-72">
              <img
                src={frontmatter.feature_image}
                alt={frontmatter.feature_image_alt || ''}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
              />
            </div>
          )}
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <time className="text-xs font-semibold uppercase tracking-[0.14em] text-theme-text-tertiary">{formatDate(frontmatter.date)}</time>
            <h3 className="font-brand-display mt-3 text-3xl font-normal leading-[1.05] text-theme-text-primary transition-colors group-hover:text-theme-accent-hover sm:text-4xl">
              {frontmatter.title}
            </h3>
            {frontmatter.excerpt && (
              <p className="font-editorial mt-4 line-clamp-3 text-base leading-relaxed text-theme-text-secondary">{frontmatter.excerpt}</p>
            )}
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-theme-accent-hover">
              Read article <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </div>
        </a>

        {more.length > 0 && (
          <div className="divide-y divide-theme-border-secondary rounded-2xl border border-theme-border-primary bg-theme-bg-secondary/40 px-5 sm:px-6">
            {more.slice(0, 3).map((post) => (
              <a key={post.slug} href={post.frontmatter.path} className="group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-5 first:pt-6 last:pb-6">
                {post.frontmatter.feature_image ? (
                  <div className="aspect-square overflow-hidden rounded-lg bg-theme-bg-tertiary">
                    <img
                      src={post.frontmatter.feature_image}
                      alt={post.frontmatter.feature_image_alt || ''}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg border border-theme-border-secondary bg-theme-bg-tertiary/50" aria-hidden="true" />
                )}
                <div className="min-w-0">
                  <time className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-theme-text-tertiary">{formatDate(post.frontmatter.date)}</time>
                  <h3 className="font-editorial mt-1.5 line-clamp-2 text-lg font-semibold leading-snug text-theme-text-primary transition-colors group-hover:text-theme-accent-hover">
                    {post.frontmatter.title}
                  </h3>
                  {post.frontmatter.excerpt && (
                    <p className="font-editorial mt-2 line-clamp-2 text-sm leading-relaxed text-theme-text-tertiary">
                      {post.frontmatter.excerpt}
                    </p>
                  )}
                  <span className="mt-3 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-theme-accent-primary">Read story →</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
