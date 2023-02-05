import React, { useState } from "react";
import ReactModal from "react-modal";
import styles from "./css/Modal.module.css";
const Modal = ({ isOpen, modalIsOpen, setModalIsOpen }) => {
  console.log("isOpen", isOpen);

  console.log("modalIsOepn", modalIsOpen);
  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      모달입니다.
    </ReactModal>
  );
};

export default Modal;
