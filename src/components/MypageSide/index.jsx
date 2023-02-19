import React from "react";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import styles from "./MypageSide.module.css";
const MypageSide = () => {
  const { nickName } = useStore();
  const navigate = useNavigate();
  const itemArr = ["주문 내역 조회", "관심 상품", "주소록", "상품 리뷰"];

  const goToPage = (item) => {
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
  return (
    <div className={styles.sideContainer}>
      <div className={styles.title}>마이 페이지</div>
      {nickName && (
        <div className={styles.nickName}>
          {nickName}
          <span className={styles.last}>님</span>
        </div>
      )}
      {itemArr &&
        itemArr.map((item) => (
          <div
            className={styles.item}
            key={item}
            onClick={() => {
              goToPage(item);
            }}
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export default MypageSide;
