import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyQna } from "../../../../api/qna";
import { useGeyMyQna } from "../../../../hooks/useGeyMyQna";
import UIQnAPage from "../UIQnAPage";

const QnA = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState();
  const [page, setPage] = useState(1);
  let { isLoading, myQnAs, QnAcounts, refetch } = useGeyMyQna(page);

  const goToDetailPage = (productId) => {
    navigate(`/products/${productId}`);
  };

  const clickToQnA = (index) => {
    if (index === showContent) {
      setShowContent();
      return;
    }
    setShowContent(index);
  };

  const handlePageChange = async (page) => {
    setPage(page);
    myQnAs = await getMyQna(page);
    refetch();
  };
  return (
    <UIQnAPage
      isLoading={isLoading}
      myQnAs={myQnAs}
      showContent={showContent}
      clickToQnA={clickToQnA}
      goToDetailPage={goToDetailPage}
      QnAcounts={QnAcounts}
      page={page}
      handlePageChange={handlePageChange}
    />
  );
};

export default QnA;
