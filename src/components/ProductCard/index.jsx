import React from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import convertToPrice from "../../hooks/convertToPrice";
import jwt_decode from "jwt-decode";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const info = token && jwt_decode(token);
  const goToDetail = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Style.Card onClick={goToDetail}>
      <Style.Img src={product && product.image}></Style.Img>
      <div>
        <Style.CategoryContainer>
          <Style.Category>{product && product.category[0]}</Style.Category>
        </Style.CategoryContainer>
        <Style.Info>
          <div>{product && product.description} </div>
          <Style.Name>{product && product.name}</Style.Name>
          <Style.PriceContainer>
            <>{convertToPrice(product.price)}원</>
            <Style.HeartContainer>
              <HiHeart
                style={{ marginTop: "-4px", color: "red", fontSize: "18px" }}
              />
              <Style.Num>{product && product.likeNum}</Style.Num>
            </Style.HeartContainer>
          </Style.PriceContainer>
        </Style.Info>
      </div>
    </Style.Card>
  );
};

export default ProductCard;
