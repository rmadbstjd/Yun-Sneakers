import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 1400px;
  margin: 0 230px;
  font-family: "NanumSquareNeo-Variable";
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1350px;
  margin-left: 8%;
  margin-top: 30px;
`;

export const SearchBarLayout = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  margin-top: 5%;
  margin-left: ${(props) => (props.isText === true ? "60px" : null)};
  font-weight: bolder;
  font-size: 20px;
  color: black;
`;

export const SearchContent = styled.form`
  display: flex;
`;

export const InputSearch = styled.input`
  border: none;
  min-width: 520px;
  height: 40px;
  font-size: 25px;
  &:focus {
    outline: none;
  }
`;

export const SortLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1310px;
  height: 20px;
  margin-bottom: 10px;
`;

export const SortContent = styled.div`
  width: 100px;
  display: flex;
`;

export const Sort = styled.div`
  cursor: pointer;
`;

export const Content = styled.div`
  width: 98%;
  display: flex;
  justify-content: center;
  margin-top: ${(props) => (props.isShow === true ? "0px" : "30px")};
`;

export const Products = styled.div`
  width: 1250px;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
`;

export const NotFound = styled.div`
  width: 85%;
  text-align: center;
  font-weight: bolder;
  margin-top: -130px;
`;

export const SelectedBrandContainer = styled.div`
  width: 100%;
  display: flex;
  height: 20px;
  margin: 5px 0px 40px 0px;
`;

export const SelectedBrand = styled.div`
  border: solid #375fff 1px;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  background: #375fff;
  color: white;
  height: 20px;
  line-height: 130%;
  display: flex;
  margin-right: 10px;
`;

export const Close = styled.div`
  border-radius: 50%;
  border: solid black 0px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 180%;
  margin: 0.2px 0px 0px 8px;
  background: #2642b2;
  cursor: pointer;
`;

///////////////////////////
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

export const BrandContent = styled.div`
  display: ${(props) => (props.isShow === true ? "block" : "none")};
`;

export const Item = styled.div`
  padding: 10px 5px 10px 5px;
`;

export const ItemName = styled.label`
  cursor: pointer;
`;
