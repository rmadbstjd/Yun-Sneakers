import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartStore from "../../../../store/cartStore";
import productStore from "../../../../store/productStore";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useGetUserCart } from "../../../../hooks/useGetUserCart";
import { getSimilarProducts } from "../../../../api/product";
import { pushLike, isLikedProduct } from "../../../../api/like";
import { addUserCart } from "../../../../api/cart";
import { useGetUserInfo } from "../../../../hooks/useGetUserInfo";
import useGetProductInfo from "./../../../../hooks/useGetProductInfo";
import { getProductReviews } from "./../../../../api/review";
import Swal from "sweetalert2";
import UIDetailPage from "../UIDetailPage";
import userInfoStore from "./../../../../store/userInfoStore";
import { useGetProductReviewRate } from "./../../../../hooks/useGetProductReviewRate";
const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { review } = userInfoStore();
  const { userId } = useGetUserInfo();
  const { plusCartCount } = cartStore();
  const token = localStorage.getItem("accessToken");
  const { selectSize } = productStore();
  const { productInfo } = useGetProductInfo(id);
  const { refetch: cartRefetch } = useGetUserCart();
  const { star } = useGetProductReviewRate();
  const products = productInfo?.product;
  const category = productInfo?.product?.category[0];
  const productId = productInfo?.product?.id;

  const { isLoading, data: similarProducts } = useQuery(
    ["similar", id],
    () => getSimilarProducts(category, id),
    { refetchOnMount: "alaways", enabled: !!category }
  );

  const { data: isLiked, refetch } = useQuery(
    ["isLiked", id],
    () => isLikedProduct(productId),
    { enabled: !!productId }
  );

  const { data: productReviews } = useQuery(
    ["review", id],
    () => getProductReviews(id),
    {
      enabled: !!productId,
    }
  );

  const [sizeModalShow, setSizeModalShow] = useState(false);
  const [cartModalShow, setCartModalShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const showSize = () => {
    setSizeModalShow((prev) => !prev);
    setModalIsOpen((prev) => !prev);
  };

  const clickToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!selectSize) {
      Swal.fire({
        title: "사이즈를 선택해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }

    setCartModalShow((prev) => !prev);
    setTimeout(setCartModalShow, 3000);
    const isSubmit = await addUserCart(products, selectSize);
    cartRefetch();
    if (!isSubmit?.success) return;
    plusCartCount(1);
  };

  const clickToLike = async () => {
    if (!token) navigate("/login");
    await pushLike(productInfo.product.id, userId);
    refetch();
  };

  return (
    <UIDetailPage
      productInfo={productInfo}
      star={star}
      review={review}
      productReviews={productReviews}
      showSize={showSize}
      selectSize={selectSize}
      sizeModalShow={sizeModalShow}
      setSizeModalShow={setSizeModalShow}
      cartModalShow={cartModalShow}
      modalIsOpen={modalIsOpen}
      navigate={navigate}
      clickToCart={clickToCart}
      token={token}
      clickToLike={clickToLike}
      isLiked={isLiked}
      category={category}
      isLoading={isLoading}
      similarProducts={similarProducts}
    />
  );
};

export default DetailPage;
