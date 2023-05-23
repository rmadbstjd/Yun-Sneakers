import React from "react";
import * as Style from "./styles";
const Input = ({ title, maxLength, value, onChange }) => {
  return (
    <Style.Container>
      <Style.Title>{title}</Style.Title>
      <Style.Input
        type="text"
        maxlength={maxLength}
        value={value}
        onChange={onChange}
      ></Style.Input>
    </Style.Container>
  );
};

export default Input;
