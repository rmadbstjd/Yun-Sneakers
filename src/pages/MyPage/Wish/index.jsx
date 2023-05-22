import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Style from "./styles";
import MypageSide from "../../../components/MypageSide";
import Navbar from "./../../../components/common/Navbar/index";
import { getLikedProducts } from "../../../api/like";
import ProductCard from "../../../components/common/ProductCard";
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
      if (product) setCount(product?.length - 1 || 0);
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
                <ProductCard
                  key={product.name}
                  width={"190px"}
                  height={"320px"}
                  margin={"20px 30px 30px 0px"}
                  product={product}
                  refetch={refetch}
                  deletable={true}
                ></ProductCard>
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
                    style={{
                      border: "solid gray 1px",
                      borderRadius: "15px",
                      width: "80px",
                      height: "30px",
                      lineHeight: "190%",
                      margin: "0px 10px 0px 0px",
                      hoverColor: "white",
                      hoverBackground: "black",
                    }}
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
