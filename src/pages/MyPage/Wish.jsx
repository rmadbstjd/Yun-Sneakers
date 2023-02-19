import React, { useEffect } from "react";

import LikeProducts from "../Like";
import { useNavigate } from "react-router-dom";
import styles from "./css/Wish.module.css";
import MypageSide from "../../components/MypageSide";
const Wish = () => {
  const navigate = useNavigate();
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
        <LikeProducts></LikeProducts>
      </div>
    </div>
  );
};

export default Wish;
