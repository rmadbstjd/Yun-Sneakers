import styled from "@emotion/styled";

export const Filter = styled.div`
  margin-top: 6px;
  width: 180px;
  border-top: solid black 3px;
  line-height: 250%;
  font-weight: bolder;
  margin-bottom: 50px;
`;

export const SideContainer = styled.div`
  width: 220px;
  word-break: break-all;
  font-family: "NanumSquareNeo-Variable";
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

export const BrandNavbar = styled.div`
  width: 120px;
  font-size: 14px;
  &:hover {
    font-weight: bolder;
  }
`;

export const HorizonLine = styled.div`
  width: 85%;
  border-bottom: 1px solid black;
  margin-bottom: 10%;
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
