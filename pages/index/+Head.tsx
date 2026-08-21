import { JsonLd } from '../../src/components/JsonLd';
import { personJsonLd } from '../../src/utils/structuredData';

export function Head() {
  return (
    <>
      <title>Anuradha Weeraman - Technologist · Architect · Founder</title>
      <meta name="description" content="Technology strategy for AI-powered products. Technologist, Architect, and Founder helping companies design and build intelligent software systems that scale." />
      <meta name="author" content="Anuradha Weeraman" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://weeraman.com/" />
      <meta property="og:title" content="Anuradha Weeraman - Technologist · Architect · Founder" />
      <meta property="og:description" content="Technology strategy for AI-powered products. Technologist, Architect, and Founder helping companies design and build intelligent software systems that scale." />
      <meta property="og:image" content="https://weeraman.com/images/anuradha-weeraman.jpg" />
      <meta property="og:site_name" content="Anuradha Weeraman" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://weeraman.com/" />
      <meta name="twitter:title" content="Anuradha Weeraman - Technologist · Architect · Founder" />
      <meta name="twitter:description" content="Technology strategy for AI-powered products. Technologist, Architect, and Founder helping companies design and build intelligent software systems that scale." />
      <meta name="twitter:image" content="https://weeraman.com/images/anuradha-weeraman.jpg" />
      <meta name="twitter:creator" content="@anuradha" />

      {/* SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href="https://weeraman.com/" />

      <JsonLd data={personJsonLd} />
    </>
  );
}
