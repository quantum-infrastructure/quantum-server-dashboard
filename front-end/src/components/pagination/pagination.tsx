import React from 'react';

interface PaginationProps {
  page: number;
  totalCount: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageClick: (pageNumber: number) => void;  
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalCount,
  pageSize,
  onPrevious,
  onNext,
  onPageClick,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize); 

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <a
            href="#"
            onClick={onPrevious}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
              page === 0 ? 'cursor-not-allowed text-gray-300' : ''
            }`}
          >
            Previous
          </a>
        </li>

        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={() => onPageClick(index)} 
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                page === index
                  ? 'bg-blue-50 text-blue-600 font-semibold border-blue-300'
                  : 'bg-white text-gray-500'
              }`}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li>
          <a
            href="#"
            onClick={onNext}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              (page + 1) * pageSize >= totalCount ? 'cursor-not-allowed text-gray-300' : ''
            }`}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
