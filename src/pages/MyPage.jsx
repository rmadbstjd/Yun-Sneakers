/*import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "../pages/css/MyPage.module.css";
import OrderPageNavbar from "../components/OrderPageNavbar";
import useStore from "../store";
import Products from "./Products";
import ShipAddress from "../components/ShipAddress";
import Swal from "sweetalert2";
import Modal from "../components/common/Modal";
const itemArr = ["주문 내역 조회", "관심 상품", "주소록"];

const MyPage = () => {
  const navigate = useNavigate();
  const {
    nickName,
    cart,
    shipPlaceName,
    shipReceiver,
    shipPostCode,
    shipAddress,
    shipAddressDetail,
    numInput1,
    numInput2,
    numInput3,
  } = useStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const { data: address, refetch } = useQuery(["address"], () =>
    cart.getAddress()
  );
  const [state, setState] = useState("주문 내역 조회");
  const [showModal, setShowModal] = useState(false);
  const submitBtn = async () => {
    if (!shipPlaceName) {
      Swal.fire({
        title: "배송지명을 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    } else if (!shipReceiver) {
      Swal.fire({
        title: "수령인을 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    } else if (!shipPostCode) {
      Swal.fire({
        title: "우편번호를 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    } else if (!numInput1 || !numInput2 || !numInput3) {
      Swal.fire({
        title: "핸드폰 번호를 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }

    await cart.addShipAddress(
      shipPlaceName,
      shipReceiver,
      shipPostCode,
      shipAddress,
      shipAddressDetail,
      numInput1,
      numInput2,
      numInput3
    );
    refetch();
    setShowModal(false);
  };
  const deleteAddress = async () => {
    await cart.deleteAddress();
    refetch();
  };
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
  }, [address, isLogin, navigate]);

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
        {state === "주문 내역 조회" ? <OrderPageNavbar /> : null}
      </div>
    </div>
  );
};

export default MyPage;*/
