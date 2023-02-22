import React from "react";
import styles from "./css/Order.module.css";
import OrderPageNavbar from "../../components/OrderPageNavbar";
import MypageSide from "../../components/MypageSide";
import Navbar from "./../../components/common/Navbar/index";
const Order = () => {
  return (
    <>
      <Navbar />
      <div className={styles.mypageContainer}>
        <MypageSide />
        <div className={styles.mainContainer}>
          <OrderPageNavbar />
        </div>
      </div>
    </>
  );
};

export default Order;
