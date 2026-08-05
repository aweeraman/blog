export function HeroSection() {
  const scrollToWriting = () => {
    const element = document.getElementById('writing');
    if (!element) return;

    const headerOffset = 96;
    const offsetPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-theme-border-primary/70 pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-theme-accent-primary/[0.07] blur-3xl" aria-hidden="true" />

      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-theme-accent-hover">
        Technology leadership · Product engineering
      </p>
      <h1 className="font-brand-display max-w-4xl text-[2rem] font-normal leading-[0.98] tracking-[-0.035em] text-theme-text-primary sm:text-[2.75rem] lg:text-[3.5rem]">
        Technology strategy for{' '}
        <span className="italic text-theme-accent-hover">AI-powered</span> products.
      </h1>

      <p className="font-editorial mt-6 max-w-2xl text-lg leading-relaxed text-theme-text-secondary sm:text-xl">
        I design intelligent products, shape resilient software systems, and help engineering organizations turn ambitious ideas into durable outcomes.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
        <a
          href="https://cal.com/anuradha"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-theme-accent-primary px-6 py-3 text-sm font-semibold text-theme-bg-primary shadow-lg shadow-theme-accent-primary/10 transition hover:-translate-y-0.5 hover:bg-theme-accent-hover"
        >
          Schedule a conversation
          <span className="ml-2" aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          onClick={scrollToWriting}
          className="inline-flex items-center justify-center rounded-full border border-theme-border-primary px-6 py-3 text-sm font-semibold text-theme-text-primary transition hover:border-theme-accent-primary/60 hover:bg-theme-bg-secondary"
        >
          Explore my writing
          <span className="ml-2 text-theme-accent-hover" aria-hidden="true">↓</span>
        </button>
        <a
          href="https://newsletter.anuradha.dev/subscription/form"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-3 text-sm font-semibold text-theme-text-tertiary transition-colors hover:text-theme-accent-hover"
        >
          Join the newsletter
        </a>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-theme-border-secondary/80 pt-7 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-theme-text-tertiary">Leadership</dt>
          <dd className="font-editorial mt-1 text-lg text-theme-text-primary">Founder &amp; CTO</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-theme-text-tertiary">Cross-domain</dt>
          <dd className="font-editorial mt-1 text-lg text-theme-text-primary">Regulated industries to emerging technology</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-theme-text-tertiary">Innovation</dt>
          <dd className="font-editorial mt-1 text-lg text-theme-text-primary">US patent co-inventor</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-theme-text-tertiary">Thought leadership</dt>
          <dd className="font-editorial mt-1 text-lg text-theme-text-primary">Forbes Technology Council</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-theme-text-tertiary">Open source</dt>
          <dd className="font-editorial mt-1 text-lg text-theme-text-primary">Debian developer</dd>
        </div>
      </dl>
    </section>
  );
}
