import React from "react";
import ReactModal from "react-modal";
import * as Style from "./styles";
import styles from "./AddressModal.module.css";
import AddShipInfoForm from "../../../AddShipInfoForm";
import Button from "../../button";
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
          <AddShipInfoForm setDefaultAddress={false} />
          <Style.BtnContainer>
            <Button
              style={{
                border: "solid gray 1px",
                borderRadius: "15px",
                width: "70px",
                height: "30px",
                lineHeight: "190%",
                color: "black",
                background: "#bebebe",
                hoverBackground: "#bebebe",
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
