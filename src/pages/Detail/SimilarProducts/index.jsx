import React from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
const SimilarProducts = ({ products, width }) => {
  const navigate = useNavigate();
  const goToDetailPage = () => {
    navigate(`/products/${products.id}`);
  };
  return (
    <Style.Product width={width} onClick={goToDetailPage}>
      <Style.Img width={width} alt="상품" src={products.image}></Style.Img>
      <Style.Category>{products.category[0]}</Style.Category>
      <Style.Name width={width}>{products.name}</Style.Name>
      <Style.Price>
        {products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
      </Style.Price>
    </Style.Product>
  );
};

export default SimilarProducts;
