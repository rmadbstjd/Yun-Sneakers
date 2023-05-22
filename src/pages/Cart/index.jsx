import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import CartProducts from "./CartProducts";
import HorizonLine from "../../components/common/HorizonLine";
import convertStringToNumber from "../../utils/convertStringToNumber";
import Navbar from "./../../components/common/Navbar/index";
import Button from "./../../components/common/button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useImmer } from "use-immer";
import Swal from "sweetalert2";
import { getUserCarts } from "../../api/cart";
import { checkProduct } from "../../api/cart";
const Cart = () => {
  const navigate = useNavigate();
  const { userId } = userInfoStore();
  const {
    isLoading,
    data: cartProducts,
    refetch,
  } = useQuery(["cart", userId], () => getUserCarts());

  const [checkedProducts, setCheckedProducts] = useImmer([]);
  const [price, setPrice] = useState(0);

  const handleSingleCheck = (checked, id, price, quantity) => {
    if (checked) {
      setCheckedProducts((draft) => {
        draft.push({ id, price, quantity });
        draft.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });
      });
    } else {
      for (let i = 0; i < checkedProducts?.length; i++) {
        if (checkedProducts[i]?.id === id) {
          checkProduct(id, false);
          setCheckedProducts((prev) => prev.filter((el) => el.id !== id));
        }
      }
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedProducts([]);
      for (let i = 0; i < cartProducts?.products?.length; i++) {
        setCheckedProducts((draft) => {
          checkProduct(cartProducts?.products[i]?.productId, true);
          draft.push({
            id: cartProducts?.products[i]?.productId,
            price: cartProducts?.products[i]?.price,
            quantity: cartProducts?.products[i]?.quantity,
          });
          draft.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          });
        });
      }
    } else {
      for (let i = 0; i < checkedProducts.length; i++) {
        checkProduct(checkedProducts[i].id, false);
      }
      setCheckedProducts([]);
    }
  };

  const clickToBuyBtn = () => {
    if (checkedProducts.length === 0) {
      Swal.fire({
        title: "상품을 선택해주세요",
        confirmButtonColor: "black",
      });
      return;
    }
    navigate("/shipment");
  };
  useEffect(() => {
    if (checkedProducts?.length === 0) {
      for (let i = 0; i < cartProducts?.products?.length; i++) {
        setCheckedProducts((draft) => {
          draft.push({
            id: cartProducts?.products[i]?.productId,
            price: cartProducts?.products[i]?.price,
            quantity: cartProducts?.products[i]?.quantity,
          });
          draft.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          });
        });
      }
    }
  }, [cartProducts]);
  useEffect(() => {
    if (checkedProducts?.length !== 0) {
      setPrice(0);
      for (let i = 0; i < checkedProducts?.length; i++) {
        checkProduct(checkedProducts[i]?.id, true);
        setPrice(
          (prev) =>
            prev + checkedProducts[i]?.price * checkedProducts[i]?.quantity
        );
      }
    } else {
      setPrice(0);
    }
  }, [checkedProducts]);

  useEffect(() => {
    if (checkedProducts?.length !== 0) {
      for (let i = 0; i < cartProducts?.products?.length; i++) {
        for (let j = 0; j < checkedProducts?.length; j++) {
          if (cartProducts?.products[i]?.productId === checkedProducts[j]?.id) {
            setCheckedProducts((draft) => {
              draft[j].quantity = cartProducts?.products[i]?.quantity;
              draft.sort((a, b) => {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                return 0;
              });
            });
          }
        }
        if (cartProducts?.products[i]?.productId === checkedProducts[i]?.id) {
          setCheckedProducts((draft) => {
            draft[i].quantity = cartProducts?.products[i]?.quantity;
            draft.sort((a, b) => {
              if (a.price > b.price) return -1;
              if (a.price < b.price) return 1;
              return 0;
            });
          });
        }
      }
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
              <Button
                style={{
                  border: "solid gray 1px",
                  width: "350px",
                  height: "60px",
                  padding: "20px",
                  fontSize: "25px",
                  color: "#3a3b3c",
                  fontWeight: "bold",
                  hoverBackground: "black",
                  hoverColor: "white",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                CONTINUE SHOPPING
              </Button>
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
              width={"30%"}
              border={"solid black 1px"}
              height={"65px"}
              lineHeight={"270%"}
              margin={"0px 10px 0px 0px"}
              fontWeight={"bolder"}
              background={"black"}
              color={"white"}
              hoverColor={"#a5ba93"}
              hoverBackground={"black"}
              isShow={true}
              fontSize={"25px"}
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

export default Cart;
