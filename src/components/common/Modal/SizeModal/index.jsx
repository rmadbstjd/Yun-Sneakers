import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import * as Style from "./styles";
import styles from "./SizeModal.module.css";
import productStore from "../../../../store/productStore";
const Size = ({ modalIsOpen, setModalIsOpen, size }) => {
  const { setSelectSize } = productStore();
  const [sizes, setSizes] = useState([]);

  const clickSize = (item) => {
    setSelectSize(item);
    setModalIsOpen((prev) => !prev);
  };

  const closeShow = () => {
    setModalIsOpen((prev) => !prev);
  };
  useEffect(() => {
    size && setSizes(size.split(","));
  }, [size]);
  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
    >
      <Style.SizeContainer>
        <Style.Title>Size</Style.Title>

        {sizes &&
          sizes.map((item) => (
            <Style.SizeBox
              key={item}
              onClick={() => {
                clickSize(item);
              }}
            >
              {item}
            </Style.SizeBox>
          ))}
      </Style.SizeContainer>
      <Style.Close onClick={closeShow}>닫기</Style.Close>
    </ReactModal>
  );
};

export default Size;
