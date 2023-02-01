import React from "react";
import styles from "../pages/css/MyPage.module.css";
import OrderPageNavbar from "../components/OrderPageNavbar";
const itemArr = ["주문 내역 조회", "관심 상품", "주소록"];
const MyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mypageContainer}>
        <div className={styles.sideContainer}>
          <div className={styles.title}>마이 페이지</div>
          {itemArr &&
            itemArr.map((item, index) => (
              <div className={styles.item} key={index}>
                {item}
              </div>
            ))}
        </div>
        <div className={styles.mainContainer}>
          <OrderPageNavbar />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
