import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductLikeCard from "../../components/ProductLikeCard";
import userInfoStore from "../../store/userInfoStore";
import { useNavigate } from "react-router-dom";
import Navbar from "./../../components/common/Navbar/index";
import * as Style from "./styles";
const Like = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };
  const { like } = userInfoStore();

  const [count, setCount] = useState(0);
  const { data: product, refetch } = useQuery(
    ["like"],
    () => like.getLikedProducts(),
    {
      enabled: true,
    }
  );

  useEffect(() => {
    if (product) {
      setCount(product.length);
    }
  }, [product]);

  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.ProductsContainer>
          <Style.ContentContainer>
            <Style.Title>좋아요를 누른 상품 ♥ ( {count} )</Style.Title>
            <Style.HorizonLine></Style.HorizonLine>
          </Style.ContentContainer>

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
            <Style.NoneProductsContainer>
              <div>
                <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                <Style.Btn onClick={goToMain}>CONTINUE SHOPPING </Style.Btn>
              </div>
            </Style.NoneProductsContainer>
          ) : null}
        </Style.ProductsContainer>
      </Style.Container>
    </>
  );
};

export default Like;
