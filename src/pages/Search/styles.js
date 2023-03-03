import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 1400px;
  margin: 0 230px;
  font-family: "NanumSquareNeo-Variable";
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1350px;
  margin-left: 8%;
  margin-top: 30px;
`;

export const SearchBarLayout = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  margin-top: 5%;
  margin-left: ${(props) => (props.isText === true ? "60px" : null)};
  font-weight: bolder;
  font-size: 20px;
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
  width: 558px;
  border-bottom: 3px solid black;
  line-height: 0.1rem;
`;

export const SortLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1310px;
  height: 20px;
  margin-bottom: 10px;
`;

export const SortContent = styled.div`
  width: 100px;
  display: flex;
`;

export const Sort = styled.div`
  cursor: pointer;
`;

export const Content = styled.div`
  width: 98%;
  display: flex;
  justify-content: center;
  margin-top: ${(props) => (props.isShow === true ? "0px" : "30px")};
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
