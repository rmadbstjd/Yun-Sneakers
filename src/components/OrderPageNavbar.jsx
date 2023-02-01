import React, { useState, useEffect } from "react";
import styles from "./css/OrderPageNavbar.module.css";
import { useQuery } from "@tanstack/react-query";
import useStore from "../store";
const itemArr = [
  "상품정보",
  "주문일자",
  "주문번호",
  "주문금액(수량)",
  "쿠폰할인",
  "주문상태",
];
const OrderPageNavbar = () => {
  const {
    isLoading,
    error,
    data: products,
    refetch: refetch1,
  } = useQuery(["배송중"], () => cart.getOrderProducts());
  const { data: completedProducts, refetch: refetch2 } = useQuery(
    ["배송완료"],
    () => cart.getShipComplete()
  );
  const { cart } = useStore();
  const clickToBtn = async (id) => {
    console.log("1");
    await cart.addShipComplete(id);
    console.log("2");
    refetch1();
    refetch2();
    console.log("3");
  };
  const setPrice = (coupon, price) => {
    switch (coupon) {
      case "선택안함":
        return price;
      case "Welcome 5% 할인 쿠폰":
        return price * 0.95;
      case "10만원 이상 구매 시 10% 할인 쿠폰":
        return price * 0.9;
      case "20만원 이상 구매 시 20% 할인 쿠폰":
        return price * 0.8;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log("리패치?!");
  }, [products, completedProducts]);
  return (
    <div>
      <div className={styles.title}>주문 내역 조회</div>
      <div className={styles.title2}>배송중</div>
      <div className={styles.horizonLine}></div>
      <div className={styles.topContainer}>
        <div className={styles.productInfo}>{itemArr[0]}</div>
        <div className={styles.orderDate}>{itemArr[1]}</div>
        <div className={styles.orderNumber}>{itemArr[2]}</div>
        <div className={styles.orderPrice}>{itemArr[3]}</div>
        <div className={styles.orderCoupon}>{itemArr[4]}</div>
        <div className={styles.orderState}>{itemArr[5]}</div>
      </div>
      <div className={styles.horizonLine}></div>
      {products &&
        products.map((item, index) => (
          <div className={styles.productContent} key={index}>
            <img className={styles.img} src={item.info.image}></img>
            <div className={styles.info}>
              <div className={styles.brand}>{item.info.category}</div>
              <div className={styles.name}>{item.info.name}</div>
              <div className={styles.size}>사이즈 [{item.product.size}]</div>
            </div>
            <div className={styles.date}>{item.product.date}</div>
            <div className={styles.orderNum}>{item.product._id}</div>
            <div className={styles.priceContainer}>
              {item.product.coupon !== "선택안함" ? (
                <div className={styles.firstPrice}>
                  {item.info.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  원
                </div>
              ) : null}
              <div>
                {setPrice(item.product.coupon, item.info.price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                원
              </div>
              <div>{item.product.count} 개</div>
            </div>
            <div className={styles.coupon}>{item.product.coupon}</div>
            <div className={styles.state}>
              <div className={styles.btnContainer}>
                <div className={styles.text}>배송이 완료되었다면↓</div>
                <div
                  className={styles.btn}
                  onClick={() => {
                    clickToBtn(item.product._id);
                  }}
                >
                  배송완료
                </div>
              </div>
              <div>{item.product.state}</div>
            </div>
          </div>
        ))}
      <div className={styles.title2}>배송 완료</div>
      <div className={styles.horizonLine}></div>
      <div className={styles.topContainer}>
        <div className={styles.productInfo}>{itemArr[0]}</div>
        <div className={styles.orderDate}>{itemArr[1]}</div>
        <div className={styles.orderNumber}>{itemArr[2]}</div>
        <div className={styles.orderPrice}>{itemArr[3]}</div>
        <div className={styles.orderCoupon}>{itemArr[4]}</div>
        <div className={styles.orderState}>{itemArr[5]}</div>
      </div>
      {completedProducts &&
        completedProducts.map((item, index) => (
          <div className={styles.productContent} key={index}>
            <img className={styles.img} src={item.info.image}></img>
            <div className={styles.info}>
              <div className={styles.brand}>{item.info.category}</div>
              <div className={styles.name}>{item.info.name}</div>
              <div className={styles.size}>사이즈 [{item.product.size}]</div>
            </div>
            <div className={styles.date}>{item.product.date}</div>
            <div className={styles.orderNum}>{item.product._id}</div>
            <div className={styles.priceContainer}>
              {item.product.coupon !== "선택안함" ? (
                <div className={styles.firstPrice}>
                  {item.info.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  원
                </div>
              ) : null}
              <div>
                {setPrice(item.product.coupon, item.info.price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                원
              </div>
              <div>{item.product.count} 개</div>
            </div>
            <div className={styles.coupon}>{item.product.coupon}</div>
            <div className={styles.state}>
              <div className={styles.btnContainer2}></div>
              <div>{item.product.state}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderPageNavbar;
