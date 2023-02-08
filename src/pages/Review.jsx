import React, { useEffect } from "react";
import styles from "./css/Review.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
const itemArr = ["주문 내역 조회", "관심 상품", "주소록", "상품 리뷰"];
const Review = () => {
  const navigate = useNavigate();
  const { nickName } = useStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
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
      case "상품 리뷰":
        navigate("/mypage/review");
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
        <div className={styles.title}>리뷰</div>
        <div className={styles.horizonLine}></div>
      </div>
    </div>
  );
};

export default Review;
