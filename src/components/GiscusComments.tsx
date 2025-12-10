import { useEffect, useRef } from 'react';

export function GiscusComments() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentsRef.current && !commentsRef.current.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'aweeraman/blog');
      script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkyMjA3NDgxODM=');
      script.setAttribute('data-category', 'Announcements');
      script.setAttribute('data-category-id', 'DIC_kwDODShZl84CxVqy');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'top');
      script.setAttribute('data-theme', 'dark');
      script.setAttribute('data-lang', 'en');
      script.setAttribute('data-loading', 'lazy');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;

      commentsRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="mt-16 pt-8 border-t border-theme-border-secondary">
      <div ref={commentsRef} />
    </div>
  );
}
