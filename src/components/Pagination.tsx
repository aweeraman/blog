import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          to={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
          className="px-4 py-2 border border-theme-border-primary rounded text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
        >
          Previous
        </Link>
      )}

      <div className="flex gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            to={page === 1 ? '/' : `/page/${page}`}
            className={`px-4 py-2 border rounded transition-colors ${
              page === currentPage
                ? 'bg-theme-accent-primary text-white border-theme-accent-primary'
                : 'border-theme-border-primary text-theme-text-primary hover:bg-theme-bg-tertiary'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          to={`/page/${currentPage + 1}`}
          className="px-4 py-2 border border-theme-border-primary rounded text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
