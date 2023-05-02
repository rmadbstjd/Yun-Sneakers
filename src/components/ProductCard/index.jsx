import React from "react";
import { useNavigate } from "react-router-dom";
import { HiHeart } from "@react-icons/all-files/hi/HiHeart";
import * as Style from "./styles";
import convertStringToNumber from "../../utils/convertStringToNumber";

const ProductCard = ({
  product,
  width = "200px",
  height = "200px",
  margin = "20px 30px 20px 0px",
}) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Style.Card
      width={width}
      height={height}
      margin={margin}
      onClick={goToDetail}
    >
      <Style.Img src={product?.image} alt="상품"></Style.Img>
      <div>
        <Style.CategoryContainer>
          <Style.Category>{product?.category[0]}</Style.Category>
        </Style.CategoryContainer>
        <Style.Info>
          <div>{product?.description} </div>
          <Style.Name>{product?.name}</Style.Name>
          <Style.PriceContainer>
            <>{convertStringToNumber(product?.price)}원</>
            <Style.HeartContainer>
              <HiHeart
                style={{ marginTop: "-4px", color: "red", fontSize: "18px" }}
              />
              <Style.Num>{product?.likeNum}</Style.Num>
            </Style.HeartContainer>
          </Style.PriceContainer>
        </Style.Info>
      </div>
    </Style.Card>
  );
};

export default ProductCard;
