import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductLikeCard from "../../components/ProductLikeCard";
import userInfoStore from "../../store/userInfoStore";
import Navbar from "./../../components/common/Navbar/index";
import HorizonLine from "../../components/common/HorizonLine";
const Like = () => {
  const navigate = useNavigate();
  const { like } = userInfoStore();
  const [count, setCount] = useState(0);
  const { data: product, refetch } = useQuery(["like"], () =>
    like.getLikedProducts()
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
          <Style.TitleContainer>
            <Style.Title>좋아요를 누른 상품 ♥ ( {count} )</Style.Title>
            <HorizonLine
              width={"98.8%"}
              border={"3px"}
              color={"black"}
              margin={"2% 0% 3% 0%"}
            />
          </Style.TitleContainer>

          {product &&
            product.map((item) =>
              item.map((product) => (
                <ProductLikeCard
                  key={product.name}
                  product={product}
                  refetch={refetch}
                ></ProductLikeCard>
              ))
            )}

          {product && product.length === 0 ? (
            <Style.NoneProductsContainer>
              <div>
                <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                <Style.GoToMainBtn
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  CONTINUE SHOPPING{" "}
                </Style.GoToMainBtn>
              </div>
            </Style.NoneProductsContainer>
          ) : null}
        </Style.ProductsContainer>
      </Style.Container>
    </>
  );
};

export default Like;
