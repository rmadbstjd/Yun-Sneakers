import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Order.module.css";
import OrderPageNavbar from "../../components/OrderPageNavbar";
import useStore from "../../store";
import MypageSide from "../../components/MypageSide";
const Order = () => {
  const navigate = useNavigate();
  const { nickName } = useStore();
  const isLogin = localStorage.getItem("isLogin") === "true";

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
  }, [isLogin, navigate]);
  return (
    <div className={styles.mypageContainer}>
      <MypageSide />
      <div className={styles.mainContainer}>
        <OrderPageNavbar />
      </div>
    </div>
  );
};

export default Order;
