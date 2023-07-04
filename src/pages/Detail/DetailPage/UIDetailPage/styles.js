import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  font-family: "OTWelcomeRA";
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;
export const Container2 = styled.div`
  font-family: "OTWelcomeRA";
  width: 100%;
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
  background: #ebebeb;
`;

export const ProductInfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Category = styled.div`
  margin-top: 20px;
  font-weight: bolder;
  font-size: 20px;
`;

export const Description = styled.span`
  color: gray;
  font-size: 17px;
  margin-top: 10px;
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
  width: 110px;
  justify-content: space-between;
`;

export const SizeBtn = styled.span`
  border: none;
  font-weight: bolder;
  line-height: 460%;
  cursor: pointer;
  height: 80px;
  width: 80px;
`;

export const SizeNum = styled.div`
  font-weight: bolder;
  font-size: 20px;
  line-height: 355%;
  margin-left: 35px;
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
  margin-top: 20px;
  margin-bottom: 155px;
`;

export const AddBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddBtn = styled.button`
  border: solid black 0px;
  background-color: #bcbcbc;
  border-radius: 10px;
  width: 88%;
  height: 50px;
  font-size: 20px;
  line-height: 250%;
  color: white;
  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
  }
  margin-top: -10px;
`;

export const HeartBtn = styled.div`
  margin-top: -2px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 35px;
  background: red;
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
  font-family: "OTWelcomeRA";
  font-weight: bold;
  margin-right: 3px;
`;

export const SimilarContainer = styled.div`
  display: flex;
  width: 1260px;
  margin: 0 auto;
`;

export const ShoesContainer = styled.div`
  width: 79%;
  display: flex;
  margin-left: 2px;
`;

export const GoToCartPageBtnContainer = styled.div`
  background-color: black;
  border-radius: 10px;
  width: 400px;
  height: 50px;
  position: absolute;
  line-height: 300%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  color: white;
  opacity: 0.9;
  z-index: 999;
  top: 415px;
`;

export const GoToCartBtn = styled.div`
  cursor: pointer;
  color: #a5ba93;
  margin-top: 5px;
`;

export const ReviewCount = styled.div`
  font-size: 12px;
  text-decoration: underline;
  color: #696969;
  cursor: pointer;
  margin: 2px 0px 0px 5px;
`;

export const Star = styled.div``;

export const Text = styled.div`
  margin-top: 5px;
`;
