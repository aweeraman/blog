import { Link } from 'react-router-dom';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <Link to={frontmatter.path} className="block">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600">
          {frontmatter.title}
        </h2>
        <time className="text-sm text-gray-500 mb-3 block">{formattedDate}</time>
        {frontmatter.excerpt && (
          <p className="text-gray-700 leading-relaxed">{frontmatter.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
