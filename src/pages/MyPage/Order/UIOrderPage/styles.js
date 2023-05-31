import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
  font-family: "OTWelcomeRA";
  width: 1820px;
  display: flex;
  height: 100%;
  margin: 0px 50px 0px 80px;
`;

export const MainContainer = styled.div`
  margin-top: 144px;
`;

export const Header = styled.div`
  font-size: 21px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin: 20px 0px 5px 0px;
`;

export const HorizonLine = styled.div`
  width: 1600px;
  border-bottom: 2px solid black;
  line-height: 0.1rem;
`;

export const TopContainer = styled.div`
  display: flex;
  text-align: center;
  font-size: 16px;
  margin: 20px 0px 20px 0px;
`;

export const TopItem = styled.div`
  width: ${(props) => props.width};
`;

export const NoneText = styled.div`
  width: 1590px;
  text-align: center;
  font-weight: bolder;
  padding: 80px 0px 50px 0px;
`;

export const ProductContent = styled.div`
  display: flex;
  border: solid black 0px;
  width: 100%;
  height: 200px;
  text-align: center;
  margin: 0px 0px 15px 0px;
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  margin-top: -20px;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100px;
  text-align: left;
  margin-top: 50px;
`;

export const InfoItem = styled.div`
  padding: 10px;
`;

export const OrderDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  height: 200px;
`;

export const OrderNum = styled.div`
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 200px;
  line-height: 140%;
`;

export const FirstPrice = styled.div`
  text-decoration-line: line-through;
  color: gray;
`;

export const Coupon = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const State = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BtnContainer = styled.div`
  margin: -60px 0px 20px 0px;
`;

export const Text = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
`;

export const Btn = styled.button`
  border: solid gray 1px;
  width: 80px;
  margin-left: 17px;
  font-size: 15px;
  padding: 2px;
  background-color: white;
  &:hover {
    cursor: pointer;
    background: black;
    color: white;
  }
`;

export const ShipmentTitle = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin: 20px 0px 5px 0px;
`;

export const Review = styled.button`
  border: solid gray 1px;
  width: 70px;
  height: 25px;
  background-color: #303033;
  text-align: center;
  line-height: 190%;
  margin-top: 10px;
  cursor: pointer;
  color: white;
  font-size: 13px;
  &:hover {
    background-color: black;
    color: white;
  }
`;
