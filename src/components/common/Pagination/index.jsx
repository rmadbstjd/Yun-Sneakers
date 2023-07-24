import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ margin, count, handleChange, page, pagePerCount }) => {
  return (
    <div style={{ margin }}>
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
    </div>
  );
};

export default Paging;
