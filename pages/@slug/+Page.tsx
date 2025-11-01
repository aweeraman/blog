import { Suspense, useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { getPostBySlug, getAdjacentPosts } from '../../src/utils/posts';
import { getPageBySlug } from '../../src/utils/pages';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { MarkdownRenderer } from '../../src/components/MarkdownRenderer';

export default function Page() {
  const pageContext = usePageContext();
  const { slug } = pageContext.routeParams;

  // Try to get post first, then page
  const post = getPostBySlug(slug);
  const page = !post ? getPageBySlug(slug) : null;

  // Update document title when navigating between posts/pages
  useEffect(() => {
    if (post) {
      document.title = `${post.frontmatter.title} | Anuradha Weeraman`;
    } else if (page) {
      document.title = `${page.frontmatter.title} | Anuradha Weeraman`;
    } else {
      document.title = 'Not Found | Anuradha Weeraman';
    }
  }, [slug, post, page]);

  // If neither exists, show 404
  if (!post && !page) {
    return (
      <div className="min-h-screen bg-theme-bg-primary flex flex-col">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex-1 pb-8 md:pb-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme-text-primary mb-3 md:mb-4">Not Found</h1>
            <p className="text-sm sm:text-base text-theme-text-secondary mb-4 md:mb-6">The content you're looking for doesn't exist.</p>
            <a
              href="/"
              className="text-sm sm:text-base text-theme-accent-primary hover:text-theme-accent-hover underline cursor-pointer"
              aria-label="Return to homepage"
            >
              Go back to home
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Render post
  if (post) {
    const { frontmatter, content } = post;
    const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const { previous, next } = getAdjacentPosts(slug);
    const description = frontmatter.excerpt || content.slice(0, 160).replace(/[#*\[\]]/g, '').trim();

    return (
      <div className="min-h-screen bg-theme-bg-primary flex flex-col">
        <Header />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex-1 pb-8 md:pb-12">
          <a
            href="/"
            className="text-xs sm:text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-2 md:mb-3 inline-flex items-center gap-1.5 group"
            aria-label="Back to homepage"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </a>

          {(previous || next) && (
            <nav className="mb-4 md:mb-6" aria-label="Post navigation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {previous && (
                  <a
                    href={`/${previous.slug}`}
                    className="group block p-3 sm:p-4 rounded-lg bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors border border-theme-border-primary"
                    aria-label={`Previous post: ${previous.frontmatter.title}`}
                  >
                    <div className="text-xs sm:text-sm text-theme-text-tertiary mb-1.5 sm:mb-2">← Previous</div>
                    <div className="text-sm sm:text-base text-theme-accent-primary group-hover:text-theme-accent-hover font-medium line-clamp-2">
                      {previous.frontmatter.title}
                    </div>
                  </a>
                )}
                {next && (
                  <a
                    href={`/${next.slug}`}
                    className={`group block p-3 sm:p-4 rounded-lg bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors border border-theme-border-primary ${!previous ? 'md:col-start-2' : ''}`}
                    aria-label={`Next post: ${next.frontmatter.title}`}
                  >
                    <div className="text-xs sm:text-sm text-theme-text-tertiary mb-1.5 sm:mb-2 text-right">Next →</div>
                    <div className="text-sm sm:text-base text-theme-accent-primary group-hover:text-theme-accent-hover font-medium text-right line-clamp-2">
                      {next.frontmatter.title}
                    </div>
                  </a>
                )}
              </div>
            </nav>
          )}

          <article className="bg-theme-bg-secondary rounded-lg shadow-lg shadow-black/20 overflow-hidden">
            <header className="p-4 sm:p-5 md:p-6 pb-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-theme-accent-primary mb-2 md:mb-3 tracking-tight leading-tight">{frontmatter.title}</h1>
              <time className="text-sm sm:text-base text-theme-text-tertiary tracking-wide font-medium uppercase">{formattedDate}</time>
            </header>

            {frontmatter.feature_image && (
              <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5">
                <img
                  src={frontmatter.feature_image}
                  alt={frontmatter.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            <MarkdownRenderer
              content={content}
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none p-4 sm:p-6 md:p-8"
            />

            {(previous || next) && (
              <nav className="border-t border-theme-border-primary p-4 sm:p-6 md:p-8" aria-label="Additional post navigation">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  {previous && (
                    <a
                      href={`/${previous.slug}`}
                      className="group block p-3 sm:p-4 rounded-lg bg-theme-bg-tertiary hover:bg-theme-bg-primary transition-colors"
                      aria-label={`Previous post: ${previous.frontmatter.title}`}
                    >
                      <div className="text-xs sm:text-sm text-theme-text-tertiary mb-1.5 sm:mb-2">← Previous</div>
                      <div className="text-sm sm:text-base text-theme-accent-primary group-hover:text-theme-accent-hover font-medium line-clamp-2">
                        {previous.frontmatter.title}
                      </div>
                    </a>
                  )}
                  {next && (
                    <a
                      href={`/${next.slug}`}
                      className={`group block p-3 sm:p-4 rounded-lg bg-theme-bg-tertiary hover:bg-theme-bg-primary transition-colors ${!previous ? 'md:col-start-2' : ''}`}
                      aria-label={`Next post: ${next.frontmatter.title}`}
                    >
                      <div className="text-xs sm:text-sm text-theme-text-tertiary mb-1.5 sm:mb-2 text-right">Next →</div>
                      <div className="text-sm sm:text-base text-theme-accent-primary group-hover:text-theme-accent-hover font-medium text-right line-clamp-2">
                        {next.frontmatter.title}
                      </div>
                    </a>
                  )}
                </div>
              </nav>
            )}
          </article>
        </div>
        <Footer />
      </div>
    );
  }

  // Render page
  if (page) {
    const { frontmatter, content } = page;
    const description = content.slice(0, 160).replace(/[#*\[\]]/g, '').trim();

    return (
      <div className="min-h-screen bg-theme-bg-primary flex flex-col">
        <Header />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex-1 pb-8 md:pb-12">
          <a
            href="/"
            className="text-xs sm:text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-2 md:mb-3 inline-flex items-center gap-1.5 group"
            aria-label="Back to homepage"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </a>

          <article className="bg-theme-bg-secondary rounded-lg shadow-lg shadow-black/20 overflow-hidden">
            <header className="p-4 sm:p-5 md:p-6 pb-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-theme-accent-primary mb-0 tracking-tight leading-tight">{frontmatter.title}</h1>
            </header>

            <MarkdownRenderer
              content={content}
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none px-4 sm:px-6 md:px-8 pt-0 pb-4 sm:pb-6 md:pb-8 [&>*:first-child]:mt-2 [&>*:first-child]:sm:mt-3 [&>*:first-child]:md:mt-4"
            />
          </article>
        </div>
        <Footer />
      </div>
    );
  }

  return null;
}
