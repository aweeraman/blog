import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAdjacentPosts } from '../utils/posts';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Get the page to return to from location state
  const fromPage = (location.state as { fromPage?: number })?.fromPage || 1;
  const backToPath = fromPage === 1 ? '/' : `/page/${fromPage}`;

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-theme-bg-primary flex flex-col">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex-1">
          <Header />
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme-text-primary mb-3 md:mb-4">Post Not Found</h1>
            <p className="text-sm sm:text-base text-theme-text-secondary mb-4 md:mb-6">The post you're looking for doesn't exist.</p>
            <Link
              to={backToPath}
              className="text-sm sm:text-base text-theme-accent-primary hover:text-theme-accent-hover underline cursor-pointer"
            >
              Go back
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { frontmatter, content } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const { previous, next } = getAdjacentPosts(slug);

  return (
    <div className="min-h-screen bg-theme-bg-primary flex flex-col">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex-1">
        <Header />

        <Link
          to={backToPath}
          className="text-xs sm:text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-2 md:mb-3 inline-flex items-center gap-1.5 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </Link>

        {(previous || next) && (
          <nav className="mb-4 md:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {previous && (
                <a
                  href={`/${previous.slug}`}
                  className="group block p-3 sm:p-4 rounded-lg bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors border border-theme-border-primary"
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
            <time className="text-sm sm:text-base text-theme-text-tertiary tracking-wide font-medium">{formattedDate}</time>
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

          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none p-4 sm:p-6 md:p-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>

          {(previous || next) && (
            <nav className="border-t border-theme-border-primary p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {previous && (
                  <a
                    href={`/${previous.slug}`}
                    className="group block p-3 sm:p-4 rounded-lg bg-theme-bg-tertiary hover:bg-theme-bg-primary transition-colors"
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
