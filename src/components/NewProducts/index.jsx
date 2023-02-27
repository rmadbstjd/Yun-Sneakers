import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import * as Style from "./styles";
import { useImmer } from "use-immer";
import userInfoStore from "../../store/userInfoStore";
const Products = () => {
  const { product } = userInfoStore();
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["new", currentPage], () => product.getProducts(currentPage));
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
        <Style.TitleENG>New In</Style.TitleENG>
        <Style.TitleKOR>새로운 상품</Style.TitleKOR>
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

export default Products;
