import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  border-bottom: ${(props) => (props.isScrolled ? "solid gray 2px" : null)};
  z-index: 999;
  display: flex;

  width: 100%;
  height: 70px;
  margin-left: -20px;
  background: white;
  font-family: "OTWelcomeRA";
`;
export const NavbarContainer = styled.div`
  position: fixed;
  display: flex;
  width: 63.5%;
  height: 60px;
  z-index: 999;
  padding-top: 10px;
  justify-content: space-between;
  background: white;
`;

export const NavbarLeftContainer = styled.div`
  display: flex;
  cursor: pointer;
  line-height: 45px;
`;

export const NavbarRightContainer = styled.div`
  display: flex;
  justify-content: center;
  line-height: 45px;
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
`;

export const Products = styled.div`
  margin-right: 10px;
  font-size: 12px;
  cursor: pointer;
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
`;

export const Search = styled.div`
  margin: 7px 2px 0px 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const CartIconContainer = styled.div``;
export const SearchIconContainer = styled.div``;
export const CartCount = styled.div``;
