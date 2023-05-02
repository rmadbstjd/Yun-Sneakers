import React from "react";
import { useLocation } from "react-router-dom";
import InputProduct from "../../../components/AddProductForm";
import { useQuery } from "@tanstack/react-query";
import { getProductInfo } from "../../../api/product";
const EditProduct = () => {
  const location = useLocation();
  const id = location.state.productId;

  const { data: productInfo } = useQuery(["edit", id], () =>
    getProductInfo(id)
  );

  return (
    <InputProduct
      title={"상품 수정하기"}
      type={"수정"}
      productInfo={productInfo}
    ></InputProduct>
  );
};

export default EditProduct;
