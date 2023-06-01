import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
  font-family: "OTWelcomeRA";
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
  background-color: ${(props) => (props.state ? "black" : "white")};
  color: ${(props) => (props.state ? "white" : "black")};
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
  background-color: ${(props) => (!props.state ? "black" : "white")};
  color: ${(props) => (!props.state ? "white" : "black")};
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
  height: 150px;
  text-align: center;
  margin: 15px 0px 15px 0px;
  &:hover {
    background-color: #fafafa;
  }
`;
export const Img = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
  margin-top: -30px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100px;
  text-align: left;
  font-size: 15px;
  margin-top: 10px;
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
  width: 350px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PriceContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 340px;
  height: ${(props) => props.height};
`;

export const Coupon = styled.div`
width: 195px;
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
  line-height: 220%;
  margin-top: 10px;
  cursor: pointer;
  color: white;
  font-size: 13px;
  &:hover {
    background-color: black;
    color: white;
  }
`;
///////////////////////////////////////////////
export const TReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const TStar = styled.div`
  margin-top: 10px;
`;
export const TReviewTitle = styled.div`
  font-size: 22px;
  font-weight: bolder;
  margin: 20px 0px 30px 0px;
`;

export const TProductContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 500px;
  height: 150px;
`;

export const TQnAContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
`;

export const TImg = styled.img`
  width: 150px;
  height: 150px;
`;

export const TInfoContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: 75%;
`;

export const TProductCategory = styled.div`
  font-weight: bolder;r
  margin-bottom: 10px;
  width: 75%;
`;

export const TProductName = styled.div`
  margin-bottom: 3px;
`;

export const TProductDescription = styled.div`
  margin-bottom: 3px;
  height: 122px;
`;

export const TSize = styled.div``;
export const THorizonLine = styled.div`
  width: 95%;
  margin-top: 20px;
  border-bottom: 2px solid #d4d4d4;
  line-height: 0.1rem;
`;

export const TStarContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

export const TStarTopText = styled.div`
  font-weight: bolder;
  margin: 10px 0px 5px 0px;
`;

export const TStarBotText = styled.div`
  color: gray;
`;
export const TextLength = styled.div`
  display: flex;
  margin: 10px 0px -10px 0px;
  justify-content: flex-end;
`;
export const TextArea = styled.textarea`
  margin-top: 10px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  resize: none;
  outline-color: black;
  background: #ececec;
`;

export const TBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
  margin-left: 35%;
  margin-top: 10px;
`;

export const TBtn = styled.div`
  border: solid gray 1px;
  border-radius: 15px;
  width: 70px;
  height: 30px;
  line-height: 190%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
