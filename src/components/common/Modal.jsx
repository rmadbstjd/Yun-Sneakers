import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "./css/Modal.module.css";
import useStore from "../../store";
import AddShip from "../AddShip";
const Modal = ({
  modalIsOpen,
  setModalIsOpen,
  type,
  size,
  setShowModal,
  submitBtn,
}) => {
  const [sizes, setSizes] = useState([]);
  const { setSize } = useStore();
  const closeShow = () => {
    setModalIsOpen((prev) => !prev);
  };
  const clickSize = (item) => {
    setSize(item);
    setModalIsOpen((prev) => !prev);
  };
  useEffect(() => {
    size && setSizes(size.split(","));
  }, [size]);
  console.log("테스트123");
  if (type === "size") {
    return (
      <ReactModal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <div className={styles.sizeContainer}>
          <div className={styles.sizeContainer}>
            <div className={styles.name}>Size</div>
            <div className={styles.sizeContainer}>
              {sizes &&
                sizes.map((item) => (
                  <div
                    onClick={() => {
                      clickSize(item);
                    }}
                    className={styles.sizeBox}
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>

          <button className={styles.close} onClick={closeShow}>
            X
          </button>
        </div>
      </ReactModal>
    );
  } else if (type === "ship") {
    return (
      <ReactModal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <div className={styles.addressContainer}>
          <div className={styles.addressContent}>
            <AddShip />
            <div className={styles.btnContainer}>
              <div
                className={styles.Btn}
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                취소
              </div>
              <div
                className={styles.Btn}
                onClick={() => {
                  submitBtn();
                }}
              >
                저장
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
};

export default Modal;
