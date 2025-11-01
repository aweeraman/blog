import { Link } from 'react-router-dom';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  return (
    <header className="mb-4 md:mb-6">
      <Link to="/" className="block">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-theme-accent-primary mb-1.5 md:mb-2 hover:text-theme-accent-hover transition-colors tracking-tight">
          Anuradha Weeraman
        </h1>
        <p className="text-base md:text-lg text-theme-text-tertiary tracking-wide">A practitioner's views on computers, operating systems and technology</p>
      </Link>

      {onSearchChange && (
        <div className="mt-4 md:mt-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-theme-bg-secondary text-theme-text-primary border border-theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary focus:border-transparent placeholder-theme-text-tertiary text-sm md:text-base"
          />
        </div>
      )}
    </header>
  );
}
