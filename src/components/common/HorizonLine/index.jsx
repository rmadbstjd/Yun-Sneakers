import React from "react";
import * as Style from "./styles";
const HorizonLine = ({ width, border, color, margin }) => {
  return (
    <Style.Line
      width={width}
      border={border}
      color={color}
      margin={margin}
    ></Style.Line>
  );
};

export default HorizonLine;
