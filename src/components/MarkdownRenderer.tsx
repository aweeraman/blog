import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Helper function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): { id: string; start?: string } | null {
  const patterns = [
    // youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})(?:&t=(\d+))?/,
    // youtube.com/watch?v=VIDEO_ID&t=123
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11}).*?(?:&t=(\d+))?/,
    // youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?t=(\d+))?/,
    // youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:\?start=(\d+))?/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return { id: match[1], start: match[2] };
    }
  }
  return null;
}

// Helper function to check if a URL is a YouTube link
function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

// Helper function to generate responsive image sources
function generateImageSources(src?: string) {
  if (!src) return null;

  // Extract path components
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);
  const ext = src.substring(lastDotIndex);

  // Check if this is an image in a post-specific folder (has width variants)
  // Images directly in /images/ (like profile photo) don't have width variants
  const hasWidthVariants = basePath.includes('/images/') && basePath.split('/').length > 3;

  if (!hasWidthVariants) {
    // Simple fallback for images without width variants
    return {
      avif: `${basePath}.avif`,
      avifSrcset: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      webpSrcset: `${basePath}.webp`,
      original: src,
      originalSrcset: src,
    };
  }

  // Define responsive sizes for images with width variants
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
        rehypePlugins={[rehypeRaw]}
        components={{
          // Convert standalone YouTube links to embedded iframes
          a: ({ href, children }) => {
            // Check if this is a standalone YouTube link (link text equals the URL)
            const childText = String(children);
            const isStandaloneLink = href && (childText === href || childText.includes('youtube.com') || childText.includes('youtu.be'));

            if (href && isYouTubeUrl(href) && isStandaloneLink) {
              const video = getYouTubeVideoId(href);
              if (video) {
                const embedUrl = video.start
                  ? `https://www.youtube.com/embed/${video.id}?start=${video.start}`
                  : `https://www.youtube.com/embed/${video.id}`;
                return (
                  <div className="relative w-full my-8" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={embedUrl}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
              }
            }
            // Regular link
            return <a href={href}>{children}</a>;
          },
          // Handle paragraphs that contain only a YouTube URL (plain text, not a link)
          p: ({ children, node }) => {
            // Check if paragraph contains only text that is a YouTube URL
            if (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
              const text = children[0].trim();
              if (isYouTubeUrl(text)) {
                const video = getYouTubeVideoId(text);
                if (video) {
                  const embedUrl = video.start
                    ? `https://www.youtube.com/embed/${video.id}?start=${video.start}`
                    : `https://www.youtube.com/embed/${video.id}`;
                  return (
                    <div className="relative w-full my-8" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={embedUrl}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
              }
            }
            return <p>{children}</p>;
          },
          img: ({ src, alt }) => {
            const sources = generateImageSources(src);
            if (!sources) {
              return <img src={src} alt={alt || ''} loading="lazy" decoding="async" />;
            }

            // Check if we have width variants (srcset contains width descriptors)
            const hasWidthVariants = sources.avifSrcset.includes(' ') && sources.avifSrcset.includes('w');

            if (!hasWidthVariants) {
              // Simple picture without srcset/sizes for images without width variants
              return (
                <picture>
                  <source type="image/avif" srcSet={sources.avif} />
                  <source type="image/webp" srcSet={sources.webp} />
                  <img
                    src={sources.original}
                    alt={alt || ''}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full h-auto"
                  />
                </picture>
              );
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
