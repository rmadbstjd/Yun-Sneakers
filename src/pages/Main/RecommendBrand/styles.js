import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: "OTWelcomeRA";
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
  font-family: "OTWelcomeRA";
  font-size: 15px;
`;

export const BrandLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 213px;
  height: 80px;
  padding: 10px;
  margin: 20px 15px 10px 0px;
  border: soldi black 1px;
  border-radius: 20px;
  background-color: black;
  text-align: center;
  cursor: pointer;
  &:hover {
    scale: 1.05;
    background: black;
    transition: all 0.3s;
  }
`;

export const Img = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop};
  color: white;
`;
