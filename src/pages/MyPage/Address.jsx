import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./css/Address.module.css";
import useStore from "../../store";
import Swal from "sweetalert2";
import ShipAddress from "../../components/ShipAddress";
import Modal from "../../components/common/Modal";
const Address = () => {
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
  const [showModal, setShowModal] = useState(false);
  const { data: address, refetch } = useQuery(["address"], () =>
    cart.getAddress()
  );
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
  const isLogin = localStorage.getItem("isLogin") === "true";
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
        <div className={styles.title}>배송지</div>
        <div className={styles.horizonLine}></div>
        <div
          className={
            address === false
              ? styles.addressContainer3
              : styles.addressContainer2
          }
        >
          <ShipAddress />

          {address === false ? (
            <div
              className={styles.Btn}
              onClick={() => {
                setShowModal((prev) => !prev);
              }}
            >
              추가하기
            </div>
          ) : (
            <div className={styles.btnContainer}>
              <div
                className={styles.Btn}
                onClick={() => {
                  setShowModal((prev) => !prev);
                }}
              >
                수정
              </div>
              <div
                className={styles.Btn}
                onClick={() => {
                  deleteAddress();
                }}
              >
                삭제
              </div>
            </div>
          )}
          {showModal === true ? (
            <Modal
              isOpen={true}
              modalIsOpen={showModal}
              setModalIsOpen={setShowModal}
              submitBtn={submitBtn}
              type={"ship"}
            ></Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Address;
