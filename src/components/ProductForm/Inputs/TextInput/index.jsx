import React from "react";
import * as Style from "./styles";
const TextInput = ({ value, onChange, text }) => {
  return (
    <Style.Container>
      <Style.Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={text}
      />
    </Style.Container>
  );
};

export default TextInput;
