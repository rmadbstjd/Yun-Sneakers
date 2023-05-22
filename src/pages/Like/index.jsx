import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/common/ProductCard";
import { getLikedProducts } from "../../api/like";
import { pushLike } from "../../api/like";
import Navbar from "./../../components/common/Navbar/index";
import HorizonLine from "../../components/common/HorizonLine";
import LoadingSpinner from "./../../components/common/LoadingSpinner";
import Button from "../../components/common/button";
const Like = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const {
    isLoading,
    data: product,
    refetch,
  } = useQuery(["like"], () => getLikedProducts());

  const goToDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  const clickToDeleteBtn = async (e, productId) => {
    e.stopPropagation();
    product && (await pushLike(productId));
    refetch();
  };

  useEffect(() => {
    if (product) setCount(product?.length - 1 || 0);
  }, [product]);
  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.ProductsContainer>
          <Style.TitleContainer>
            <Style.Title>좋아요를 누른 상품 ♥ ( {count} )</Style.Title>
            <HorizonLine
              width={"98.8%"}
              border={"3px"}
              color={"black"}
              margin={"2% 0% 3% 0%"}
            />
          </Style.TitleContainer>
          {isLoading && (
            <LoadingSpinner
              width={"100%"}
              margin={"100px 0px 0px 0px"}
              text="상품을 불러오는 중입니다."
            ></LoadingSpinner>
          )}
          {product?.map((item) =>
            item.map((product) => (
              <ProductCard
                key={product.name}
                width={"190px"}
                height={"320px"}
                margin={"20px 30px 30px 0px"}
                product={product}
                deletable={true}
                onClick={(e) => clickToDeleteBtn(e, product.id)}
                navigate={() => goToDetail(product.id)}
              ></ProductCard>
            ))
          )}

          {product &&
          product[0]?.length === 0 &&
          product &&
          product[1]?.length === undefined ? (
            <Style.NoneProductsContainer>
              <div>
                <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                <Button
                  style={{
                    border: "solid gray 1px",
                    background: "white",
                    margin: "5% 0px 0px 15%",
                    width: "350px",
                    height: "80px",
                    padding: "20px",
                    color: "#3a3b3c",
                    fontSize: "25px",
                    fontWeight: "bolder",
                    hoverBackground: "black",
                    hoverColor: "white",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  CONTINUE SHOPPING{" "}
                </Button>
              </div>
            </Style.NoneProductsContainer>
          ) : null}
        </Style.ProductsContainer>
      </Style.Container>
    </>
  );
};

export default Like;
