import styled from "@emotion/styled";
export const Button = styled.button`
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  background: ${(props) => props.background || "white"};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  display: ${(props) => (props.isShow ? "block" : "none")};
  line-height: 10%;
  cursor: pointer;
  &:hover {
    color: ${(props) =>
      props.hoverColor === undefined ? "black" : props.hoverColor};
    background: ${(props) =>
      props.hoverBackground === undefined ? "white" : props.hoverBackground};
    transition: ${(props) => props.transition};
    font-weight: ${(props) =>
      props.hoverFontWeight === undefined ? "none" : props.hoverFontWeight};
  }
`;
