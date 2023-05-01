import styled from "@emotion/styled";
export const Button = styled.button`
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  display: ${(props) => (props.isShow ? "block" : "none")};
  line-height: 10%;
  cursor: pointer;
  &:hover {
    color: white;
    background: black;
  }
`;
