export function Head() {
  return (
    <>
      <title>Anuradha Weeraman | Technical Blog</title>
      <meta name="description" content="Personal blog and technical writings covering software development, systems programming, and technology." />
      <meta name="author" content="Anuradha Weeraman" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://weeraman.com/" />
      <meta property="og:title" content="Anuradha Weeraman | Technical Blog" />
      <meta property="og:description" content="Personal blog and technical writings covering software development, systems programming, and technology." />
      <meta property="og:image" content="https://weeraman.com/images/anuradha-weeraman.jpg" />
      <meta property="og:site_name" content="Anuradha Weeraman" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://weeraman.com/" />
      <meta name="twitter:title" content="Anuradha Weeraman | Technical Blog" />
      <meta name="twitter:description" content="Personal blog and technical writings covering software development, systems programming, and technology." />
      <meta name="twitter:image" content="https://weeraman.com/images/anuradha-weeraman.jpg" />
      <meta name="twitter:creator" content="@anuradha" />

      {/* SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href="https://weeraman.com/" />
    </>
  );
}
