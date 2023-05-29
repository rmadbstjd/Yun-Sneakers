import React from "react";
import ExistReviews from "./ExistReviews";
import NotExistsReviews from "./NotExistReviews";

const UIReviewPage = ({
  stateReview,
  setStateReview,
  completedProducts,
  product,
  isLoading,
  isLoading2,
  goToDetail,
  goToSearch,
  setPrice,
  setShowModal,
  setNumber,
  showModal,
  number,
  refetch,
  refetch2,
  setDeleted,
}) => {
  return stateReview === true ? (
    <ExistReviews
      stateReview={stateReview}
      setStateReview={setStateReview}
      completedProducts={completedProducts}
      product={product}
      isLoading={isLoading}
      isLoading2={isLoading2}
      goToDetail={goToDetail}
      goToSearch={goToSearch}
      setPrice={setPrice}
      setShowModal={setShowModal}
      setNumber={setNumber}
      showModal={showModal}
      number={number}
      refetch={refetch}
      refetch2={refetch2}
      setDeleted={setDeleted}
    />
  ) : (
    <NotExistsReviews
      stateReview={stateReview}
      setStateReview={setStateReview}
      completedProducts={completedProducts}
      product={product}
      isLoading={isLoading}
      isLoading2={isLoading2}
      goToDetail={goToDetail}
      goToSearch={goToSearch}
      setPrice={setPrice}
      setShowModal={setShowModal}
      setNumber={setNumber}
      showModal={showModal}
      number={number}
      refetch={refetch}
      refetch2={refetch2}
      setDeleted={setDeleted}
    />
  );
};

export default UIReviewPage;
