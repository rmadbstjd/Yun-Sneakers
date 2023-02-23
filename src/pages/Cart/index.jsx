import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import cartStore from "../../store/cartStore";
import styles from "./Cart.module.css";
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
        <div className={styles.nullContainer}>
          <div className={styles.nullContent}>
            <div className={styles.horizonLine}></div>
            <div className={styles.nullText}>
              장바구니에 담긴 상품이 없습니다.
            </div>
            <div className={styles.nullBoxContainer}>
              <div onClick={goToMain} className={styles.nullBox}>
                CONTINUE SHOPPING
              </div>
            </div>
            <div className={styles.horizonBottomLine}></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.productsContainer}>
          <div className={styles.menuContainer}>
            <div className={styles.text}>Order / Payment</div>
          </div>
          <div className={styles.test}>
            <div className={styles.menu}>
              <div className={styles.menuOption}>상품명(옵션)</div>
              <div className={styles.menuQuantity}>수량</div>
              <div className={styles.menuOrder}>주문관리</div>
            </div>
          </div>
          {cartProducts &&
            cartProducts.products.map((item) => (
              <CartProduct
                key={`${item.productId}+${item.size}`}
                item={item}
                refetch={refetch}
              />
            ))}
          <div className={styles.horizonLine}></div>
          <div className={styles.payContainer}>
            <div className={styles.productPrice}>총 주문금액</div>

            <div className={styles.deliveryPrice}>총 배송비</div>

            <div className={styles.lastPrice}>총 결제 금액</div>
          </div>
          <HorizonLine />
          <div className={styles.payContainer2}>
            <div className={styles.payContent1}>
              <div className={styles.count}>총 {count}개</div>
              {convertToPrice(price)}원
            </div>
            <div className={styles.symbolContent}>
              <div className={styles.symbol}> + </div>
              <div className={styles.payContent2}>0원</div>
              <div className={styles.symbol}> = </div>
            </div>

            <div className={styles.payContent3}>{convertToPrice(price)}원</div>
          </div>
          <div className={styles.horizonLine2}></div>

          <div className={styles.footerContainer}>
            <div className={styles.footerContent1} onClick={goToMain}>
              쇼핑 계속하기
            </div>
            <div className={styles.footerContent2} onClick={goToOrderPage}>
              구매하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;