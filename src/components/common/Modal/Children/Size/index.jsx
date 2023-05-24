import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import productStore from "../../../../../store/productStore";
const Size = ({ setModalIsOpen, size }) => {
  const { setSelectSize } = productStore();
  const [sizes, setSizes] = useState([]);

  const clickSize = (item) => {
    setSelectSize(item);
    setModalIsOpen(false);
  };

  useEffect(() => {
    size && setSizes(size.split(","));
  }, [size]);
  return (
    <>
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
      <Style.Close
        onClick={() => {
          setModalIsOpen(false);
        }}
      >
        닫기
      </Style.Close>
    </>
  );
};

export default Size;
