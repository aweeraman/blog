// Global head that applies to all pages
export function Head() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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
