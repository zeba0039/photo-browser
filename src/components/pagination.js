import ReactPagination from 'react-js-pagination';

const Pagination = ({ page, limit, totalCount, handlePageClick }) => {
  return (
    <div className='pagination-container'>
      <ReactPagination
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={totalCount}
        pageRangeDisplayed={3}
        onChange={handlePageClick}
        itemClass='page-item'
        linkClass='page-link'
      />
    </div>
  );
};

export default Pagination;
