import React from "react";
import UILikePage from "../UILikePage";
import { useNavigate } from "react-router-dom";
import { useGetLikedProducts } from "../../../hooks/useGetLikedProducts";
import { pushLike } from "../../../api/like";
const LikePage = () => {
  const navigate = useNavigate();
  const { isLoading, products, refetch, count } = useGetLikedProducts();
  const goToDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  const clickToDeleteBtn = async (e, productId) => {
    e.stopPropagation();
    products && (await pushLike(productId));
    refetch();
  };
  return (
    <UILikePage
      count={count}
      isLoading={isLoading}
      products={products}
      clickToDeleteBtn={clickToDeleteBtn}
      goToDetail={goToDetail}
      navigate={navigate}
    />
  );
};

export default LikePage;
