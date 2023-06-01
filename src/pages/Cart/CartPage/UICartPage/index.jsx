import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import HorizonLine from "../../../../components/common/HorizonLine";
import CartProducts from "../../CartProducts/Container";
import Button from "../../../../components/common/button";
import convertStringToNumber from "./../../../../utils/convertStringToNumber";
const UICartPage = ({
  isLoading,
  handleAllCheck,
  checkedProducts,
  cartProducts,
  refetch,
  handleSingleCheck,
  setCheckedProducts,
  price,
  navigate,
  clickToBuyBtn,
}) => {
  return (
    <div>
      <Navbar />
      <Style.Layout>
        <Style.ProductsContainer>
          <Style.TitleLayout>
            <Style.Title>ORDER / PAYMENT</Style.Title>
          </Style.TitleLayout>
          <Style.HeaderLayout>
            <Style.HeaderContainer>
              {isLoading && (
                <LoadingSpinner width={"100%"} margin={"80px 0px 80px 500px"}>
                  상품을 불러오는 중입니다.
                </LoadingSpinner>
              )}
              <Style.HeaderContent width={4.8}>
                <Style.Input
                  type="checkbox"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={
                    checkedProducts?.length === cartProducts?.products?.length
                      ? true
                      : false
                  }
                ></Style.Input>
              </Style.HeaderContent>
              <Style.HeaderContent width={67}>상품명(옵션)</Style.HeaderContent>
              <Style.HeaderContent width={38.9}>수량</Style.HeaderContent>
              <Style.HeaderContent width={38.9}>주문 금액</Style.HeaderContent>
              <Style.HeaderContent width={31}>주문 관리</Style.HeaderContent>
            </Style.HeaderContainer>
          </Style.HeaderLayout>
          {cartProducts?.products?.map((item) => (
            <CartProducts
              key={`${item.productId}+${item.size}`}
              productId={item.productId}
              item={item}
              refetch={refetch}
              handleSingleCheck={handleSingleCheck}
              checkedProducts={checkedProducts}
              setCheckedProducts={setCheckedProducts}
            />
          ))}
          <HorizonLine
            width={"116%"}
            border={"5px"}
            color={"black"}
            margin={"9% 0px 0px 0px"}
          ></HorizonLine>
          <Style.PayContainer>
            <Style.PayContent width={30} fontSize={20}>
              총 주문금액
            </Style.PayContent>
            <Style.PayContent width={53} fontSize={20}>
              총 배송비
            </Style.PayContent>
            <Style.PayContent width={25} fontSize={20}>
              총 결제 금액
            </Style.PayContent>
          </Style.PayContainer>

          <Style.PayContainer>
            <Style.PayContent width={27.5} margin={true} fontSize={25}>
              <Style.Count>총 {checkedProducts?.length}개</Style.Count>
              {convertStringToNumber(price)}원
            </Style.PayContent>
            <Style.SymbolContainer>
              <Style.Symbol> + </Style.Symbol>
              <Style.PayContent fontSize={25}>0원</Style.PayContent>
              <Style.Symbol> = </Style.Symbol>
            </Style.SymbolContainer>

            <Style.PayContent width={23} margin={true} fontSize={25}>
              {convertStringToNumber(price)}원
            </Style.PayContent>
          </Style.PayContainer>
          <HorizonLine
            width={"116%"}
            border={"5px"}
            color={"black"}
            margin={"3% 0px 0px 0px"}
          ></HorizonLine>

          <Style.FooterContainer>
            <Button
              style={{
                width: "30%",
                border: "solid black 1px",
                height: "65px",
                lineHeight: "270%",
                margin: "0px 10px 0px 0px",
                fontWeight: "bolder",
                background: "white",
                color: "#3a3b3c",
                hoverColor: "#a5ba93",
                fontSize: "25px",
              }}
              isShow={true}
              onClick={() => {
                navigate("/");
              }}
            >
              쇼핑 계속하기
            </Button>
            <Button
              style={{
                width: "30%",
                border: "solid black 1px",
                height: "65px",
                lineHeight: "270%",
                margin: "0px 10px 0px 0px",
                fontWeight: "bolder",
                background: "black",
                color: "white",
                hoverColor: "#a5ba93",
                hoverBackground: "black",
                fontSize: "25px",
              }}
              isShow={true}
              onClick={() => {
                clickToBuyBtn();
              }}
            >
              구매하기
            </Button>
          </Style.FooterContainer>
        </Style.ProductsContainer>
      </Style.Layout>
    </div>
  );
};

export default UICartPage;
