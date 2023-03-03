import React from "react";
import * as Style from "./styles";
const HorizonLine = ({ width, border, color }) => {
  console.log(width, border, color);
  return <Style.Line width={width} border={border} color={color}></Style.Line>;
};

export default HorizonLine;
