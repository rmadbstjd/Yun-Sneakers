import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
  font-family: "NanumSquareNeo-Variable";
  width: 1620px;
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

export const ProductsContainer = styled.div`
  width: 1220px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  margin: 50px 0px 0px 50px;
`;

export const NoneProductContainer = styled.div`
  margin-top: 10%;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Span = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  height: 20px;
  font-size: 20px;
`;

export const Btn = styled.div`
  margin-top: 5%;
  margin-left: 10%;
  border: solid gray 1px;
  width: 350px;
  padding: 20px;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
  color: #3a3b3c;
  font-weight: bold;
  &:hover {
    background-color: black;
    color: white;
    transition: all 0.3s;
  }
`;
