import styled from "@emotion/styled";

export const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  transition-duration: 2s, 4s;
  display: flex;
  flex-direction: column;
`;

export const NavbarContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
`;

export const NavbarTitle = styled.div`
  font-size: 25px;
  font-weight: bolder;
  line-height: 250%;
`;

export const Footer = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  font-size: 25px;
  margin-top: 180%;
  background-color: gray;
  color: white;
  text-align: center;
  line-height: 220%;
  cursor: pointer;
  &;hover {
    background-color: black; 
  }
  }
`;
