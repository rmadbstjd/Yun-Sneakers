import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import MypageSide from "../../../../components/MypageSide/Container";
import ShipAddress from "../../.././../components/ShipAddress";
import Button from "../../../../components/common/button";
import Modal from "../../../../components/common/Modal/UIModal";
import UserAddressForm from "../../../../components/Form/UserAddressForm/Container";
const UIAddressPage = ({
  address,
  setShowModal,
  deleteAddress,
  showModal,
  submitBtn,
  refetch,
}) => {
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
                      <UserAddressForm
                        setDefaultAddress={false}
                        setShowModal={setShowModal}
                        refetch={refetch}
                      />
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

export default UIAddressPage;
