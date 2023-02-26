import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";

import * as Style from "./styles";
import userInfoStore from "../../store/userInfoStore";
import Arrow from "../Arrow";

const ShowPopularProducts = () => {
  const { product } = userInfoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products } = useQuery(["popular", currentPage], () =>
    product.getPopularProducts(currentPage)
  );
  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>Most Popular</Style.TitleENG>
        <Style.TitleKOR>인기 있는 상품</Style.TitleKOR>
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

export default ShowPopularProducts;
