import styled from "@emotion/styled";
export const Card = styled.div`
  width: 220px;
  height: 340px;
  margin: 20px 30px 20px 0px;
  cursor: pointer;
  font-family: "NanumSquareNeo-Variable";
  z-index: 1;
  &:hover {
    opacity: 0.9;
    scale: 1.05;
  }
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-top: 3.5%;
`;

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 2px 0px;
`;

export const Category = styled.div`
  margin-bottom: 5px;
`;

export const Info = styled.div`
  font-size: 14px;
  height: 80px;
`;

export const Name = styled.div`
  margin-top: 5px;
  color: gray;
`;

export const PriceContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const HeartContainer = styled.div`
  display: flex;
`;

export const Num = styled.div`
  margin-top: -2px;
`;
