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
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      <div className="flex gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            to={page === 1 ? '/' : `/page/${page}`}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          to={`/page/${currentPage + 1}`}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
