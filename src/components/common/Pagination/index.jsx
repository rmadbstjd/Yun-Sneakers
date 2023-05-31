import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ count, handleChange, page, pagePerCount }) => {
  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={pagePerCount}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={handleChange}
      hideDisabled={true}
    />
  );
};

export default Paging;
