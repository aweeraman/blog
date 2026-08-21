import { useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { getPostBySlug, getAdjacentPosts, getRelatedPosts } from '../../src/utils/posts';
import { getPageBySlug } from '../../src/utils/pages';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { MarkdownRenderer } from '../../src/components/MarkdownRenderer';
import { GiscusComments } from '../../src/components/GiscusComments';
import { ScrollProgress } from '../../src/components/ScrollProgress';
import { AuthorBio } from '../../src/components/AuthorBio';
import { RelatedPosts } from '../../src/components/RelatedPosts';

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
    const relatedPosts = getRelatedPosts(slug, 3);

    return (
      <div className="min-h-screen bg-theme-bg-primary flex flex-col">
        <ScrollProgress />
        <Header />

        <main className="page-enter mx-auto w-full max-w-6xl flex-1 overflow-hidden px-5 py-8 sm:px-8 sm:py-12">
          <a
            href="/"
            className="text-base text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-10 inline-flex items-center gap-2 group"
            aria-label="Back to homepage"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>All posts</span>
          </a>

          <article>
            <header className="mx-auto mb-10 max-w-4xl sm:mb-12">
              <time dateTime={new Date(frontmatter.date).toISOString()} className="text-base text-theme-text-tertiary block mb-4">{formattedDate}</time>
              <h1 className="font-display break-words text-[1.25rem] font-normal leading-[1.02] tracking-tight text-theme-text-primary sm:text-[2rem] lg:text-[2.75rem]">{frontmatter.title}</h1>
            </header>

            {frontmatter.feature_image && (
              <figure className="mx-auto mb-10 max-w-3xl sm:mb-12">
                <img
                  src={frontmatter.feature_image}
                  alt={frontmatter.feature_image_alt || frontmatter.title}
                  className="h-auto w-full rounded-2xl border border-theme-border-secondary"
                />
                {frontmatter.feature_image_attribution && (
                  <figcaption className="mt-2 text-xs text-theme-text-tertiary text-right">
                    {frontmatter.feature_image_attribution_url ? (
                      <a
                        href={frontmatter.feature_image_attribution_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {frontmatter.feature_image_attribution}
                      </a>
                    ) : frontmatter.feature_image_attribution}
                    {frontmatter.feature_image_license && (
                      <>
                        {' · '}
                        {frontmatter.feature_image_license_url ? (
                          <a
                            href={frontmatter.feature_image_license_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {frontmatter.feature_image_license}
                          </a>
                        ) : frontmatter.feature_image_license}
                      </>
                    )}
                  </figcaption>
                )}
              </figure>
            )}

            <MarkdownRenderer
              content={content}
              className="prose mx-auto max-w-3xl"
            />
          </article>

          {(previous || next) && (
            <nav className="mx-auto mt-16 max-w-3xl border-t border-theme-border-secondary/50 pt-10" aria-label="Post navigation">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {previous && (
                  <a
                    href={`/${previous.slug}`}
                    className="group p-4 -m-4 rounded-xl hover:bg-theme-bg-secondary/30 transition-all duration-300"
                    aria-label={`Previous post: ${previous.frontmatter.title}`}
                  >
                    <div className="flex items-center gap-2 text-sm text-theme-text-tertiary mb-2 font-medium">
                      <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </div>
                    <div className="text-lg text-theme-text-primary group-hover:text-theme-accent-primary transition-colors duration-300 font-medium leading-snug">
                      {previous.frontmatter.title}
                    </div>
                  </a>
                )}
                {next && (
                  <a
                    href={`/${next.slug}`}
                    className={`group p-4 -m-4 rounded-xl hover:bg-theme-bg-secondary/30 transition-all duration-300 ${!previous ? 'sm:col-start-2' : ''} text-right`}
                    aria-label={`Next post: ${next.frontmatter.title}`}
                  >
                    <div className="flex items-center justify-end gap-2 text-sm text-theme-text-tertiary mb-2 font-medium">
                      Next
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="text-lg text-theme-text-primary group-hover:text-theme-accent-primary transition-colors duration-300 font-medium leading-snug">
                      {next.frontmatter.title}
                    </div>
                  </a>
                )}
              </div>
            </nav>
          )}

          {/* Author bio */}
          <div className="mx-auto mt-14 max-w-3xl border-t border-theme-border-secondary/50 pt-10">
            <AuthorBio />
          </div>

          {/* Related posts */}
          <div className="mx-auto mt-12 max-w-3xl">
            <RelatedPosts posts={relatedPosts} />
          </div>

          <div className="mx-auto max-w-3xl">
            <GiscusComments />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render page
  if (page) {
    const { frontmatter, content } = page;

    return (
      <div className="min-h-screen bg-theme-bg-primary flex flex-col">
        <Header />

        <main className="page-enter mx-auto w-full max-w-3xl flex-1 overflow-hidden px-5 py-8 sm:px-8 sm:py-12">
          <a
            href="/"
            className="text-base text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-10 inline-flex items-center gap-2 group"
            aria-label="Back to homepage"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Home</span>
          </a>

          <article>
            <header className="mb-10 sm:mb-12">
              <h1 className="font-display break-words text-4xl font-normal leading-[1.02] tracking-tight text-theme-text-primary sm:text-5xl lg:text-6xl">{frontmatter.title}</h1>
            </header>

            <MarkdownRenderer
              content={content}
              className={`prose max-w-none ${slug === 'bio' ? 'prose-bio prose-cards' : ''}`}
            />
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
}
