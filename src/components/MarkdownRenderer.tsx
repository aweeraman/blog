import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Helper function to generate responsive image sources
function generateImageSources(src?: string) {
  if (!src) return null;

  // Extract path components
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);
  const ext = src.substring(lastDotIndex);

  // Define responsive sizes
  const sizes = [400, 800, 1200];

  // Generate srcset for each format
  const avifSrcset = sizes.map(w => `${basePath}-${w}w.avif ${w}w`).join(', ');
  const webpSrcset = sizes.map(w => `${basePath}-${w}w.webp ${w}w`).join(', ');
  const originalSrcset = sizes.map(w => `${basePath}-${w}w${ext} ${w}w`).join(', ');

  return {
    avif: `${basePath}.avif`,
    avifSrcset,
    webp: `${basePath}.webp`,
    webpSrcset,
    original: src,
    originalSrcset,
  };
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            const sources = generateImageSources(src);
            if (!sources) {
              return <img src={src} alt={alt || ''} loading="lazy" decoding="async" />;
            }

            return (
              <picture>
                {/* AVIF format - best compression */}
                <source
                  type="image/avif"
                  srcSet={`${sources.avif}, ${sources.avifSrcset}`}
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
                />
                {/* WebP format - good compression, wide support */}
                <source
                  type="image/webp"
                  srcSet={`${sources.webp}, ${sources.webpSrcset}`}
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
                />
                {/* Original format - fallback */}
                <source
                  srcSet={`${sources.original}, ${sources.originalSrcset}`}
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
                />
                {/* Fallback img tag */}
                <img
                  src={sources.original}
                  alt={alt || ''}
                  loading="lazy"
                  decoding="async"
                  className="max-w-full h-auto"
                />
              </picture>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
