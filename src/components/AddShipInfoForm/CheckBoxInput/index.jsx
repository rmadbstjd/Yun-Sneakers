import React from "react";
import * as Style from "./styles";
const CheckBoxInput = ({ title, value, onChange }) => {
  return (
    <Style.Container>
      <Style.Input
        margin={"3px"}
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      <Style.Title>{title}</Style.Title>
    </Style.Container>
  );
};

export default CheckBoxInput;
