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

        <main className="w-full max-w-3xl mx-auto px-5 sm:px-8 flex-1 py-8 sm:py-12 overflow-hidden">
          <a
            href="/"
            className="text-base text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-10 inline-flex items-center gap-2 group"
            aria-label="Back to homepage"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>All posts</span>
          </a>

          <article>
            <header className="mb-10 sm:mb-12">
              <time className="text-base text-theme-text-tertiary block mb-4">{formattedDate}</time>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-theme-text-primary leading-tight tracking-tight break-words">{frontmatter.title}</h1>
            </header>

            {frontmatter.feature_image && (
              <div className="mb-10 sm:mb-12">
                <img
                  src={frontmatter.feature_image}
                  alt={frontmatter.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            <MarkdownRenderer
              content={content}
              className="prose max-w-none"
            />
          </article>

          {(previous || next) && (
            <nav className="mt-16 pt-10 border-t border-theme-border-secondary/50" aria-label="Post navigation">
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
          <div className="mt-14 pt-10 border-t border-theme-border-secondary/50">
            <AuthorBio />
          </div>

          {/* Related posts */}
          <div className="mt-12">
            <RelatedPosts posts={relatedPosts} />
          </div>

          <GiscusComments />
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

        <main className="w-full max-w-3xl mx-auto px-5 sm:px-8 flex-1 py-8 sm:py-12 overflow-hidden">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-theme-text-primary leading-tight tracking-tight break-words">{frontmatter.title}</h1>
            </header>

            <MarkdownRenderer
              content={content}
              className="prose max-w-none"
            />
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
}
