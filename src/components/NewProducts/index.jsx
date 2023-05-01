import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import * as Style from "./styles";
import { getNewProducts } from "../../api/product";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/button";
const Products = () => {
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data: products } = useQuery(["new", currentPage], () =>
    getNewProducts(currentPage)
  );

  const ClickToMoreProduct = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage >= 4) setShowMoreBtn(false);
  };

  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>New In</Style.TitleENG>
        <Style.TitleKOR>새로운 상품</Style.TitleKOR>
        {isLoading && (
          <LoadingSpinner
            width={"94.8%"}
            margin={"100px 0px 0px 0px"}
            text={"상품을 불러오는 중입니다."}
          ></LoadingSpinner>
        )}
        {products &&
          products.map((product) =>
            product.map((product) => (
              <ProductCard key={product.name} product={product}></ProductCard>
            ))
          )}
        <Style.MoreContainer>
          <Style.More>
            {!isLoading && (
              <Button
                border={"solid gray 1px"}
                borderRadius={"10px"}
                color={"black"}
                background={"white"}
                fontWeight={500}
                fontSize={"16px"}
                width={"100px"}
                height={"40px"}
                lineHeight={"10%"}
                isShow={showMoreBtn}
                onClick={ClickToMoreProduct}
              >
                더보기
              </Button>
            )}
          </Style.More>
        </Style.MoreContainer>
      </Style.ProductsContainer>
    </Style.Container>
  );
};

export default Products;
