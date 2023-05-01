import React from "react";
import ReactModal from "react-modal";
import * as Style from "./styles";
import styles from "./AddressModal.module.css";
import AddShip from "../../../AddShipInfo";
import Button from "../../Button";
const AddressModal = ({ modalIsOpen, setModalIsOpen, submitBtn }) => {
  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
    >
      <Style.AddressContainer>
        <Style.AddressContent>
          <AddShip setDefaultAddress={false} />
          <Style.BtnContainer>
            <Button
              border={"solid gray 1px"}
              borderRadius={"15px"}
              width={"70px"}
              height={"30px"}
              lineHeight={"190%"}
              color={"black"}
              isShow={"true"}
              hoverColor={"white"}
              hoverBackground={"black"}
              onClick={() => {
                submitBtn();
              }}
            >
              저장
            </Button>
            <Button
              border={"solid gray 1px"}
              borderRadius={"15px"}
              width={"70px"}
              height={"30px"}
              lineHeight={"190%"}
              color={"black"}
              isShow={"true"}
              hoverColor={"white"}
              hoverBackground={"black"}
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              취소
            </Button>
          </Style.BtnContainer>
        </Style.AddressContent>
      </Style.AddressContainer>
    </ReactModal>
  );
};

export default AddressModal;
