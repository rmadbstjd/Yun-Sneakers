import styled from "@emotion/styled";

export const Container = styled.div`
  font-family: "NanumSquareNeo-Variable";
  display: flex;
  justify-content: center;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
  margin-top: 85px;
`;

export const HorizonLine = styled.div`
  width: ${(props) => props.width};
  border-bottom: ${(props) => `${props.border}px solid ${props.color}`};
  line-height: 0.1rem;
`;

export const Title = styled.div`
  font-weight: bolder;
  font-size: 20px;
  padding: 20px;
`;

export const InfoSelectContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const LeftSelectBox = styled.div`
  border-top: solid #bebebe 1px;
  border-left: ${(props) =>
    props.newShip === false ? "solid #bebebe 1px" : null};
  color: ${(props) => (props.newShip === false ? "black" : "#bebebe")};
  background: ${(props) => (props.newShip === true ? "#f5f5f5" : null)};
  width: 150px;
  height: 50px;
  font-size: 14px;
  text-align: center;
  line-height: 350%;
  cursor: pointer;
`;

export const RightSelectBox = styled.div`
  border-bottom: ${(props) =>
    props.newShip === false ? "solid #bebebe 1px" : null};
  border-top: ${(props) =>
    props.newShip === true ? "solid #bebebe 1px" : null};
  border-right: ${(props) =>
    props.newShip === true ? "solid #bebebe 1px" : null};
  color: ${(props) => (props.newShip === false ? "#bebebe" : "black")};
  background: ${(props) => (props.newShip === false ? "#f5f5f5" : "white")};
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 350%;
  font-size: 14px;
  cursor: pointer;
`;

export const BonusCouponContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const CouponLeftBox = styled.div`
  width: 130px;
  height: 50px;
  line-height: 300%;
`;

export const CouponRightBox = styled.div`
  border: solid #bebebe 1px;
  width: 600px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 5px;
`;

export const Default = styled.div`
  line-height: 230%;
  margin-left: 10px;
`;

export const ShowCouponSheet = styled.div`
  border-left: solid #bebebe 1px;
  border-right: solid #bebebe 1px;
  border-bottom: solid #bebebe 1px;
  position: absolute;
  margin: -8px 0px 0px 130px;
  z-index: 999;
`;

export const Coupon = styled.div`
  border: solid #bebebe 0px;
  width: 600px;
  height: 40px;
  line-height: 240%;
  background-color: white;
  &:hover {
    background-color: #d4d4d4;
    cursor: pointer;
  }
`;

export const BrandCouponContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const BrandCouponBox = styled.div`
  border: solid #bebebe 1px;
  width: 600px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: #ececec;
  color: #6a6a6a;
  line-height: 240%;
  margin-top: 5px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 734px;
  height: 100px;
  justify-content: flex-start;
`;

export const Card = styled.div`
  cursor: ${(props) =>
    props.item === "신용/체크카드" ? "pointer" : "not-allowed"};
  background-color: ${(props) =>
    props.item === "신용/체크카드" ? "black" : "white"};
  color: ${(props) => (props.item === "신용/체크카드" ? "white" : "black")};
  border: 1px solid #bebebe;
  width: 140px;
  height: 40px;
  text-align: center;
  margin: 2px;
  line-height: 290%;
  font-size: 14px;
`;

export const SelectCard = styled.div`
  display: flex;
  border: 1px solid #bebebe;
  width: 734px;
  height: 40px;
  line-height: 290%;
  font-size: 14px;
  cursor: pointer;
`;

export const CardTitle = styled.div`
  width: 200px;
  margin-left: 10px;
`;

export const Modal = styled.div`
  border-left: solid #bebebe 1px;
  border-right: solid #bebebe 1px;
  border-bottom: solid #bebebe 1px;
  position: absolute;
  margin: -8px 0px 0px 0px;
  z-index: 999;
`;

export const CardItem = styled.div`
  width: 724px;
  height: 40px;
  margin-top: 10px;
  line-height: 240%;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #ececec;
  }
`;

export const SelectedBudget = styled.div`
position: relative;
display: flex;
border: 1px solid #bebebe;
width: 734px;
height: 40px;
line-height: 290%;
font-size: 14px;
margin-top: 10px;
cursor: pointer;
z-index: 199;
}`;

export const RightContainer = styled.div`
  border: solid black 5px;
  width: 650px;
  height: 1200px;
  margin-top: 85px;
  margin-left: 20px;
`;

export const OrderTitle = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin: 25px;
`;

export const ProductsContaier = styled.div`
  border: solid black 0px;
  width: 600px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-left: 25px;
`;

export const ProductsContent = styled.div`
  display: flex;
  border: solid black 0px;
  width: 600px;
  height: 200px;
  margin-bottom: 20px;
`;

export const Category = styled.div`
  margin: 10px;
  text-decoration: underline;
`;

export const Name = styled.div`
  margin: 10px;
  font-weight: bolder;
`;

export const Size = styled.div`
  margin: 10px;
  font-size: 15px;
`;

export const PriceContainer = styled.div`
display: flex;
margin: 20px 10px 10px 10px;
font-size: 15px;
}`;

export const InfoContainer = styled.div`
  border: solid black 0px;
  width: 600px;
  height: 250px;
  margin: 35px 0px 0px 25px;
`;

export const InfoContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px;
`;

export const InfoTotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px;
  font-weight: bolder;
`;

export const CheckBoxContainer = styled.div`
  border: solid black 0px;
  width: 600px;
  height: 200px;
  margin: 0px 0px 0px 25px;
`;

export const CheckBoxContent = styled.div`
  display: flex;
`;

export const CheckBox = styled.input`
  width: 25px;
  height: 25px;
`;

export const CheckBoxLetter = styled.div`
  margin: 5px;
  color: ${(props) => props.color};
`;

export const PaymentBtn = styled.div`
  border: solid black 0px;
  width: 600px;
  height: 70px;
  background-color: black;
  color: white;
  font-size: 25px;
  font-weight: bolder;
  margin: 40px 0px 0px 25px;
  text-align: center;
  line-height: 270%;
  cursor: pointer;
`;
