interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-theme-border-secondary" aria-label="Blog pagination">
      {currentPage > 1 && (
        <a
          href={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
          className="text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-colors"
          aria-label={`Go to page ${currentPage - 1}`}
        >
          ← Previous
        </a>
      )}

      <div className="flex gap-2">
        {pages.map((page) => (
          <a
            key={page}
            href={page === 1 ? '/' : `/page/${page}`}
            className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors ${
              page === currentPage
                ? 'bg-theme-accent-primary text-white'
                : 'text-theme-text-tertiary hover:text-theme-accent-primary'
            }`}
            aria-label={page === currentPage ? `Current page, page ${page}` : `Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </a>
        ))}
      </div>

      {currentPage < totalPages && (
        <a
          href={`/page/${currentPage + 1}`}
          className="text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-colors"
          aria-label={`Go to page ${currentPage + 1}`}
        >
          Next →
        </a>
      )}
    </nav>
  );
}
