import React from "react";
import * as Style from "./styless";

const Button = ({
  border,
  borderRadius,
  margin,
  width,
  height,
  children,
  color = "black",
  hoverColor = false,
  hoverBackground = false,
  hoverFontWeight = false,
  background = "white",
  padding,
  fontSize,
  fontWeight,
  lineHeight,
  transition,
  isShow = true,
  onClick,
}) => {
  return (
    <Style.Button
      border={border}
      borderRadius={borderRadius}
      margin={margin}
      width={width}
      height={height}
      padding={padding}
      color={color}
      hoverColor={hoverColor}
      background={background}
      hoverBackground={hoverBackground}
      lineHeight={lineHeight}
      fontSize={fontSize}
      fontWeight={fontWeight}
      hoverFontWeight={hoverFontWeight}
      isShow={isShow}
      transition={transition}
      onClick={onClick}
    >
      {children}
    </Style.Button>
  );
};

export default Button;
