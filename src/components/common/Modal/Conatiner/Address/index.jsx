import React from "react";
import * as Style from "./styles";

import Button from "../../../button";
const AddressModal = ({ setModalIsOpen, submitBtn }) => {
  return (
    <Style.AddressContainer>
      <Style.AddressContent>
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
              setModalIsOpen(false);
            }}
          >
            취소
          </Button>
        </Style.BtnContainer>
      </Style.AddressContent>
    </Style.AddressContainer>
  );
};

export default AddressModal;
