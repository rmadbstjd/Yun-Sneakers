import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNotReviewdProducts } from "../../../../api/order";
import {
  getUserWrittenReviews,
  deleteProductReview,
} from "../../../../api/review";
import Swal from "sweetalert2";
import UIReviewPage from "../UIReviewPage";
const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState();
  const [deleted, setDeleted] = useState(false);
  const [stateReview, setStateReview] = useState(true);
  const navigate = useNavigate();
  const {
    isLoading,
    data: product,
    refetch,
  } = useQuery([], () => getUserWrittenReviews());
  const {
    isLoading: isLoading2,
    data: completedProducts,
    refetch: refetch2,
  } = useQuery(["리뷰"], () => getNotReviewdProducts());

  const goToDetail = (info) => {
    navigate(`/products/${info.id}`);
  };
  const goToSearch = (info) => {
    navigate(`/search?keyword=${info.category}`);
  };
  const setPrice = (coupon, price) => {
    switch (coupon) {
      case "선택안함":
        return price;
      case "Welcome 5% 할인 쿠폰":
        return price * 0.95;
      case "10만원 이상 구매 시 10% 할인 쿠폰":
        return price * 0.9;
      case "20만원 이상 구매 시 20% 할인 쿠폰":
        return price * 0.8;
      default:
        break;
    }
  };
  const deleteReview = (orderId) => {
    Swal.fire({
      title: "리뷰를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "black",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProductReview(orderId);
        refetch();
        refetch2();
        setStateReview(true);
      } else {
        setShowModal(false);
      }
    });
  };

  useEffect(() => {
    if (deleted) {
      deleteReview(product[number].product.orderId);
      setDeleted(false);
    }
  }, [number, stateReview, deleted]);
  return (
    <UIReviewPage
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

export default Review;
