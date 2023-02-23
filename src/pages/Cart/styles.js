import styled from "@emotion/styled";

export const NullContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: "NanumSquareNeo-Variable";
`;

export const NullContent = styled.div`
  width: 71%;
`;

export const HorizonLine = styled.div`
  width: 100%;
  margin-top: ${(props) => `${props.margin}%`};
  border-bottom: 5px solid black;
  line-height: 0.1rem;
`;

export const HorizonBottomLine = styled.div`
  width: 100%;
  margin-top: 3%;
  border-bottom: 3px solid gray;
  line-height: 0.1rem;
`;
export const NullText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 35px;
  margin-top: 10%;
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
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: "NanumSquareNeo-Variable";
`;

export const ProductsContainer = styled.div`
  width: 70.5%;
  margin-top: 60px;
`;

export const MenuContainer = styled.div`
  width: 70%;
  font-size: 30px;
  font-weight: bold;
  justify-content: space-between;
`;

export const Menu = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const MenuHeader = styled.div`
  border: solid gray 1px;
  text-align: center;
  margin-top: 50px;
  line-height: 250%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
`;

export const MenuContent = styled.div`
  width: 100%;
  display: flex;
`;

export const MenuOption = styled.div`
  width: ${(props) => `${props.width}%`};
  text-align: center;
`;

export const PayContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 2.2%;
`;

export const PayContent = styled.div`
  width: ${(props) => `${props.width}%`};
  font-weight: bolder;
  font-size: ${(props) => `${props.fontSize}px`};
  text-align: center;
  margin-top: ${(props) => (props.margin === true ? "2.5%" : "0%")};
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
  margin-top: 5%;
  justify-content: center;
  margin-bottom: 5%;
`;

export const FooterBtn = styled.div`
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
