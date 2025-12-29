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
        className="text-4xl sm:text-5xl lg:text-6xl font-normal text-theme-text-primary leading-tight tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Building products at the intersection of{' '}
        <span className="italic text-amber-400">technology</span>
        {' '}&{' '}
        <span className="italic text-amber-400">business</span>
      </h2>

      <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-theme-text-secondary leading-relaxed max-w-2xl mx-auto">
        I help design and build intelligent products and software systems that scale. CTO of Verdentra,
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

      <div className="mt-10 sm:mt-14 border-b border-theme-border-primary"></div>
    </section>
  );
}
