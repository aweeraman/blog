import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPageBySlug } from '../utils/pages';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Page() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const page = getPageBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen bg-theme-bg-primary flex flex-col">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex-1 pb-8 md:pb-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme-text-primary mb-3 md:mb-4">Page Not Found</h1>
            <p className="text-sm sm:text-base text-theme-text-secondary mb-4 md:mb-6">The page you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="text-sm sm:text-base text-theme-accent-primary hover:text-theme-accent-hover underline cursor-pointer"
            >
              Go back to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { frontmatter, content } = page;

  return (
    <div className="min-h-screen bg-theme-bg-primary flex flex-col">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex-1 pb-8 md:pb-12">
        <Link
          to="/"
          className="text-xs sm:text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-2 md:mb-3 inline-flex items-center gap-1.5 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </Link>

        <article className="bg-theme-bg-secondary rounded-lg shadow-lg shadow-black/20 overflow-hidden">
          <header className="p-4 sm:p-5 md:p-6 pb-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-theme-accent-primary mb-0 tracking-tight leading-tight">{frontmatter.title}</h1>
          </header>

          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none px-4 sm:px-6 md:px-8 pt-0 pb-4 sm:pb-6 md:pb-8 [&>*:first-child]:mt-2 [&>*:first-child]:sm:mt-3 [&>*:first-child]:md:mt-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
