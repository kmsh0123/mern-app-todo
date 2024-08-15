import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalPosts, pagesPerPage, setCurrentPage, setSearchParams,hasNextPage,data }) => {

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSearchParams({ page: currentPage - 1 });
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSearchParams({ page: currentPage + 1 });
      onPageChange(currentPage + 1);
    }
  };

  console.log(data);
  

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
     <button 
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${currentPage === 1 && 'bg-gray-300 cursor-not-allowed'}`}
        onClick={handlePrevious} 
        disabled={currentPage === 1}
      >
        &larr; Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
        <button 
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${data?.getall.length <= 4 ? 'bg-gray-300 cursor-not-allowed' : ''}`}
        onClick={handleNext} 
        disabled={data?.getall.length <= 4}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
