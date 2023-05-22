import React from "react";
import * as Style from "./styles";

const Button = ({ style = {}, isShow = true, onClick, children }) => {
  return (
    <Style.Button {...style} isShow={isShow} onClick={onClick}>
      {children}
    </Style.Button>
  );
};

export default Button;
