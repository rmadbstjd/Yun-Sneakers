import React from "react";
import { useLocation } from "react-router-dom";
import EditProductForm from "../../../components/Form/ProductForm/EditProductFormContainer";
import { useQuery } from "@tanstack/react-query";
import { getProductInfo } from "../../../api/product";
const EditProduct = () => {
  const location = useLocation();
  const id = location.state.productId;

  const { data: productInfo } = useQuery(["edit", id], () =>
    getProductInfo(id)
  );

  return <EditProductForm productInfo={productInfo}></EditProductForm>;
};

export default EditProduct;
