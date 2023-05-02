import React from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
const SimilarProducts = ({ products }) => {
  const navigate = useNavigate();
  const goToDetailPage = () => {
    navigate(`/products/${products.id}`);
  };
  return (
    <Style.Product onClick={goToDetailPage}>
      <Style.Img alt="상품" src={products.image}></Style.Img>
      <Style.Category>{products.category[0]}</Style.Category>
      <Style.Name>{products.name}</Style.Name>
      <Style.Price>
        {products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
      </Style.Price>
    </Style.Product>
  );
};

export default SimilarProducts;
