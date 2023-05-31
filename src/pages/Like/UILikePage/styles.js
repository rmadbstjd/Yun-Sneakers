import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: "OTWelcomeRA";
`;

export const ProductsContainer = styled.div`
  width: 1320px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  margin: 50px 0px 0px 20px;
`;

export const TitleContainer = styled.div`
  width: 99%;
  margin-top: 30px;
`;

export const Title = styled.span`
  margin-top: 30px;
  font-size: 20px;
  font-weight: bolder;
`;

export const NoneProductsContainer = styled.div`
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Span = styled.span`
  width: 500px;
  display: flex;
  justify-content: center;
  height: 20px;
  margin-top: -100px;
  font-size: 20px;
`;

export const GoToMainBtn = styled.button`
  border: none;
  background: white;
  margin-top: 5%;
  margin-left: 15%;
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
