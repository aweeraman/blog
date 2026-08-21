import { usePageContext } from 'vike-react/usePageContext';
import { getPostBySlug } from '../../src/utils/posts';
import { getPageBySlug } from '../../src/utils/pages';
import { JsonLd } from '../../src/components/JsonLd';
import { SITE_URL, personJsonLd, personReference } from '../../src/utils/structuredData';

export function Head() {
  const pageContext = usePageContext();
  const { slug } = pageContext.routeParams;

  // Try to get post first, then page
  const post = getPostBySlug(slug);
  const page = !post ? getPageBySlug(slug) : null;

  if (post) {
    const { frontmatter, content } = post;
    const description = frontmatter.excerpt || content.slice(0, 160).replace(/[#*\[\]]/g, '').trim();
    const fullImage = frontmatter.feature_image
      ? (frontmatter.feature_image.startsWith('http') ? frontmatter.feature_image : `${SITE_URL}${frontmatter.feature_image}`)
      : `${SITE_URL}/images/anuradha-weeraman.jpg`;
    const articleUrl = `${SITE_URL}/${slug}`;
    const datePublished = new Date(frontmatter.date).toISOString();
    const dateModified = new Date(frontmatter.updated || frontmatter.date).toISOString();
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${articleUrl}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      headline: frontmatter.title,
      description,
      image: fullImage,
      datePublished,
      dateModified,
      author: personReference,
      publisher: personReference,
      ...(frontmatter.tags?.length ? { keywords: frontmatter.tags } : {}),
    };

    return (
      <>
        <title>{`${frontmatter.title} | Anuradha Weeraman`}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Anuradha Weeraman" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImage} />
        <meta property="og:site_name" content="Anuradha Weeraman" />
        <meta property="article:published_time" content={datePublished} />
        <meta property="article:modified_time" content={dateModified} />
        <meta property="article:author" content="Anuradha Weeraman" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={articleUrl} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImage} />
        <meta name="twitter:creator" content="@anuradha" />

        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={articleUrl} />

        <JsonLd data={articleJsonLd} />
      </>
    );
  }

  if (page) {
    const { frontmatter, content } = page;
    const description = content.slice(0, 160).replace(/[#*\[\]]/g, '').trim();

    return (
      <>
        <title>{`${frontmatter.title} | Anuradha Weeraman`}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Anuradha Weeraman" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/${slug}`} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/images/anuradha-weeraman.jpg`} />
        <meta property="og:site_name" content="Anuradha Weeraman" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${SITE_URL}/${slug}`} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/images/anuradha-weeraman.jpg`} />
        <meta name="twitter:creator" content="@anuradha" />

        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/${slug}`} />

        {slug === 'bio' && <JsonLd data={personJsonLd} />}
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
