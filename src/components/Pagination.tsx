interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-6 mt-14 pt-10 border-t border-theme-border-secondary/50" aria-label="Blog pagination">
      {currentPage > 1 && (
        <a
          href={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
          className="group flex items-center gap-2 text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-all duration-300 font-medium"
          aria-label={`Go to page ${currentPage - 1}`}
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </a>
      )}

      <div className="flex gap-1.5">
        {pages.map((page) => (
          <a
            key={page}
            href={page === 1 ? '/' : `/page/${page}`}
            className={`w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-all duration-300 font-medium ${
              page === currentPage
                ? 'bg-theme-accent-primary text-theme-bg-primary shadow-md shadow-theme-accent-primary/20'
                : 'text-theme-text-tertiary hover:text-theme-accent-primary hover:bg-theme-bg-secondary/50'
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
          className="group flex items-center gap-2 text-sm text-theme-text-tertiary hover:text-theme-accent-primary transition-all duration-300 font-medium"
          aria-label={`Go to page ${currentPage + 1}`}
        >
          Next
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </nav>
  );
}
