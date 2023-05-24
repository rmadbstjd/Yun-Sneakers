import React from "react";
import ReactModal from "react-modal";
const Modal = ({
  width,
  height,
  borderRadius,
  children,
  modalIsOpen,
  setModalIsOpen,
}) => {
  const styles = {
    content: {
      borderRadius,
      width,
      height,
      zIndex: "999",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      border: "0px",
      position: "fixed",
      top: "10px",
      left: "0",
      bottom: "0",
      right: "0",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  };
  return (
    <ReactModal
      style={styles}
      overlayClassName={styles.overlay}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
