import React from "react";
import styles from "./CartModal.module.css";
import { useNavigate } from "react-router-dom";
const CartModal = () => {
  const navigate = useNavigate();
  const goCartPage = () => {
    navigate("/cart");
  };
  return (
    <div className={styles.mordal}>
      <div className={styles.container}>
        <div>장바구니에 추가되었습니다.</div>
        <div className={styles.go} onClick={goCartPage}>
          바로가기
        </div>
      </div>
    </div>
  );
};

export default CartModal;
