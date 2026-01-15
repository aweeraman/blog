export function HeroSection() {
  const scrollToWriting = () => {
    const element = document.getElementById('writing');
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-4 sm:pt-6 pb-10 sm:pb-14 text-center">
      <h2
        className="text-3xl sm:text-5xl lg:text-6xl font-normal text-theme-text-primary leading-tight tracking-tight break-words"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Technology strategy for{' '}
        <span className="italic text-amber-400">AI-powered</span>
        {' '}products
      </h2>

      <p className="mt-5 sm:mt-6 text-base sm:text-xl text-theme-text-secondary leading-relaxed max-w-2xl mx-auto px-1">
        I design and build intelligent products and software systems that scale. CTO of Verdentra,
        speaker, and contributor to Linux & Debian.
      </p>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={scrollToWriting}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-theme-bg-primary font-semibold rounded-lg transition-all duration-300 hover:scale-105"
        >
          Read My Writing →
        </button>
        <a
          href="https://cal.com/anuradha"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-primary font-semibold rounded-lg border border-theme-border-primary transition-all duration-300 hover:scale-105"
        >
          Schedule a Call
        </a>
      </div>

      {/* Authority badges */}
      <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm text-theme-text-tertiary px-2">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          CTO
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Patent Holder
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Linux & Debian Contributor
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Conference Speaker
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          Forbes Technology Council
        </span>
      </div>

      <div className="mt-10 sm:mt-14 border-b border-theme-border-primary"></div>
    </section>
  );
}
