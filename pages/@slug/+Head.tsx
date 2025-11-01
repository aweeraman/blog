import { usePageContext } from 'vike-react/usePageContext';
import { getPostBySlug } from '../../src/utils/posts';
import { getPageBySlug } from '../../src/utils/pages';

export function Head() {
  const pageContext = usePageContext();
  const { slug } = pageContext.routeParams;

  // Try to get post first, then page
  const post = getPostBySlug(slug);
  const page = !post ? getPageBySlug(slug) : null;

  if (post) {
    const { frontmatter, content } = post;
    const description = frontmatter.excerpt || content.slice(0, 160).replace(/[#*\[\]]/g, '').trim();
    const siteUrl = 'https://weeraman.com';
    const fullImage = frontmatter.feature_image
      ? (frontmatter.feature_image.startsWith('http') ? frontmatter.feature_image : `${siteUrl}${frontmatter.feature_image}`)
      : `${siteUrl}/images/anuradha-weeraman.jpg`;

    return (
      <>
        <title>{`${frontmatter.title} | Anuradha Weeraman`}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Anuradha Weeraman" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/${slug}`} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImage} />
        <meta property="og:site_name" content="Anuradha Weeraman" />
        <meta property="article:published_time" content={new Date(frontmatter.date).toISOString()} />
        <meta property="article:author" content="Anuradha Weeraman" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/${slug}`} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImage} />
        <meta name="twitter:creator" content="@anuradha" />

        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/${slug}`} />
      </>
    );
  }

  if (page) {
    const { frontmatter, content } = page;
    const description = content.slice(0, 160).replace(/[#*\[\]]/g, '').trim();
    const siteUrl = 'https://weeraman.com';

    return (
      <>
        <title>{`${frontmatter.title} | Anuradha Weeraman`}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Anuradha Weeraman" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/${slug}`} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}/images/anuradha-weeraman.jpg`} />
        <meta property="og:site_name" content="Anuradha Weeraman" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/${slug}`} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/images/anuradha-weeraman.jpg`} />
        <meta name="twitter:creator" content="@anuradha" />

        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/${slug}`} />
      </>
    );
  }

  return (
    <>
      <title>Not Found | Anuradha Weeraman</title>
      <meta name="robots" content="noindex" />
    </>
  );
}
