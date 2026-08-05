export function AuthorBio() {
  return (
    <div className="flex items-start gap-5 rounded-2xl border border-theme-border-primary bg-theme-bg-secondary/45 p-6 sm:p-7">
      <a href="/bio" className="flex-shrink-0">
        <img
          src="/images/anuradha-weeraman.jpg"
          alt="Anuradha Weeraman"
          className="h-16 w-16 rounded-full object-cover ring-1 ring-theme-border-primary transition duration-300 hover:ring-theme-accent-primary"
        />
      </a>
      <div className="min-w-0">
        <a href="/bio" className="font-editorial text-xl font-semibold text-theme-text-primary transition-colors duration-300 hover:text-theme-accent-hover">
          Anuradha Weeraman
        </a>
        <p className="text-sm text-theme-text-tertiary mt-1 leading-relaxed">
          Founder, CTO and Debian Developer. Building intelligent products and systems that scale.
        </p>
        <div className="mt-3 flex items-center gap-4">
          <a
            href="https://cal.com/anuradha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-theme-accent-hover transition-colors duration-300 hover:text-theme-text-primary"
          >
            Schedule a Call
          </a>
          <a
            href="/bio"
            className="text-sm font-medium text-theme-accent-primary hover:text-theme-accent-hover transition-colors duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
