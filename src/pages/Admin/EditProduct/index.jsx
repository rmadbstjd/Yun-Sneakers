import React from "react";
import { useLocation } from "react-router-dom";
import InputProduct from "../../../components/InputProduct";
import { useQuery } from "@tanstack/react-query";
import userInfoStore from "../../../store/userInfoStore";
const EditProduct = () => {
  const { product } = userInfoStore();
  const location = useLocation();
  const id = location.state.productId;

  const {
    isLoading,
    error,
    data: productInfo,
  } = useQuery(["edit", id], () => product.getProductInfo(id));

  return (
    <InputProduct
      title={"상품 수정하기"}
      type={"수정"}
      productInfo={productInfo}
    ></InputProduct>
  );
};

export default EditProduct;