import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
  font-family: "NanumSquareNeo-Variable";
  width: 1520px;
  display: flex;
  height: 100%;
  margin: 0px 50px 0px 80px;
`;

export const MainContainer = styled.div`
  margin-top: 144px;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const HorizonLine = styled.div`
  width: ${(props) => props.width};
  border-bottom: ${(props) => `${props.border}px solid ${props.color}`};
  line-height: 0.1rem;
`;

export const AddressContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: ${(props) => (props.isBoolean === false ? "50px" : null)};
  flex-direction: ${(props) => (props.isBoolean === false ? "column" : null)};
`;

export const Btn = styled.div`
  margin-top: 10px;
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

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
  margin-left: 35%;
`;
