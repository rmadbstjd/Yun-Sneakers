import styled from "@emotion/styled";

export const Container = styled.div`
  min-width: 220px;
  word-break: break-all;
  font-family: "NanumSquareNeo-Variable";
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
`;

export const BrandNavbar = styled.div`
  width: 100%;
  font-size: 25px;
  line-height: 250%;
`;

export const HorizonLine = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  line-height: 0.1rem;
`;

export const BrandContent = styled.div`
  display: ${(props) => (props.isShow === true ? "block" : "none")};
`;

export const Item = styled.div`
  padding: 10px 5px 10px 5px;
`;

export const ItemName = styled.label`
  cursor: pointer;
`;
