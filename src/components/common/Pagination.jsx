import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.Prev 
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        
        {pageNumbers.map(number => (
          <BootstrapPagination.Item 
            key={number} 
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </BootstrapPagination.Item>
        ))}
        
        <BootstrapPagination.Next 
          onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;