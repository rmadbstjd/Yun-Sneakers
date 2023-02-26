import styled from "@emotion/styled";

export const Modal = styled.div`
  border-radius: 10px;
  width: 400px;
  height: 50px;
  z-index: 999;
  position: absolute;
  top: 38%;
  left: 67.5%;
  transform: translate(-83%, 70%);
  background-color: black;
  opacity: 0.9;
`;

export const Container = styled.div`
  line-height: 300%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  color: white;
`;

export const Btn = styled.div`
  cursor: pointer;
  color: #a5ba93;
`;
