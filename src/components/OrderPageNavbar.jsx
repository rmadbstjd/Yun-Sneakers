import React from "react";
import styles from "./css/OrderPageNavbar.module.css";
const itemArr = [
  "상품정보",
  "주문일자",
  "주문번호",
  "주문금액(수량)",
  "주문상태",
];
const OrderPageNavbar = () => {
  return (
    <div>
      <div className={styles.title}>주문 내역 조회</div>
      <div className={styles.horizonLine}></div>
      <div className={styles.topContainer}>
        <div className={styles.productInfo}>{itemArr[0]}</div>
        <div className={styles.orderDate}>{itemArr[1]}</div>
        <div className={styles.orderNumber}>{itemArr[2]}</div>
        <div className={styles.orderPrice}>{itemArr[3]}</div>
        <div className={styles.orderState}>{itemArr[4]}</div>
      </div>
      <div className={styles.horizonLine}></div>
    </div>
  );
};

export default OrderPageNavbar;
