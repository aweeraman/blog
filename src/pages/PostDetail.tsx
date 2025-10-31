import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAdjacentPosts } from '../utils/posts';
import { Header } from '../components/Header';

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
      <div className="min-h-screen bg-theme-bg-primary">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Header />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-theme-text-primary mb-4">Post Not Found</h1>
            <p className="text-theme-text-secondary mb-6">The post you're looking for doesn't exist.</p>
            <Link
              to={backToPath}
              className="text-theme-accent-primary hover:text-theme-accent-hover underline cursor-pointer"
            >
              Go back
            </Link>
          </div>
        </div>
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
    <div className="min-h-screen bg-theme-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Header />

        <Link
          to={backToPath}
          className="text-theme-accent-primary hover:text-theme-accent-hover mb-6 inline-block cursor-pointer"
        >
          ← Back to all posts
        </Link>

        {(previous || next) && (
          <nav className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previous && (
                <a
                  href={`/${previous.slug}`}
                  className="group block p-4 rounded-lg bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors border border-theme-border-primary"
                >
                  <div className="text-sm text-theme-text-tertiary mb-2">← Previous</div>
                  <div className="text-theme-accent-primary group-hover:text-theme-accent-hover font-medium">
                    {previous.frontmatter.title}
                  </div>
                </a>
              )}
              {next && (
                <a
                  href={`/${next.slug}`}
                  className={`group block p-4 rounded-lg bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors border border-theme-border-primary ${!previous ? 'md:col-start-2' : ''}`}
                >
                  <div className="text-sm text-theme-text-tertiary mb-2 text-right">Next →</div>
                  <div className="text-theme-accent-primary group-hover:text-theme-accent-hover font-medium text-right">
                    {next.frontmatter.title}
                  </div>
                </a>
              )}
            </div>
          </nav>
        )}

        <article className="bg-theme-bg-secondary rounded-lg shadow-lg shadow-black/20 overflow-hidden">
          <header className="p-8 pb-0">
            <h1 className="text-4xl font-bold text-theme-accent-primary mb-3">{frontmatter.title}</h1>
            <time className="text-theme-text-tertiary">{formattedDate}</time>
          </header>

          {frontmatter.feature_image && (
            <div className="px-8 py-6">
              <img
                src={frontmatter.feature_image}
                alt={frontmatter.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none p-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>

          {(previous || next) && (
            <nav className="border-t border-theme-border-primary p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previous && (
                  <a
                    href={`/${previous.slug}`}
                    className="group block p-4 rounded-lg bg-theme-bg-tertiary hover:bg-theme-bg-primary transition-colors"
                  >
                    <div className="text-sm text-theme-text-tertiary mb-2">← Previous</div>
                    <div className="text-theme-accent-primary group-hover:text-theme-accent-hover font-medium">
                      {previous.frontmatter.title}
                    </div>
                  </a>
                )}
                {next && (
                  <a
                    href={`/${next.slug}`}
                    className={`group block p-4 rounded-lg bg-theme-bg-tertiary hover:bg-theme-bg-primary transition-colors ${!previous ? 'md:col-start-2' : ''}`}
                  >
                    <div className="text-sm text-theme-text-tertiary mb-2 text-right">Next →</div>
                    <div className="text-theme-accent-primary group-hover:text-theme-accent-hover font-medium text-right">
                      {next.frontmatter.title}
                    </div>
                  </a>
                )}
              </div>
            </nav>
          )}
        </article>
      </div>
    </div>
  );
}
