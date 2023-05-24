import styled from "@emotion/styled";

export const Modal = styled.div`
  border-radius: 10px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: green;
  position: relaitve;
`;
