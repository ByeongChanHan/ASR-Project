import React, { useState } from "react";
import "../css/Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ maxitems }) => {
  const [page, setPage] = useState(1); //현재 페이지 넘버
  const [totalCount, setTotalCount] = useState(20); // 보여줄 Row갯수
  const [maxitemCount, setmaxitemCount] = useState(0);

  //   const resultPageNum = maxitems / 20; // 몫이 1이 넘으면 (Row갯수가 20개가 넘으면) 페이징 숫자를 셋팅
  //   const restPageNum = maxitems % 20; // 20개로 나눈 나머지가 0 보다 크면 표시해주기 위함

  //   if (resultPageNum > 1) {
  //     setpageRange(resultPageNum);
  //   }
  //   if (maxitems > 20 && restPageNum > 0) {
  //     setTotalCount(restPageNum);
  //   }

  //페이지를 바꿀때마다 호출
  const handlePageChange = (page) => {
    const restPageNum = maxitems % 20; // 20개로 나눈 나머지가 0 보다 크면 표시해주기 위함
    // setmaxitemCount();
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={totalCount}
      totalItemsCount={maxitems}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
