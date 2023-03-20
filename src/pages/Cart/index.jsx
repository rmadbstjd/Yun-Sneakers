import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import cartStore from "../../store/cartStore";
import CartProduct from "../../components/CartProducts";
import HorizonLine from "../../components/common/HorizonLine";
import convertToPrice from "../../hooks/convertToPrice";
import Navbar from "./../../components/common/Navbar/index";
import LoadingSpinner from "../../components/common/LoadingSpinner";
const Cart = () => {
  const navigate = useNavigate();
  const { cart, initCartCount, plusCartCount } = cartStore();
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState();
  const {
    isLoading,
    data: cartProducts,
    refetch,
  } = useQuery(["totalPrice"], () => cart.getUserCarts());

  useEffect(() => {
    if (cartProducts) {
      setPrice(0);
      setCount(0);
      initCartCount();
      for (let i = 0; i < cartProducts.products.length; i++) {
        let newPrice = Number(
          cartProducts.products[i].price * cartProducts.products[i].quantity
        );

        setPrice((prev) => prev + newPrice);
        setCount((prev) => prev + cartProducts.products[i].quantity);
        plusCartCount(1);
      }
    } else {
      initCartCount();
    }
  }, [cartProducts]);

  if (cartProducts === null) {
    return (
      <>
        <Navbar />
        <Style.NullProductContainer>
          <Style.NullProductContentLayout>
            <HorizonLine
              width={"98%"}
              border={"5px"}
              margin={"8% 0px 0px 0px"}
              color={"black"}
            />
            <Style.NullText>장바구니에 담긴 상품이 없습니다.</Style.NullText>
            <Style.NullBoxContainer>
              <Style.GoToMainBtn
                onClick={() => {
                  navigate("/");
                }}
              >
                CONTINUE SHOPPING
              </Style.GoToMainBtn>
            </Style.NullBoxContainer>
            <HorizonLine
              width={"98%"}
              border={"3px"}
              color={"gray"}
              margin={"3% 0px 0px 0px"}
            />
          </Style.NullProductContentLayout>
        </Style.NullProductContainer>
      </>
    );
  }

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
                <LoadingSpinner
                  width={"100%"}
                  text={"상품을 불러오는 중입니다."}
                  margin={"80px 0px 80px 500px"}
                />
              )}
              <Style.HeaderContent width={52.8}>
                상품명(옵션)
              </Style.HeaderContent>
              <Style.HeaderContent width={35.9}>수량</Style.HeaderContent>
              <Style.HeaderContent width={31}>주문관리</Style.HeaderContent>
            </Style.HeaderContainer>
          </Style.HeaderLayout>
          {cartProducts &&
            cartProducts.products.map((item) => (
              <CartProduct
                key={`${item.productId}+${item.size}`}
                item={item}
                refetch={refetch}
              />
            ))}
          <HorizonLine
            width={"100%"}
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
              <Style.Count>총 {count}개</Style.Count>
              {convertToPrice(price)}원
            </Style.PayContent>
            <Style.SymbolContainer>
              <Style.Symbol> + </Style.Symbol>
              <Style.PayContent fontSize={25}>0원</Style.PayContent>
              <Style.Symbol> = </Style.Symbol>
            </Style.SymbolContainer>

            <Style.PayContent width={23} margin={true} fontSize={25}>
              {convertToPrice(price)}원
            </Style.PayContent>
          </Style.PayContainer>
          <HorizonLine
            width={"100%"}
            border={"5px"}
            color={"black"}
            margin={"3% 0px 0px 0px"}
          ></HorizonLine>

          <Style.FooterContainer>
            <Style.FooterBtn
              color={"#3a3b3c"}
              onClick={() => {
                navigate("/");
              }}
            >
              쇼핑 계속하기
            </Style.FooterBtn>
            <Style.FooterBtn
              color={"white"}
              back={"black"}
              onClick={() => {
                navigate("/shipment");
              }}
            >
              구매하기
            </Style.FooterBtn>
          </Style.FooterContainer>
        </Style.ProductsContainer>
      </Style.Layout>
    </div>
  );
};

export default Cart;
