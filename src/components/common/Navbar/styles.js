import styled from "@emotion/styled";

export const Container = styled.div`
  border-bottom: ${(props) =>
    props.isScrolled === true ? "solid gray 2px" : null};
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  margin-top: -10px;
  font-family: "NanumSquareNeo-Variable";
  width: 100%;
  height: 65px;
  background-color: white;
`;

export const NavbarContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: space-between;
  @media (max-width: 593px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const NavbarLeftContainer = styled.div`
  display: flex;
  cursor: pointer;
  line-height: 45px;
`;

export const NavbarRightContainer = styled.div`
  width: 520px;
  display: flex;
  justify-content: center;
  line-height: 45px;
  @media (max-width: 721px) {
    width: 320px;
    display: flex;
    justify-content: space-around;
    line-height: 45px;
  }
`;

export const ShopName = styled.div`
  width: 200px;
  height: 40px;
  cursor: pointer;
`;

export const MyPage = styled.div`
  margin-right: 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    font-weight: bolder;
  }
  @media (max-width: 721px) {
    display: none;
  }
`;

export const Products = styled.div`
  margin-right: 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    font-weight: bolder;
  }
  @media (max-width: 721px) {
    display: none;
  }
`;

export const ShoppingBag = styled.div`
  font-size: 12px;
  margin-right: 15px;
  cursor: pointer;
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
  margin-left: -13px;
  color: white;
  font-size: 10px;
  text-align: center;
  line-height: 160%;
`;

export const Nickname = styled.div`
  margin-right: 8px;
  font-size: 14px;
  &:hover {
    font-weight: bolder;
  }
`;

export const Btn = styled.button`
  width: 60px;
  border-radius: 5px;
  border: solid black 0px;
  height: 24px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #fafafa;
  color: black;
  &:hover {
    font-weight: bolder;
  }
  @media (max-width: 593px) {
    width: 65px;
    padding: 0px 15px 0px 12px;
    display: none;
  }
`;

export const Search = styled.div`
  margin: 7px 2px 0px 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
