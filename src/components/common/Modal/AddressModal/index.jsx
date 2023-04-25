import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import * as Style from "./styles";
import styles from "./AddressModal.module.css";
import AddShip from "../../../AddShipInfo";
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
            <Style.Btn
              onClick={() => {
                submitBtn();
              }}
            >
              저장
            </Style.Btn>
            <Style.Btn
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              취소
            </Style.Btn>
          </Style.BtnContainer>
        </Style.AddressContent>
      </Style.AddressContainer>
    </ReactModal>
  );
};

export default AddressModal;
