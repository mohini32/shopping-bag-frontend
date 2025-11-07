import React from 'react';


interface ProductPaginationProps {
  currentPage: number;
  totalProducts: number;
  productsPerPage: number;
  onPageChange: (page: number) => void;
}

export const ProductPagination = ({ 
  currentPage, 
  totalProducts, 
  productsPerPage, 
  onPageChange 
}: ProductPaginationProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)} // ← newPage = currentPage - 1
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)} // ← newPage = pageNum (1, 2, 3, etc.)
          className={`px-3 py-1 border rounded ${
            pageNum === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)} // ← newPage = currentPage + 1
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};