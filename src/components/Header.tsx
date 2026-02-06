import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <header className="sticky top-0 z-50 bg-theme-bg-primary/90 backdrop-blur-md border-b border-theme-border-secondary/50 shadow-lg shadow-black/5">
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-8 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Profile and Title */}
          <div className="flex items-center gap-4">
            <a href="/bio" className="flex-shrink-0 group" aria-label="View bio page">
              <img
                src="/images/anuradha-weeraman.jpg"
                alt="Anuradha Weeraman"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-theme-border-primary group-hover:ring-theme-accent-primary transition-all duration-300 group-hover:scale-105"
              />
            </a>
            <div className="flex-1 min-w-0">
              <a href="/" className="group" aria-label="Go to homepage">
                <h1 className="text-xl sm:text-2xl font-bold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors duration-300 tracking-tight">
                  Anuradha Weeraman
                </h1>
                <p className="text-xs sm:text-sm text-theme-text-tertiary mt-0.5 tracking-wide">CTO · Architect · Advisor</p>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Nav links - hidden when search is open */}
            <div className={`flex items-center gap-1.5 sm:gap-3 transition-all duration-300 ${isSearchOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              <a
                href="/publications"
                className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-theme-text-primary bg-theme-bg-secondary hover:bg-theme-bg-tertiary border border-theme-border-primary rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                Publications
              </a>
              <a
                href="/speaking"
                className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-theme-text-primary bg-theme-bg-secondary hover:bg-theme-bg-tertiary border border-theme-border-primary rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                Speaking
              </a>
              <a
                href="/endorsements"
                className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-theme-text-primary bg-theme-bg-secondary hover:bg-theme-bg-tertiary border border-theme-border-primary rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                Endorsements
              </a>
              <a
                href="/bio"
                className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-theme-bg-primary bg-amber-400 hover:bg-amber-300 rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0"
                aria-label="View bio page"
              >
                Bio
              </a>
              {/* Mobile hamburger menu */}
              <div className="sm:hidden relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-theme-text-tertiary hover:text-theme-accent-primary transition-colors duration-300 hover:bg-theme-bg-secondary/50 rounded-lg"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
                {isMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-44 bg-theme-bg-secondary border border-theme-border-primary rounded-xl shadow-xl shadow-black/20 py-2 z-50">
                    <a href="/publications" className="block px-4 py-2.5 text-sm text-theme-text-primary hover:bg-theme-bg-tertiary hover:text-theme-accent-primary transition-colors">Publications</a>
                    <a href="/speaking" className="block px-4 py-2.5 text-sm text-theme-text-primary hover:bg-theme-bg-tertiary hover:text-theme-accent-primary transition-colors">Speaking</a>
                    <a href="/endorsements" className="block px-4 py-2.5 text-sm text-theme-text-primary hover:bg-theme-bg-tertiary hover:text-theme-accent-primary transition-colors">Endorsements</a>
                    <a href="/bio" className="block px-4 py-2.5 text-sm font-medium text-amber-400 hover:bg-theme-bg-tertiary transition-colors">Bio</a>
                  </div>
                )}
              </div>
            </div>
            {onSearchChange && (
              <div className="flex items-center">
                <div className={`transition-all duration-300 ease-out overflow-hidden ${isSearchOpen ? 'w-56 sm:w-72' : 'w-0'}`}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onBlur={handleSearchBlur}
                    className="w-full px-4 py-2 bg-theme-bg-secondary/80 text-theme-text-primary rounded-full border border-theme-border-primary focus:outline-none focus:border-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary/20 placeholder-theme-text-tertiary text-sm transition-all duration-300"
                    aria-label="Search blog posts"
                  />
                </div>
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-theme-text-tertiary hover:text-theme-accent-primary transition-colors duration-300 hover:bg-theme-bg-secondary/50 rounded-full flex-shrink-0"
                  aria-label={isSearchOpen ? "Close search" : "Search"}
                >
                  {isSearchOpen ? (
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
