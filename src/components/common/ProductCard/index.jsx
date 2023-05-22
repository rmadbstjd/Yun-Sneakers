import React from "react";

import { HiHeart } from "@react-icons/all-files/hi/HiHeart";
import { AiFillCloseSquare } from "@react-icons/all-files/ai/AiFillCloseSquare";
import * as Style from "./styles";
import convertStringToNumber from "../../../utils/convertStringToNumber";

const ProductCard = ({
  product,
  width = "200px",
  height = "200px",
  margin = "20px 30px 20px 0px",
  deletable = false,
  onClick,
  navigate,
}) => {
  return (
    <Style.Card
      width={width}
      height={height}
      margin={margin}
      onClick={navigate}
    >
      {deletable === true ? (
        <Style.DeleteBtn>
          <AiFillCloseSquare size={30} onClick={onClick} />
        </Style.DeleteBtn>
      ) : null}
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
