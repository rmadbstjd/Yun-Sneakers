import styled from "@emotion/styled";
export const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  z-index: 5;
  position: absolute;
  top: 53%;
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
  font-size: 30px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: gray;
    font-size: 20px;
  }
`;

export const Close = styled.div`
  position: fixed;
  right: 60px;
  top: -30px;
`;

export const HorizonLine = styled.div`
  width: 93%;
  border-bottom: 5px solid black;
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
  margin-top: 5px;
  color: darkgray;
  &:hover {
    color: black;
  }
`;

export const KeywordContainer = styled.div`
  width: 785px;
  display: flex;
`;

export const KeywordContent = styled.div`
  display: flex;
  width: 100px;
  height: 30px;
  margin: 10px 5px 5px 5px;
  line-height: 180%;
  justify-content: center;
`;

export const Keyword = styled.div`
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
  margin-top: 10px;
`;

export const RecommendContainer = styled.div`
  display: flex;
`;

export const RecommendContent = styled.div`
  border: solid black 0px;
  width: 100px;
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
  top: 130px;
  width: 885px;
  background: white;
  height: 500px;
`;

export const ProductContent = styled.div`
  display: flex;
  margin: 0px 0px 20px 0px;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NullTextLayout = styled.div`
  position: fixed;
  top: 130px;
  width: 885px;
  height: 500px;
  display: flex;
  background: white;
  justify-content: center;
`;

export const NullText = styled.span`
  font-size: 20px;
  margin-top: 50px;
  text-align: center;
`;
