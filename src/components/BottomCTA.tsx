export function BottomCTA() {
  return (
    <section className="max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-12 text-center">
      <div className="border-t border-theme-border-primary mb-8 sm:mb-10"></div>

      <h3
        className="text-2xl sm:text-3xl font-normal text-theme-text-primary leading-tight"
        style={{ fontFamily: "'Instrument Serif', 'Instrument Serif Fallback', serif" }}
      >
        Let's talk{' '}
        <span className="italic text-amber-400">strategy</span>
      </h3>

      <div className="mt-6 sm:mt-8 flex items-center justify-center">
        <a
          href="https://cal.com/anuradha"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-theme-bg-primary font-semibold rounded-lg transition-all duration-300 hover:scale-105"
        >
          Schedule a Call
        </a>
      </div>
    </section>
  );
}
