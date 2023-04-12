import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
  font-family: "NanumSquareNeo-Variable";
  width: 1910px;
  display: flex;
  height: 100%;
  margin: 0px 50px 0px 80px;
`;

export const MainContainer = styled.div`
  margin-top: 144px;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const ReviewContainer = styled.div`
  display: flex;
`;

export const ReviewLeftTitle = styled.div`
  border-top: solid black 1px;
  border-right: solid black 1px;
  border-left: solid black 1px;
  width: 180px;
  height: 45px;
  text-align: center;
  line-height: 250%;
  cursor: pointer;
  background-color: ${(props) => (props.state === true ? "black" : "white")};
  color: ${(props) => (props.state === true ? "white" : "black")};
`;
export const ReviewRightTitle = styled.div`
  border-top: solid black 1px;
  border-right: solid black 1px;
  border-left: solid black 1px;
  width: 180px;
  height: 45px;
  text-align: center;
  line-height: 250%;
  cursor: pointer;
  background-color: ${(props) => (props.state !== true ? "black" : "white")};
  color: ${(props) => (props.state !== true ? "white" : "black")};
`;

export const HorizonLine = styled.div`
  width: ${(props) => props.width};
  border-bottom: ${(props) => `${props.border}px solid ${props.color}`};
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

export const Date = styled.div`
  margin-top: 20px;
`;

export const ProductContent = styled.div`
  display: flex;
  border: solid black 0px;
  width: 100%;
  height: ${(props) => (props.isClicked !== true ? "150px" : "190px")};
  text-align: center;
  margin: 15px 0px 15px 0px;
  background: ${(props) => (props.isClicked !== true ? "white" : "#f4f4f4")};
  cursor: pointer;
`;
export const Img = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

export const Info = styled.div`
  width: 300px;
  height: 200px;
  font-size: 15px;
  line-height: 800%;
`;

export const Text = styled.div`
  padding: 10px;
  &:hover {
    cursor: pointer;
    font-weight: bolder;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 340px;
  height: 120px;
`;

export const FirstPrice = styled.div`
  text-decoration-line: line-through;
  color: gray;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 100px;
`;

export const Star = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 100px;
`;

export const BtnContainer = styled.div`
  display: flex;
  width: 150px;
  height: 100px;
  margin-left: -15px;
  justify-content: space-between;
  align-items: center;
`;

export const Btn = styled.div`
  border: solid gray 1px;
  border-radius: 15px;
  width: 80px;
  height: 30px;
  line-height: 190%;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const OrderNum = styled.div`
  display: flex;
  flex-direction: ${(props) => !props.isClicked && "column"};
  justify-content: center;
  width: 350px;
  height: ${(props) => (props.isClicked !== true ? "120px" : "240px")};
  overflow: ${(props) => !props.isClicked && "hidden"};
  text-overflow: ${(props) => !props.isClicked && "ellipsis"};
  white-space: ${(props) => !props.isClicked && "nowrap"};
`;

export const PriceContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 340px;
  height: ${(props) => props.height};
`;

export const Coupon = styled.div`
width: 300px;
height: 120px;
display: flex;
flex-direction: column;
justify-content: center;
}`;

export const State = styled.div`
  width: 185px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Review = styled.div`
  border: solid gray 1px;
  width: 70px;
  height: 25px;
  background-color: #303033;
  text-align: center;
  line-height: 190%;
  margin-top: 45px;
  cursor: pointer;
  color: white;
  font-size: 13px;
  &:hover {
    background-color: black;
    color: white;
  }
`;
