import React from "react";
import ProductCard from "../ProductCard";
import LoadingSpinner from "../common/LoadingSpinner";
import * as Style from "./styles";
import Button from "../common/button";

const MainProducts = ({
  isLoading,
  products,
  showMoreBtn,
  ClickToShowMoreProductsBtn,
  width,
  titleKOR,
  titleENG,
}) => {
  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>{titleENG}</Style.TitleENG>
        <Style.TitleKOR>{titleKOR}</Style.TitleKOR>
        {isLoading && (
          <LoadingSpinner
            width={width}
            margin={"100px 0px 0px 0px"}
            text={"상품을 불러오는 중입니다."}
          ></LoadingSpinner>
        )}
        {products?.map((product) =>
          product?.map((product) => (
            <ProductCard
              width={"200px"}
              height={"200px"}
              margin={"20px 56px 150px 0px"}
              key={product.name}
              product={product}
            ></ProductCard>
          ))
        )}
        <Style.MoreContainer>
          <Style.More>
            {!isLoading && (
              <Button
                border={"solid gray 1px"}
                borderRadius={"10px"}
                color={"black"}
                hoverColor={"white"}
                hoverBackground={"black"}
                background={"white"}
                fontWeight={500}
                fontSize={"16px"}
                width={"100px"}
                height={"40px"}
                lineHeight={"10%"}
                isShow={showMoreBtn}
                onClick={ClickToShowMoreProductsBtn}
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

export default MainProducts;
