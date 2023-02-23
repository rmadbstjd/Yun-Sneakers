import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import cartStore from "../../store/cartStore";
import * as Style from "./styles";
import CartProduct from "../../components/CartProducts";
import HorizonLine from "../../components/common/HorizonLine";
import convertToPrice from "../../hooks/convertToPrice";
import Navbar from "./../../components/common/Navbar/index";

const Cart = () => {
  console.log("테스트");
  const navigate = useNavigate();
  const { cart, initCartCount, plusCartCount } = cartStore();

  const [price, setPrice] = useState(0);
  const [count, setCount] = useState();

  const { data: cartProducts, refetch } = useQuery(["totalPrice"], () =>
    cart.getUserCarts()
  );

  const goToMain = () => {
    navigate("/");
  };
  const goToOrderPage = () => {
    navigate("/shipment");
  };

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
        <Style.NullContainer>
          <Style.NullContent>
            <Style.HorizonLine margin={9}></Style.HorizonLine>
            <Style.NullText>장바구니에 담긴 상품이 없습니다.</Style.NullText>
            <Style.NullBoxContainer>
              <Style.GoToMainBtn onClick={goToMain}>
                CONTINUE SHOPPING
              </Style.GoToMainBtn>
            </Style.NullBoxContainer>
            <Style.HorizonBottomLine></Style.HorizonBottomLine>
          </Style.NullContent>
        </Style.NullContainer>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <Style.Container>
        <Style.ProductsContainer>
          <Style.MenuContainer>
            <Style.Menu>ORDER / PAYMENT</Style.Menu>
          </Style.MenuContainer>
          <Style.MenuHeader>
            <Style.MenuContent>
              <Style.MenuOption width={52.8}>상품명(옵션)</Style.MenuOption>
              <Style.MenuOption width={35.9}>수량</Style.MenuOption>
              <Style.MenuOption width={31}>주문관리</Style.MenuOption>
            </Style.MenuContent>
          </Style.MenuHeader>
          {cartProducts &&
            cartProducts.products.map((item) => (
              <CartProduct
                key={`${item.productId}+${item.size}`}
                item={item}
                refetch={refetch}
              />
            ))}
          <Style.HorizonLine margin={9}></Style.HorizonLine>
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
          <HorizonLine margin={9} />
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
          <Style.HorizonLine margin={3}></Style.HorizonLine>

          <Style.FooterContainer>
            <Style.FooterBtn color={"#3a3b3c"} onClick={goToMain}>
              쇼핑 계속하기
            </Style.FooterBtn>
            <Style.FooterBtn
              color={"white"}
              back={"black"}
              onClick={goToOrderPage}
            >
              구매하기
            </Style.FooterBtn>
          </Style.FooterContainer>
        </Style.ProductsContainer>
      </Style.Container>
    </div>
  );
};

export default Cart;
