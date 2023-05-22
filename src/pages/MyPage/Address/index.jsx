import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Style from "./styles";
import Navbar from "./../../../components/common/Navbar/index";
import userInfoStore from "./../../../store/userInfoStore";
import ShipAddress from "./../../../components/ShipAddress/index";
import AddressModal from "./../../../components/common/Modal/AddressModal";
import MypageSide from "./../../../components/MypageSide/index";
import { validateAddress } from "../../../utils/validateAddress";
import Button from "../../../components/common/button";
import {
  addUserAddress,
  getUserAddress,
  deleteUserAddress,
} from "../../../api/myPage";
const Address = () => {
  const {
    shipPlaceName,
    shipReceiver,
    shipPostCode,
    shipAddress,
    shipAddressDetail,
    firstPhoneNum,
    middlePhoneNum,
    lastPhoneNum,
  } = userInfoStore();
  const [showModal, setShowModal] = useState(false);
  const { data: address, refetch } = useQuery(["address"], () =>
    getUserAddress()
  );
  const submitBtn = async () => {
    if (
      validateAddress(
        shipPlaceName,
        shipReceiver,
        shipPostCode,
        firstPhoneNum,
        middlePhoneNum,
        lastPhoneNum
      )
    ) {
      await addUserAddress(
        shipPlaceName,
        shipReceiver,
        shipPostCode,
        shipAddress,
        shipAddressDetail,
        firstPhoneNum,
        middlePhoneNum,
        lastPhoneNum
      );

      refetch();

      setShowModal(false);
    }
  };
  const deleteAddress = async () => {
    await deleteUserAddress();
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

            {!address ? (
              <Button
                style={{
                  border: "solid gray 1px",
                  borderRadius: "15px",
                  width: "70px",
                  height: "30px",
                  margin: "10px 0px 0px 0px",
                  lineHeight: "190%",
                  hoverColor: "white",
                  hoverBackground: "black",
                }}
                onClick={() => {
                  setShowModal((prev) => !prev);
                }}
              >
                추가하기
              </Button>
            ) : (
              <Style.BtnContainer>
                <Button
                  style={{
                    border: "solid gray 1px",
                    borderRadius: "15px",
                    width: "70px",
                    height: "30px",
                    margin: "10px 0px 0px 0px",
                    lineHeight: "190%",
                    hoverColor: "white",
                    hoverBackground: "black",
                  }}
                  onClick={() => {
                    setShowModal((prev) => !prev);
                  }}
                >
                  수정
                </Button>
                <Button
                  style={{
                    border: "solid gray 1px",
                    borderRadius: "15px",
                    width: "70px",
                    height: "30px",
                    margin: "10px 0px 0px 0px",
                    lineHeight: "190%",
                    color: "black",
                    background: "white",
                    hoverColor: "white",
                    hoverBackground: "black",
                  }}
                  onClick={() => {
                    deleteAddress();
                  }}
                >
                  삭제
                </Button>
              </Style.BtnContainer>
            )}
            {showModal ? (
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
