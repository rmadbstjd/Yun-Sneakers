import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./css/Address.module.css";
import userInfoStore from "../../store/userInfoStore";
import Swal from "sweetalert2";
import ShipAddress from "../../components/ShipAddress";
import Modal from "../../components/common/Modal";
import MypageSide from "../../components/MypageSide";
const Address = () => {
  const navigate = useNavigate();
  const {
    cart,
    myPage,
    shipPlaceName,
    shipReceiver,
    shipPostCode,
    shipAddress,
    shipAddressDetail,
    phoneNumInput1,
    phoneNumInput2,
    phoneNumInput3,
  } = userInfoStore();
  const [showModal, setShowModal] = useState(false);
  const { data: address, refetch } = useQuery(["address"], () =>
    myPage.getUserAddress()
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
    } else if (!phoneNumInput1 || !phoneNumInput2 || !phoneNumInput3) {
      Swal.fire({
        title: "핸드폰 번호를 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    } else if (phoneNumInput1.length !== 3) {
      Swal.fire({
        title: "핸드폰 번호를 정확하게 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    } else if (phoneNumInput2.length !== 4) {
      Swal.fire({
        title: "핸드폰 번호를 정확하게 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    } else if (phoneNumInput3.length !== 4) {
      Swal.fire({
        title: "핸드폰 번호를 정확하게 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }

    await myPage.addUserAddress(
      shipPlaceName,
      shipReceiver,
      shipPostCode,
      shipAddress,
      shipAddressDetail,
      phoneNumInput1,
      phoneNumInput2,
      phoneNumInput3
    );

    refetch();

    setShowModal(false);
  };
  const deleteAddress = async () => {
    await myPage.deleteUserAddress();
    refetch();
  };
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
              refetch={refetch}
              type={"ship"}
            ></Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Address;
