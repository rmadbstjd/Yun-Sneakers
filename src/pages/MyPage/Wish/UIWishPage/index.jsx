import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import MypageSide from "../../../../components/MypageSide/Container";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import ProductCard from "../../../../components/common/ProductCard";
import Button from "../../../../components/common/button";
const UIWishPage = ({
  count,
  isLoading,
  products,
  clickToDeleteBtn,
  goToDetail,
  goToMain,
}) => {
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
              <LoadingSpinner margin={"50px 0px 0px 0px"} width={"100%"}>
                좋아요를 누른 상품을 준비하고 있습니다.
              </LoadingSpinner>
            )}
            {products?.map((product) => (
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
            ))}
            {products?.length === 0 ? (
              <Style.NoneProductContainer>
                <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                <Button
                  style={{
                    border: "solid gray 1px",
                    borderRadius: "15px",
                    width: "200px",
                    height: "40px",
                    lineHeight: "190%",
                    margin: "50px 10px 0px 0px",
                    hoverColor: "white",
                    hoverBackground: "black",
                  }}
                  onClick={goToMain}
                >
                  CONTINUE SHOPPING{" "}
                </Button>
              </Style.NoneProductContainer>
            ) : null}
          </Style.ProductsContainer>
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default UIWishPage;
