import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: "NanumSquareNeo-Variable";
`;

export const ProductsContainer = styled.div`
  width: 1250px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  margin: 50px;
`;

export const TitleENG = styled.div`
  margin-top: 20px;
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

export const MoreContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 45px;
`;

export const More = styled.div`
  text-align: center;
  line-height: 160%;
  width: 200px;
  height: 45px;
  font-weight: bold;
  color: gray;
`;

export const Btn = styled.div`
  border: solid gray 1px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background: white;
  color: black;
  cursor: pointer;
  line-height: 240%;
  font-weight: 100;
  display: ${(props) => (props.isShow === true ? "block" : "none")};
  &:hover {
    background: black;
    color: white;
  }
`;
