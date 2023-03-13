import styled from "@emotion/styled";
export const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 200%;
  z-index: 5;
  position: absolute;
  top: 103%;
  left: 52%;
  transform: translate(-50%, -50%);
  background: white;
`;

export const SearchContainer = styled.div`
margin: 60px 0% 0% 28%;
width: 40%;
display: flex;
flex-direction: column;
justify-content: center;
}`;

export const SearchContent = styled.form`
  display: flex;
`;
export const SearchBar = styled.input`
  border: none;
  width: 100%;
  height: 50px;
  font-size: 25px;
  font-weight: bolder;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: gray;
    font-size: 20px;
    font-weight: normal;
  }
`;

export const Close = styled.div`
  position: fixed;
  right: 40px;
  top: 0px;
`;

export const HorizonLine = styled.div`
  width: 100%;
  border-bottom: 3px solid black;
  line-height: 0.1rem;
`;

export const RecentSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 220px;
  margin-top: 2%;
`;

export const RecentSearch = styled.div`
  font-size: 18px;
  font-weight: bolder;
`;

export const Delete = styled.div`
  cursor: pointer;
  color: darkgray;
  &:hover {
    color: black;
  }
`;

export const KeywordContainer = styled.div`
  width: 785px;
  display: flex;
`;

export const KeywordContent = styled.span`
  display: flex;
  height: 30px;
  margin: 10px 5px 5px 5px;
  line-height: 180%;
  justify-content: center;
`;

export const Keyword = styled.span`
  color: gray;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const KeywordClose = styled.div`
  margin-top: 5px;
  width: 20px;
  height: 20px;
  color: gray;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const RecommendSearch = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin-top: 50px;
`;

export const RecommendContainer = styled.div`
  display: flex;
`;

export const RecommendContent = styled.div`
  border: solid black 0px;
  width: 5rem;
  height: 30px;
  border-radius: 20px;
  text-align: center;
  margin: 20px 10px 10px 0px;
  background-color: #f5f5f5;
  cursor: pointer;
  line-height: 180%;
  &:hover {
    font-weight: bolder;
  }
`;

export const ProductsLayout = styled.div`
  position: fixed;
  top: 115px;
  width: 885px;
  background: white;
  height: 500px;
`;

export const ProductContent = styled.div`
  display: flex;
  width: 86.1%;
  margin: 10px 0px 10px 0px;
  &:hover {
    background: #fafafa;
  }
  cursor: pointer;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  font-size: 15px;
`;
export const ProductDesc = styled.span`
  color: black;
  margin-bottom: 5px;
`;
export const ProductTitle = styled.span`
  color: gray;
  font-size: 12px;
`;
export const NullTextLayout = styled.div`
  position: fixed;
  top: 130px;
  width: 785px;
  height: 500px;
  display: flex;
  background: white;
  justify-content: center;
`;

export const NullText = styled.span`
  font-size: 20px
  text-align: center;
  line-height : 1000%;

`;

export const BrandLayout = styled.div`
  width: 86.1%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin: 5px 0px 5px 0px;
`;
export const BrandName = styled.span`
  font-size: 18px;
  font-weight: bolder;
  line-height: 230%;
`;
export const KorName = styled.span``;
export const EngName = styled.span`
  color: #909090;
  font-weight: normal;
`;
export const BrandText = styled.span`
  font-size: 14px;
  line-height: 300%;
  color: #b1b1b1;
`;
