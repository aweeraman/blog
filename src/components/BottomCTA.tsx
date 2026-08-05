export function BottomCTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="relative overflow-hidden rounded-2xl border border-theme-border-primary bg-theme-bg-secondary px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-theme-accent-primary/10 blur-3xl" aria-hidden="true" />
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent-hover">Have a hard technology problem?</p>
        <h2 className="font-display text-3xl font-normal leading-tight text-theme-text-primary sm:text-4xl">
          Let's turn strategy into something{' '}
          <span className="italic text-theme-accent-hover">real.</span>
        </h2>
        <p className="font-editorial mx-auto mt-4 max-w-xl text-base leading-relaxed text-theme-text-secondary sm:text-lg">
          I work with leaders building intelligent products, modern platforms, and high-performing engineering organizations.
        </p>
        <a
          href="https://cal.com/anuradha"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-theme-accent-primary px-6 py-3 text-sm font-semibold text-theme-bg-primary transition hover:-translate-y-0.5 hover:bg-theme-accent-hover"
        >
          Schedule a conversation <span className="ml-2" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
