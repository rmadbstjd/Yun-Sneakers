import styled from "@emotion/styled";

export const NullProductContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: "NanumSquareNeo-Variable";
`;

export const NullProductContentLayout = styled.div`
  width: 71%;
`;

export const NullText = styled.span`
  display: flex;
  justify-content: center;
  font-size: 35px;
  margin-top: 5%;
`;

export const NullBoxContainer = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: center;
`;

export const GoToMainBtn = styled.div`
  border: solid gray 1px;
  width: 350px;
  padding: 20px;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
  color: #3a3b3c;
  font-weight: bold;
  &:hover {
    background: black;
    color: white;
  }
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  font-family: "NanumSquareNeo-Variable";
  width: 1820px;
  margin: 0 auto;
`;

export const ProductsContainer = styled.div`
  width: 71.5%;
  margin-top: 90px;
`;

export const TitleLayout = styled.div`
  width: 70%;
  font-size: 30px;
  font-weight: bold;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const HeaderLayout = styled.div`
  width: 1500px;
  border: solid gray 1px;
  text-align: center;
  margin-top: 50px;
  line-height: 250%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const HeaderContent = styled.div`
  width: ${(props) => `${props.width}%`};
  text-align: center;
`;

export const PayContainer = styled.div`
  display: flex;
  margin: 20px 0px 2.2% 9%;
`;

export const PayContent = styled.div`
  width: ${(props) => `${props.width}%`};
  font-weight: bolder;
  font-size: ${(props) => `${props.fontSize}px`};
  text-align: center;
  margin-top: ${(props) => (props.margin ? "2.5%" : "0%")};
`;

export const Count = styled.div`
  font-size: 14px;
  margin-top: -5%;
`;

export const SymbolContainer = styled.div`
  width: 49.5%;
  display: flex;
  margin-top: 2.5%;
  text-align: center;
  justify-content: space-around;
`;

export const Symbol = styled.div`
  border: solid gray 1px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 25px;
  line-height: 120%;
  background-color: black;
  color: white;
`;

export const FooterContainer = styled.div`
  display: flex;
  margin: 5% 0% 5% 15%;
  justify-content: center;
`;

export const FooterBtn = styled.button`
  width: 30%;
  border: solid black 1px;
  height: 65px;
  text-align: center;
  font-size: 25px;
  line-height: 270%;
  margin-right: 10px;
  font-weight: bolder;
  cursor: pointer;
  color: ${(props) => `${props.color}`};
  background-color: ${(props) => `${props.back}`};
  &:hover {
    color: #a5ba93;
  }
`;

export const Input = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  border: 1.5px solid gainsboro;
  margin-top: 7px;
`;
