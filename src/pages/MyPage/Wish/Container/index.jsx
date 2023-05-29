import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetLikedProducts } from "../../../../hooks/useGetLikedProducts";
import { pushLike } from "../../../../api/like";
import UIWishPage from "../UIWishPage";
const Wish = () => {
  const navigate = useNavigate();
  const { isLoading, products, refetch, count } = useGetLikedProducts();
  const goToMain = () => {
    navigate("/");
  };

  const clickToDeleteBtn = async (e, productId) => {
    e.stopPropagation();
    products && (await pushLike(productId));
    refetch();
  };

  const goToDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <UIWishPage
      count={count}
      isLoading={isLoading}
      products={products}
      clickToDeleteBtn={clickToDeleteBtn}
      goToDetail={goToDetail}
      goToMain={goToMain}
    />
  );
};

export default Wish;
