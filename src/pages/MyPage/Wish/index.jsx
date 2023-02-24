import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Style from "./styles";
import MypageSide from "../../../components/MypageSide";
import Navbar from "./../../../components/common/Navbar/index";
import userInfoStore from "../../../store/userInfoStore";
import ProductLikeCard from "../../../components/ProductLikeCard";

const Wish = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { like } = userInfoStore();
  const { data: product, refetch } = useQuery(
    ["like"],
    () => like.getLikedProducts(),
    {
      enabled: true,
    }
  );
  const goToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    if (product) {
      setCount(product.length);
    }
  }, [product]);
  return (
    <>
      <Navbar />
      <Style.MyPageContainer>
        <MypageSide />
        <Style.MainContainer>
          <Style.Title>관심 상품 ( {count} )</Style.Title>
          <Style.HorizonLine
            width={"1190px"}
            border={3}
            color={"black"}
          ></Style.HorizonLine>
          <Style.ProductsContainer>
            {product &&
              product.map((item) =>
                item.map((product) => (
                  <ProductLikeCard
                    product={product}
                    refetch={refetch}
                  ></ProductLikeCard>
                ))
              )}
            {product && product.length === 0 ? (
              <Style.noneProductContainer>
                <div>
                  <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                  <Style.Btn onClick={goToMain}>CONTINUE SHOPPING </Style.Btn>
                </div>
              </Style.noneProductContainer>
            ) : null}
          </Style.ProductsContainer>
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default Wish;
