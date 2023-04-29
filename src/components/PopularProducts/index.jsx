import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import LoadingSpinner from "../common/LoadingSpinner";
import * as Style from "./styles";
import userInfoStore from "../../store/userInfoStore";
const ShowPopularProducts = () => {
  const { product } = userInfoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const { isLoading, data: products } = useQuery(["popular", currentPage], () =>
    product.getPopularProducts(currentPage)
  );

  const ClickToMoreProduct = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage >= 4) setShowMoreBtn(false);
  };

  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>Most Popular</Style.TitleENG>
        <Style.TitleKOR>인기 있는 상품</Style.TitleKOR>
        {isLoading && (
          <LoadingSpinner
            width={"100%"}
            margin={"100px 0px 0px 0px"}
            text="상품을 불러오는 중입니다."
          ></LoadingSpinner>
        )}
        {products?.map((product) =>
          product?.map((product) => (
            <ProductCard key={product.name} product={product}></ProductCard>
          ))
        )}
        <Style.MoreContainer>
          <Style.More>
            {!isLoading && (
              <Style.Btn isShow={showMoreBtn} onClick={ClickToMoreProduct}>
                더보기
              </Style.Btn>
            )}
          </Style.More>
        </Style.MoreContainer>
      </Style.ProductsContainer>
    </Style.Container>
  );
};

export default ShowPopularProducts;
