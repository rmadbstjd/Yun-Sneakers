import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as Style from "./styles";
import Swal from "sweetalert2";
import Navbar from "./../../../components/common/Navbar/index";
import userInfoStore from "./../../../store/userInfoStore";
import ShipAddress from "./../../../components/ShipAddress/index";
import AddressModal from "./../../../components/common/Modal/AddressModal";
import MypageSide from "./../../../components/MypageSide/index";
const Address = () => {
  const navigate = useNavigate();
  const {
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

  return (
    <>
      <Navbar />
      <Style.MyPageContainer>
        <MypageSide />
        <Style.MainContainer>
          <Style.Title>배송지</Style.Title>
          <Style.HorizonLine
            width={"1200px"}
            border={4}
            color={"black"}
          ></Style.HorizonLine>
          <Style.AddressContainer isBoolean={address}>
            <ShipAddress />

            {address === false ? (
              <Style.Btn
                onClick={() => {
                  setShowModal((prev) => !prev);
                }}
              >
                추가하기
              </Style.Btn>
            ) : (
              <Style.BtnContainer>
                <Style.Btn
                  onClick={() => {
                    setShowModal((prev) => !prev);
                  }}
                >
                  수정
                </Style.Btn>
                <Style.Btn
                  onClick={() => {
                    deleteAddress();
                  }}
                >
                  삭제
                </Style.Btn>
              </Style.BtnContainer>
            )}
            {showModal === true ? (
              <AddressModal
                isOpen={true}
                modalIsOpen={showModal}
                setModalIsOpen={setShowModal}
                submitBtn={submitBtn}
                refetch={refetch}
              ></AddressModal>
            ) : null}
          </Style.AddressContainer>
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default Address;
