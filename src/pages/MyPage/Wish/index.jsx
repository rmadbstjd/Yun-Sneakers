import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Style from "./styles";
import MypageSide from "../../../components/MypageSide";
import Navbar from "./../../../components/common/Navbar/index";
import { getLikedProducts } from "../../../api/like";
import ProductLikeCard from "../../../components/ProductLikeCard";
import ProductCard from "../../../components/ProductCard";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Button from "../../../components/common/button";
const Wish = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const {
    isLoading,
    data: product,
    refetch,
  } = useQuery(["like"], () => getLikedProducts(), {
    enabled: true,
  });
  const goToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    if (product) {
      setCount(product[1]?.length || 0);
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
            width={"1200px"}
            border={4}
            color={"black"}
          ></Style.HorizonLine>
          <Style.ProductsContainer>
            {isLoading && (
              <LoadingSpinner
                margin={"50px 0px 0px 0px"}
                width={"100%"}
                text={"상품을 준비하고 있습니다."}
              />
            )}
            {product?.map((item) =>
              item.map((product) => (
                <ProductLikeCard
                  key={product.id}
                  product={product}
                  refetch={refetch}
                ></ProductLikeCard>
              ))
            )}
            {product &&
            product[0].length === 0 &&
            product &&
            product[1]?.length === undefined ? (
              <Style.NoneProductContainer>
                <div>
                  <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                  <Button
                    border={"solid gray 1px"}
                    width={"350px"}
                    height={"80px"}
                    margin={"5% 0% 0% 14%"}
                    fontSize={"25px"}
                    padding={"20px"}
                    color={"3a3b3c"}
                    fontWeight={"bold"}
                    hoverColor={"white"}
                    hoverBackground={"black"}
                    onClick={goToMain}
                  >
                    CONTINUE SHOPPING{" "}
                  </Button>
                </div>
              </Style.NoneProductContainer>
            ) : null}
          </Style.ProductsContainer>
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default Wish;
