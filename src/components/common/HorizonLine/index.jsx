import React from "react";
import * as Style from "./styles";
const HorizonLine = ({
  width = "100%",
  border = "1px",
  color = "black",
  margin,
}) => {
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
