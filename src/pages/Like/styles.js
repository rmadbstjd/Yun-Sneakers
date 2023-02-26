import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: "NanumSquareNeo-Variable";
`;

export const ProductsContainer = styled.div`
  width: 1320px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  margin: 50px 0px 0px 65px;
`;

export const ContentContainer = styled.div`
  width: 99%;
`;

export const Title = styled.div`
  margin-top: 30px;
  font-size: 20px;
  font-weight: bolder;
`;

export const HorizonLine = styled.div`
  width: 100%;
  margin: 2% 0% 3% 0%;
  border-bottom: 3px solid black;
  line-height: 0.1rem;
`;

export const NoneProductsContainer = styled.div`
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Span = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  height: 20px;
  margin-top: -100px;
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
    background: black;
    color: white;
  }
`;
