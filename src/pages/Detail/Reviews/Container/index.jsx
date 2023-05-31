import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductReviews } from "../../../../api/review";
import UIReviews from "../UIReviews";
const Reviews = () => {
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState();
  const [page, setPage] = useState(1);
  const clickToReview = (index) => {
    if (index === isClicked) {
      setIsClicked();
      return;
    }
    setIsClicked(index);
  };
  let {
    isLoading,
    data: productReviews,
    refetch,
  } = useQuery(["review", id], () => getProductReviews(id, page));
  const productReviewsCount = productReviews?.count;
  productReviews = productReviews?.reviews;

  const handlePageChange = async (page) => {
    setPage(page);
    productReviews = await getProductReviews(id, page);
    refetch();
  };
  return (
    <UIReviews
      isLoading={isLoading}
      productReviews={productReviews}
      productReviewsCount={productReviewsCount}
      clickToReview={clickToReview}
      isClicked={isClicked}
      page={page}
      handlePageChange={handlePageChange}
    />
  );
};

export default Reviews;
