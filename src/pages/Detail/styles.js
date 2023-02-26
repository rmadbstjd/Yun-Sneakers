import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  font-family: "NanumSquareNeo-Variable";
  justify-content: center;
  width: 1820px;
  margin: 0 auto;
`;

export const ProductContainer = styled.div`
  width: 69%;
  margin-top: 100px;
  display: flex;
`;

export const Image = styled.div`
  border: solid black 0px;
  width: 720px;
  height: 425px;
  background-size: contain;
  background-repeat: no-repeat;
  flex-shrink: 0;
`;

export const InfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Category = styled.div`
  font-weight: bolder;
  font-size: 20px;
`;

export const Description = styled.div`
  color: gray;
  font-size: 17px;
`;

export const SizeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const SizeTitle = styled.div`
  font-size: 18px;
  color: gray;
  line-height: 400%;
`;

export const Size = styled.div`
  display: flex;
  width: 75px;
  justify-content: space-between;
`;

export const SizeBtn = styled.div`
  cursor: pointer;
  font-weight: bolder;
  line-height: 460%;
  cursor: pointer;
`;

export const SizeNum = styled.div`
  font-weight: bolder;
  font-size: 20px;
  line-height: 355%;
`;

export const Circle = styled.div`
  margin-top: 2px;
  cursor: pointer;
  line-height: 490%;
  &:hover {
    color: red;
  }
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 155px;
`;

export const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddBtn = styled.div`
  border: solid black 0px;
  background-color: #bcbcbc;
  border-radius: 10px;
  width: 88%;
  text-align: center;
  height: 50px;
  font-size: 20px;
  line-height: 250%;
  color: white;
  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
    transition: all 0.8s;
  }
`;

export const HeartBtn = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 35px;
`;

export const SpanContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1590px;
  margin: 0 auto;
`;

export const Span = styled.div`
  width: 79%;
  display: flex;
  margin-top: 50px;
  font-size: 20px;
  justify-content: fex-start;
`;

export const Category2 = styled.span`
  font-family: "NanumSquareNeo-Variable";
  font-weight: bold;
  line-height: 140%;
`;

export const SimilarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1600px;
  margin: 0 auto;
`;

export const ShoesContainer = styled.div`
  width: 79%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
