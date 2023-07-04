import React from "react";
import * as Style from "./styles";
import Navbar from "../../../components/common/Navbar/Container";
import HorizonLine from "../../../components/common/HorizonLine";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import ProductCard from "../../../components/common/ProductCard";
import Button from "../../../components/common/button";
const UILikePage = ({
  count,
  isLoading,
  products,
  clickToDeleteBtn,
  goToDetail,
  navigate,
}) => {
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
          {isLoading === true ? (
            <LoadingSpinner width={"100%"} margin={"100px 0px 0px 0px"}>
              좋아요를 누른 상품을 불러오는 중입니다.
            </LoadingSpinner>
          ) : count === 0 ? (
            <Style.NoneProductsContainer>
              <div>
                <Style.Span>좋아요를 누른 상품이 없습니다.</Style.Span>
                <Button
                  style={{
                    border: "solid gray 1px",
                    background: "white",
                    margin: "5% 0px 0px 15%",
                    width: "350px",
                    height: "60px",
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
                  CONTINUE SHOPPING
                </Button>
              </div>
            </Style.NoneProductsContainer>
          ) : null}
        </Style.ProductsContainer>
      </Style.Container>
    </>
  );
};

export default UILikePage;
