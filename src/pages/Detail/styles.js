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
export const ImageLayout = styled.div`
  width: 720px;
  height: 425px;
  border: solid black 0px;
`;
export const Image = styled.img`
  width: 425px;
  height: 425px;
`;

export const ProductInfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Category = styled.div`
  font-weight: bolder;
  font-size: 20px;
`;

export const Description = styled.span`
  color: gray;
  font-size: 17px;
`;

export const SizeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const SizeTitle = styled.span`
  font-size: 18px;
  color: gray;
  line-height: 400%;
`;

export const Size = styled.span`
  display: flex;
  width: 75px;
  justify-content: space-between;
`;

export const SizeBtn = styled.span`
  border: none;
  font-weight: bolder;
  line-height: 460%;
  cursor: pointer;
  height: 80px;
`;

export const SizeNum = styled.div`
  font-weight: bolder;
  font-size: 20px;
  line-height: 355%;
`;

export const ShowSizeCircle = styled.div`
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

export const AddBtnContainer = styled.div`
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

export const SimilarProductTitleLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 1590px;
  margin: 0 auto;
`;

export const Span = styled.span`
  width: 79%;
  display: flex;
  margin-top: 50px;
  font-size: 20px;
  justify-content: fex-start;
`;

export const SimilarProductTitle = styled.span`
  font-family: "NanumSquareNeo-Variable";
  font-weight: bold;
  margin-right: 3px;
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

export const GoToCartPageBtnLayout = styled.div`
  border-radius: 10px;
  width: 400px;
  height: 50px;
  z-index: 999;
  position: absolute;
  top: 38%;
  left: 67.5%;
  transform: translate(-59%, 70%);
  background-color: black;
  opacity: 0.9;
`;

export const GoToCartPageBtnContainer = styled.div`
  line-height: 300%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  color: white;
`;

export const GoToCartBtn = styled.div`
  cursor: pointer;
  color: #a5ba93;
`;
