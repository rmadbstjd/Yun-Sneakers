import styled from "@emotion/styled";

export const NavbarItemLayout = styled.div`
  position: relative;
  margin-right: 10px;
  font-size: 12px;
  cursor: pointer;
  @media (max-width: 1150px) {
    color: white;
    width: 20px;
    margin-right: 1px;
  }
`;

export const Count = styled.div`
  background-color: red;
  border: solid beige 1px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 120%;
  z-index: 1;
  position: absolute;
  color: white;
  right: 90%;
  font-size: 10px;
  text-align: center;
  line-height: 160%;
  margin-left: 45px;
`;
