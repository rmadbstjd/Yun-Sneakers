import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: "NanumSquareNeo-Variable";
`;

export const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1350px;
  margin-left: 8%;
  margin-top: 30px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  margin-top: 5%;
`;

export const SearchContent = styled.form`
  display: flex;
`;

export const InputSearch = styled.input`
  border: none;
  min-width: 520px;
  height: 40px;
  font-size: 25px;
  &:focus {
    outline: none;
  }
`;

export const HorizonLine = styled.div`
  max-width: 558px;
  min-width: 558px;
  border-bottom: 3px solid black;
  line-height: 0.1rem;
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1110px;
  height: 20px;
  margin-bottom: 10px;
`;

export const SortContent = styled.div`
  width: 100px;
  display: flex;
`;

export const Sort = styled.did`
  cursor: pointer;
`;

export const Content = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
`;

export const Products = styled.div`
  width: 1250px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
`;

export const NotFound = styled.div`
  width: 85%;
  margin-top: 90px;
  text-align: center;
  font-weight: bolder;
`;
