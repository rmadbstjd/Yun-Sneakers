import React from "react";
import * as Style from "./styles";

const Button = ({
  border,
  borderRadius,
  width,
  height,
  children,
  color,
  background,
  fontSize,
  fontWeight,
  lineHeight,
  isShow,
  onClick,
}) => {
  return (
    <Style.Button
      border={border}
      borderRadius={borderRadius}
      width={width}
      height={height}
      color={color}
      background={background}
      lineHeight={lineHeight}
      fontSize={fontSize}
      fontWeight={fontWeight}
      isShow={isShow}
      onClick={onClick}
    >
      {children}
    </Style.Button>
  );
};

export default Button;
