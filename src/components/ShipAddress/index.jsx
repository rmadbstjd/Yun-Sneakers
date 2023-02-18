import React from "react";
import styles from "./ShipAddress.module.css";
import { useQuery } from "@tanstack/react-query";
import useStore from "../../store";
const ShipAddress = () => {
  const { cart } = useStore();
  const {
    isLoading,
    error,
    data: address,
  } = useQuery(["address"], () => cart.getUserAddress());
  if (!address) {
    return (
      <div className={styles.showOldBox}>
        <p className={styles.oldBoxP1}>등록된 배송지가 없습니다.</p>
        <p className={styles.oldBoxP2}>배송지를 신규입력 해주세요.</p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          배송지 {address && address[0].place}
        </div>
        <div className={styles.content}>
          수령인 {address && address[0].receiver}
        </div>
        <div className={styles.content}>
          주소 {address && address[0].address} {address && address[0].postCode}{" "}
          {address && address[0].addressDetail}
        </div>
        <div className={styles.content}>
          연락처 {address && address[0].phoneNumber1} -{" "}
          {address && address[0].phoneNumber2} -{" "}
          {address && address[0].phoneNumber3}
        </div>
      </div>
    );
  }
};

export default ShipAddress;
