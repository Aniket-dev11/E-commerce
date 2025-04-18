import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  activePage,
  onPageSelect,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (pageNumber) => {
    onPageSelect(pageNumber);
  };

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => handlePageChange(activePage - 1)}
      />
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === activePage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}
      <Pagination.Next
        disabled={activePage === totalPages}
        onClick={() => handlePageChange(activePage + 1)}
      />
    </Pagination>
  );
};

export default CustomPagination;
