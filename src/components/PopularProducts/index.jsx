import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import { useImmer } from "use-immer";
import * as Style from "./styles";
import userInfoStore from "../../store/userInfoStore";

const ShowPopularProducts = () => {
  const { product } = userInfoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const { isLoading, data: products } = useQuery(["popular", currentPage], () =>
    product.getPopularProducts(currentPage)
  );
  const [moreProducts, setMoreProducts] = useImmer([]);

  const ClickToMoreProduct = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage >= 4) setShowMoreBtn(false);
  };
  useEffect(() => {
    products &&
      setMoreProducts((product) => {
        product.push(products);
      });
  }, [products, currentPage]);

  return (
    <Style.Container>
      <Style.ProductsContainer>
        <Style.TitleENG>Most Popular</Style.TitleENG>
        <Style.TitleKOR>인기 있는 상품</Style.TitleKOR>

        {moreProducts &&
          moreProducts.map((product) =>
            product.map((product) => (
              <ProductCard key={product.name} product={product}></ProductCard>
            ))
          )}
        <Style.MoreContainer>
          <Style.More>
            <Style.Btn isShow={showMoreBtn} onClick={ClickToMoreProduct}>
              더보기
            </Style.Btn>
          </Style.More>
        </Style.MoreContainer>
      </Style.ProductsContainer>
    </Style.Container>
  );
};

export default ShowPopularProducts;
