import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    if (isSearchOpen && searchQuery === '') {
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleSearchBlur = () => {
    if (searchQuery === '') {
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-theme-bg-primary/95 backdrop-blur-sm border-b border-theme-border-secondary">
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Profile and Title */}
          <div className="flex items-center gap-4">
            <a href="/bio" className="flex-shrink-0" aria-label="View bio page">
              <img
                src="/images/anuradha-weeraman.jpg"
                alt="Anuradha Weeraman"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-theme-border-primary hover:ring-theme-accent-primary transition-all"
              />
            </a>
            <div className="flex-1 min-w-0">
              <a href="/" aria-label="Go to homepage">
                <h1 className="text-2xl sm:text-3xl font-bold text-theme-text-primary hover:text-theme-accent-primary transition-colors tracking-tight">
                  Anuradha Weeraman
                </h1>
                <p className="text-sm sm:text-base text-theme-text-tertiary mt-0.5">On software</p>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4 sm:gap-5">
            <a
              href="/bio"
              className="text-sm font-medium text-theme-text-tertiary hover:text-theme-accent-primary transition-colors"
              aria-label="View bio page"
            >
              About
            </a>
            {onSearchChange && (
              <div className="flex items-center">
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSearchOpen ? 'w-40 sm:w-52' : 'w-0'}`}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onBlur={handleSearchBlur}
                    className="w-full px-3 py-1.5 bg-theme-bg-secondary text-theme-text-primary rounded-md border border-theme-border-primary focus:outline-none focus:border-theme-accent-primary placeholder-theme-text-tertiary text-sm transition-colors"
                    aria-label="Search blog posts"
                  />
                </div>
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-theme-text-tertiary hover:text-theme-accent-primary transition-colors"
                  aria-label="Search"
                >
                  {isSearchOpen && searchQuery ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
