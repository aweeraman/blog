export function AuthorBio() {
  return (
    <div className="flex items-start gap-5 p-6 bg-theme-bg-secondary/40 border border-theme-border-secondary/50 rounded-xl">
      <a href="/bio" className="flex-shrink-0">
        <img
          src="/images/anuradha-weeraman.jpg"
          alt="Anuradha Weeraman"
          className="w-16 h-16 rounded-full object-cover ring-2 ring-theme-border-primary hover:ring-theme-accent-primary transition-all duration-300"
        />
      </a>
      <div className="min-w-0">
        <a href="/bio" className="text-lg font-semibold text-theme-text-primary hover:text-theme-accent-primary transition-colors duration-300">
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
            className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors duration-300"
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
