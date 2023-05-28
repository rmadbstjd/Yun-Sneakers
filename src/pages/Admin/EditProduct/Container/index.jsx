import React from "react";
import { useLocation } from "react-router-dom";
import UIEditProduct from "../UIEditProduct";
import useGetProductInfo from "../../../../hooks/useGetProductInfo";
const EditProduct = () => {
  const location = useLocation();
  const id = location.state.productId;
  const { productInfo } = useGetProductInfo(id);
  return <UIEditProduct productInfo={productInfo}></UIEditProduct>;
};

export default EditProduct;
