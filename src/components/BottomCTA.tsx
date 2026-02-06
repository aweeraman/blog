export function BottomCTA() {
  return (
    <section className="max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-12 text-center">
      <div className="border-t border-theme-border-primary mb-8 sm:mb-10"></div>

      <h3
        className="text-3xl sm:text-4xl font-normal text-theme-text-primary leading-tight"
        style={{ fontFamily: "'Instrument Serif', 'Instrument Serif Fallback', serif" }}
      >
        Let's build something{' '}
        <span className="italic text-amber-400">together</span>
      </h3>

      <p className="mt-4 sm:mt-5 text-lg text-theme-text-secondary max-w-xl mx-auto">
        Looking for a technology partner to help scale your product or navigate complex architectural decisions?
      </p>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://cal.com/anuradha"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-theme-bg-primary font-semibold rounded-lg transition-all duration-300 hover:scale-105"
        >
          Schedule a Call
        </a>
        <a
          href="/bio"
          className="px-6 py-3 bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-primary font-semibold rounded-lg border border-theme-border-primary transition-all duration-300 hover:scale-105"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
