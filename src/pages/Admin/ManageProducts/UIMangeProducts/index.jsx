import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import convertStringToNumber from "../../../../utils/convertStringToNumber";
import Button from "../../../../components/common/button";
import Pagination from "react-js-pagination";
import LoadingSpinner from "./../../../../components/common/LoadingSpinner/index";
const NavbarItems = ["상품명", "상품코드", "가격", "관리"];
const UIManageProducts = ({
  isLoading,
  products,
  goToDetailPage,
  clickToDeleteBtn,
  clickToEditBtn,
  productsCount,
  page,
  handleChange,
}) => {
  return (
    <div>
      <Navbar />
      <Style.MyPageContainer>
        <Style.MainContainer>
          <Style.Title>상품 관리</Style.Title>
          <Style.ReviewContainer>
            <Style.ReviewLeftTitle>상품</Style.ReviewLeftTitle>

            <Style.HorizonLine
              width={"1280px"}
              border={3}
              color={"black"}
            ></Style.HorizonLine>
          </Style.ReviewContainer>
          <Style.TopContainer>
            <Style.TopItem width={"610px"}>{NavbarItems[0]}</Style.TopItem>
            <Style.TopItem width={"70px"}>{NavbarItems[1]}</Style.TopItem>
            <Style.TopItem width={"645px"}>{NavbarItems[2]}</Style.TopItem>
            <Style.TopItem width={"60px"}>{NavbarItems[3]}</Style.TopItem>
          </Style.TopContainer>

          <Style.HorizonLine
            width={"1465px"}
            border={3}
            color={"black "}
          ></Style.HorizonLine>
          {isLoading && (
            <LoadingSpinner width={"100%"} margin={"100px 0px 0px 0px"}>
              상품을 준비하는 중입니다.
            </LoadingSpinner>
          )}
          {products?.map((product) => (
            <div key={product.id}>
              <Style.ProductContent>
                <Style.Img
                  alt="상품"
                  src={product.image}
                  onClick={() => {
                    goToDetailPage(product.id);
                  }}
                ></Style.Img>
                <Style.Info>
                  <Style.Text>
                    <span>[카테고리] {product.category}</span>
                  </Style.Text>
                  <Style.Text>
                    <span>{product.name}</span>
                  </Style.Text>
                  <Style.Text>
                    <span>{product.description}</span>
                  </Style.Text>
                </Style.Info>

                <Style.PriceContainer height={"120px"}>
                  <div>{product.id}</div>
                </Style.PriceContainer>
                <Style.PriceContainer height={"120px"}>
                  <div>{convertStringToNumber(product.price)}</div>
                </Style.PriceContainer>
                <Style.BtnContainer>
                  <Button
                    style={{
                      border: "solid gray 1px",
                      width: "70px",
                      height: "25px",
                      background: "#303033",
                      lineHeight: "190%",
                      margin: "45px 0px 0px 10px",
                      fontSize: "13px",
                      color: "black",
                      hoverColor: "white",
                      hoverBackground: "black",
                    }}
                    onClick={() => clickToEditBtn(product.id)}
                  >
                    수정
                  </Button>
                  <Button
                    style={{
                      border: "solid gray 1px",
                      width: "70px",
                      height: "25px",
                      background: "#303033",
                      lineHeight: "190%",
                      margin: "45px 0px 0px 10px",
                      fontSize: "13px",
                      color: "black",
                      hoverColor: "white",
                      hoverBackground: "black",
                    }}
                    onClick={() => clickToDeleteBtn(product.id)}
                  >
                    삭제
                  </Button>
                </Style.BtnContainer>
              </Style.ProductContent>
            </div>
          ))}
        </Style.MainContainer>
      </Style.MyPageContainer>
      <Pagination
        count={productsCount}
        pagePerCount={5}
        page={page}
        handleChange={handleChange}
      ></Pagination>
    </div>
  );
};

export default UIManageProducts;
