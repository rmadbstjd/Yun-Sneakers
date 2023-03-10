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

export const MoreContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 65px 0px 100px 0px;
`;

export const More = styled.div`
  text-align: center;
  line-height: 160%;
  width: 200px;
  height: 40px;
  margin-left: -65px;
  font-weight: bold;
  color: gray;
`;

export const Btn = styled.div`
  border: solid gray 1px;
  width: 100px;
  margin-left: 30px;
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
