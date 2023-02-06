import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import styles from "./css/Wish.module.css";
import useStore from "../store";
const Wish = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const { nickName } = useStore();
  const itemArr = ["주문 내역 조회", "관심 상품", "주소록"];
  const goToPage = (item) => {
    console.log("item", item);
    switch (item) {
      case "주문 내역 조회":
        navigate("/mypage/order");
        break;
      case "관심 상품":
        navigate("/mypage/wish");
        break;
      case "주소록":
        navigate("/mypage/address");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
  }, [isLogin, navigate]);
  return (
    <div className={styles.mypageContainer}>
      <div className={styles.sideContainer}>
        <div className={styles.title}>마이 페이지</div>
        {nickName && (
          <div className={styles.nickName}>
            {nickName}
            <span className={styles.last}>님</span>
          </div>
        )}
        {itemArr &&
          itemArr.map((item, index) => (
            <div
              className={styles.item}
              key={index}
              onClick={() => {
                goToPage(item);
              }}
            >
              {item}
            </div>
          ))}
      </div>
      <div className={styles.mainContainer}>
        <Products></Products>
      </div>
    </div>
  );
};

export default Wish;
