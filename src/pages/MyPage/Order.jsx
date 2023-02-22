import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Order.module.css";
import OrderPageNavbar from "../../components/OrderPageNavbar";
import userInfoStore from "../../store/userInfoStore";
import MypageSide from "../../components/MypageSide";
import Navbar from "./../../components/common/Navbar/index";
const Order = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { nickName } = userInfoStore();
  const isLogin = localStorage.getItem("isLogin") === "true";

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
  }, [isLogin, navigate]);
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
