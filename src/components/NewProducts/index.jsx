import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import * as Style from "./styles";
import userInfoStore from "../../store/userInfoStore";
import Arrow from "../Arrow";
const Products = () => {
  const { product } = userInfoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["new", currentPage], () => product.getProducts(currentPage));

  useEffect(() => {}, [products]);
  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>New In</Style.TitleENG>
        <Style.TitleKOR>새로운 상품</Style.TitleKOR>
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        <Style.MoreContainer>
          <Style.More>
            <Arrow currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </Style.More>
        </Style.MoreContainer>
      </Style.ProductsContainer>
    </Style.Container>
  );
};

export default Products;
