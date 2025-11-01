import { Link } from 'react-router-dom';
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
    <header className="border-b border-theme-border-primary mb-8 md:mb-12">
      <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4 md:flex-1">
            <Link to="/bio" className="flex-shrink-0">
              <img
                src="/images/anuradha-weeraman.jpg"
                alt="Anuradha Weeraman"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover ring-2 ring-theme-accent-primary hover:ring-theme-accent-hover transition-all mt-0.5 sm:mt-1"
              />
            </Link>
            <Link to="/" className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-accent-primary mb-1.5 md:mb-2 hover:text-theme-accent-hover transition-colors tracking-tight">
                Anuradha Weeraman
              </h1>
              <p className="text-base md:text-lg text-theme-text-tertiary tracking-wide">A practitioner's views on computers, operating systems and technology</p>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:mt-1">
            <Link
              to="/bio"
              className="text-sm md:text-base font-medium text-theme-text-secondary hover:text-theme-accent-primary transition-colors uppercase tracking-wide"
            >
              Bio
            </Link>
            {onSearchChange && (
              <div className="flex items-center gap-2">
              <div className={`transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-48 sm:w-64 md:w-80' : 'w-0'} overflow-hidden`}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onBlur={handleSearchBlur}
                  className="w-full px-1 py-2 bg-transparent text-theme-text-primary border-b-2 border-theme-border-primary focus:outline-none focus:border-theme-accent-primary placeholder-theme-text-tertiary text-sm transition-colors"
                />
              </div>
              <button
                onClick={handleSearchToggle}
                className="p-2 text-theme-text-tertiary hover:text-theme-accent-primary transition-colors rounded-lg hover:bg-theme-bg-secondary"
                aria-label="Search"
              >
                {isSearchOpen && searchQuery ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
