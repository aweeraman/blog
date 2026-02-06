// Global head that applies to all pages
export function Head() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Preload critical fonts to avoid layout shifts */}
      <link rel="preload" href="/fonts/instrument-serif/instrument-serif-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/instrument-serif/instrument-serif-400-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/source-serif-4/source-serif-4-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-T3167J0GT8"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T3167J0GT8');
          `,
        }}
      />
    </>
  );
}
