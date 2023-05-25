import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Style from "./styles";
import Navbar from "../../../components/common/Navbar/Container/index";
import userInfoStore from "./../../../store/userInfoStore";
import ShipAddress from "./../../../components/ShipAddress/index";
import Modal from "../../../components/common/Modal/UIModal";
import MypageSide from "../../../components/MypageSide/Container/index";
import { validateAddress } from "../../../utils/validateAddress";
import Button from "../../../components/common/button";
import Container from "../../../components/Form/AddUserAddressForm/Container";
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
            {showModal && (
              <Modal
                isOpen={true}
                modalIsOpen={showModal}
                setModalIsOpen={setShowModal}
                children={
                  <Style.ModalContainer>
                    <Style.ModalContent>
                      <Container setDefaultAddress={false} />
                      <Style.BtnContainer>
                        <Button
                          style={{
                            border: "solid gray 1px",
                            borderRadius: "15px",
                            width: "70px",
                            height: "30px",
                            lineHeight: "190%",
                            color: "black",
                            background: "white",
                            hoverBackground: "black",
                            hoverColor: "white",
                            margin: "0px 0px 0px 15px",
                            fontSize: "12px",
                          }}
                          isShow={true}
                          onClick={() => {
                            submitBtn();
                          }}
                        >
                          저장
                        </Button>
                        <Button
                          style={{
                            border: "solid gray 1px",
                            borderRadius: "15px",
                            width: "70px",
                            height: "30px",
                            lineHeight: "190%",
                            color: "black",
                            hoverColor: "white",
                            hoverBackground: "black",
                          }}
                          isShow={true}
                          onClick={() => {
                            setShowModal(false);
                          }}
                        >
                          취소
                        </Button>
                      </Style.BtnContainer>
                    </Style.ModalContent>
                  </Style.ModalContainer>
                }
                width={"700px"}
                height={"550px"}
                borderRadius={"20px"}
                submitBtn={submitBtn}
                refetch={refetch}
              ></Modal>
            )}
          </Style.AddressContainer>
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default Address;
