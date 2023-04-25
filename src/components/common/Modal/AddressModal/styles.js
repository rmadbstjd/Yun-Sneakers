import styled from "@emotion/styled";

export const AddressContainer = styled.div`
  border: solid black 1px;
  border-radius: 20px;
  width: 700px;
  height: 500px;
  z-index: 555;
  position: absolute;
  top: 47%;
  left: 48%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

export const AddressContent = styled.div`
  margin-left: 40px;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
  margin-left: 35%;
  margin-top: 10px;
`;

export const Btn = styled.div`
  border: solid gray 1px;
  border-radius: 15px;
  width: 70px;
  height: 30px;
  line-height: 190%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
