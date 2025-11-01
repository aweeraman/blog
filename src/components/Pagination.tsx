interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
      {currentPage > 1 && (
        <a
          href={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
          className="px-3 py-1.5 sm:px-4 sm:py-2 border border-theme-border-primary rounded text-sm sm:text-base text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </a>
      )}

      <div className="flex gap-1.5 sm:gap-2">
        {pages.map((page) => (
          <a
            key={page}
            href={page === 1 ? '/' : `/page/${page}`}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded transition-colors text-sm sm:text-base ${
              page === currentPage
                ? 'bg-theme-accent-primary text-white border-theme-accent-primary'
                : 'border-theme-border-primary text-theme-text-primary hover:bg-theme-bg-tertiary'
            }`}
          >
            {page}
          </a>
        ))}
      </div>

      {currentPage < totalPages && (
        <a
          href={`/page/${currentPage + 1}`}
          className="px-3 py-1.5 sm:px-4 sm:py-2 border border-theme-border-primary rounded text-sm sm:text-base text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
        >
          Next
        </a>
      )}
    </nav>
  );
}
