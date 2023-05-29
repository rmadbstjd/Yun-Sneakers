import React from "react";
import { useNavigate } from "react-router-dom";
import * as Style from "./styles";
import MypageSide from "../../../components/MypageSide/Container";
import Navbar from "../../../components/common/Navbar/Container/index";
import { pushLike } from "../../../api/like";
import ProductCard from "../../../components/common/ProductCard";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Button from "../../../components/common/button";
import { useGetLikedProducts } from "../../../hooks/useGetLikedProducts";
const Wish = () => {
  const navigate = useNavigate();

  const { isLoading, products, refetch, count } = useGetLikedProducts();

  const goToMain = () => {
    navigate("/");
  };

  const clickToDeleteBtn = async (e, productId) => {
    e.stopPropagation();
    products && (await pushLike(productId));
    refetch();
  };

  const goToDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

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
            {products?.map((item) =>
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
            {count === 0 ? (
              <Style.NoneProductContainer>
                <div>
                  <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                </div>
              </Style.NoneProductContainer>
            ) : null}
            <Button
              style={{
                border: "solid gray 1px",
                borderRadius: "15px",
                width: "200px",
                height: "40px",
                lineHeight: "190%",
                margin: "-30px 10px 0px 500px",
                hoverColor: "white",
                hoverBackground: "black",
              }}
              onClick={goToMain}
            >
              CONTINUE SHOPPING{" "}
            </Button>
          </Style.ProductsContainer>
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default Wish;
