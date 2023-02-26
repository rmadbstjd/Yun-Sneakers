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

export const TitleENG = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 20px;
`;

export const TitleKOR = styled.div`
  margin-top: 3px;
  width: 100%;
  color: #3a3b3c;
  font-family: "NanumSquareNeo-Variable";
  font-size: 15px;
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 213px;
  height: 80px;
  padding: 10px;
  margin: 20px 15px 10px 0px;
  border: soldi black 1px;
  border-radius: 20px;
  background-color: #222222;
  text-align: center;
  cursor: pointer;
  color: white;
  &:hover {
    scale: 1.05;
  }
`;
