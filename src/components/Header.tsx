import { useEffect, useRef, useState } from 'react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const navigation = [
  { href: '/publications', label: 'Publications' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/testimonials', label: 'Testimonials' },
];

export function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const closeOverlays = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOverlays);
    return () => window.removeEventListener('keydown', closeOverlays);
  }, []);

  const toggleSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen((open) => !open);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-theme-border-secondary/70 bg-theme-bg-primary/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="/" className="group flex min-w-0 items-center gap-3" aria-label="Anuradha Weeraman, home">
          <img
            src="/images/anuradha-weeraman.jpg"
            alt=""
            className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-1 ring-theme-border-primary transition duration-200 group-hover:ring-theme-accent-primary sm:h-11 sm:w-11"
          />
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold tracking-tight text-theme-text-primary transition-colors group-hover:text-theme-accent-hover sm:text-lg">
              Anuradha Weeraman
            </span>
            <span className="block text-[0.62rem] font-medium uppercase leading-[1.35] tracking-[0.1em] text-theme-text-tertiary sm:truncate sm:text-xs sm:tracking-[0.15em]">
              Technologist · Architect · Founder
            </span>
          </span>
        </a>

        <div className="flex items-center gap-1.5">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-theme-text-secondary transition-colors hover:bg-theme-bg-secondary hover:text-theme-text-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://newsletter.anuradha.dev/subscription/form"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2 text-sm font-medium text-theme-text-secondary transition-colors hover:bg-theme-bg-secondary hover:text-theme-text-primary"
            >
              Newsletter
            </a>
            <a
              href="/bio"
              className="ml-1 rounded-full border border-theme-accent-primary/50 px-4 py-2 text-sm font-semibold text-theme-accent-hover transition-colors hover:border-theme-accent-hover hover:bg-theme-accent-primary/10"
            >
              About
            </a>
          </nav>

          {onSearchChange && (
            <button
              type="button"
              onClick={toggleSearch}
              className="rounded-full p-2.5 text-theme-text-tertiary transition-colors hover:bg-theme-bg-secondary hover:text-theme-accent-hover"
              aria-label={isSearchOpen ? 'Close search' : 'Search writing'}
              aria-expanded={isSearchOpen}
            >
              {isSearchOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
              )}
            </button>
          )}

          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setIsMenuOpen((open) => !open);
              }}
              className="rounded-full p-2.5 text-theme-text-tertiary transition-colors hover:bg-theme-bg-secondary hover:text-theme-accent-hover"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>

            {isMenuOpen && (
              <nav className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-theme-border-primary bg-theme-bg-secondary p-2 shadow-2xl shadow-black/30" aria-label="Mobile navigation">
                {[...navigation, { href: '/bio', label: 'About' }].map((item) => (
                  <a key={item.href} href={item.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-theme-text-secondary transition-colors hover:bg-theme-bg-tertiary hover:text-theme-text-primary">
                    {item.label}
                  </a>
                ))}
                <a href="https://newsletter.anuradha.dev/subscription/form" target="_blank" rel="noopener noreferrer" className="mt-1 block rounded-lg border-t border-theme-border-primary px-3 py-3 text-sm font-semibold text-theme-accent-hover">
                  Newsletter ↗
                </a>
              </nav>
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && onSearchChange && (
        <div className="border-t border-theme-border-secondary/70 bg-theme-bg-secondary/95">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8">
            <svg className="h-5 w-5 flex-shrink-0 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              placeholder="Search the archive…"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full bg-transparent py-1 text-sm text-theme-text-primary outline-none placeholder:text-theme-text-tertiary"
              aria-label="Search blog posts"
            />
            {searchQuery && (
              <button type="button" onClick={() => onSearchChange('')} className="text-xs font-semibold uppercase tracking-wider text-theme-text-tertiary hover:text-theme-accent-hover">
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
