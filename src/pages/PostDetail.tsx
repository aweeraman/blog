import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../utils/posts';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-600 hover:text-blue-700 underline">
              Go back to home
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">
          ← Back to all posts
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <header className="p-8 pb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{frontmatter.title}</h1>
            <time className="text-gray-500">{formattedDate}</time>
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
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
