import styled from "@emotion/styled";

export const MyPageContainer = styled.div`
  font-family: "NanumSquareNeo-Variable";
  width: 1820px;
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
  border-top: solid black 2px;
  border-right: solid black 2px;
  border-left: solid black 2px;
  width: 180px;
  height: 45px;
  text-align: center;
  line-height: 250%;
  cursor: pointer;
  background-color: ${(props) => (props.state === true ? "black" : "white")};
  color: ${(props) => (props.state === true ? "white" : "black")};
`;

export const HorizonLine = styled.div`
  width: ${(props) => props.width};
  border-bottom: ${(props) => `${props.border}px solid ${props.color}`};
  line-height: 0.1rem;
`;

export const TopContainer = styled.div`
  display: flex;

  font-size: 16px;
  margin: 20px 0px 20px 0px;
`;

export const TopItem = styled.div`
  width: ${(props) => props.width};
  margin-right: 10px;
`;

export const ProductContent = styled.div`
  display: flex;
  border: solid black 0px;
  width: 100%;
  height: ${(props) => (props.isClicked !== true ? "100px" : "340px")};
  margin: 15px 0px 15px 0px;

  cursor: pointer;
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

export const Info = styled.div`
  width: 300px;
  height: 100px;
  font-size: 13px;
`;

export const Text = styled.div`
  display: flex;
  text-align: left;
  padding: 10px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => props.width};
  height: 100px;
  margin-right: 10px;
`;

export const AnswerBox = styled.div`
  border: solid black 0px;
  color: white;
  width: 60px;
  height: 35px;
  background: ${(props) => (props.answered === true ? "#375fff" : "gray")};
  text-align: center;
  line-height: 210%;
  margin-top: 5px;
`;

export const QnAContent = styled.div`
  cursor: pointer;
  font-weight: ${(props) => (props.font === "bolder" ? "bolder" : null)};
  margin-bottom: 20px;
`;

export const QnALayout = styled.div`
  margin-top: -240px;
  background: ${(props) => props.isShow && "#f3f3f3"};
`;
export const QnATitle = styled.div`
  margin-left: 12px;
  line-height: 150%;
`;
export const QnAContents = styled.div`
  margin-left: 12px;
`;

export const Q = styled.div`
  font-size: 35px;
  font-weight: bolder;
  margin-left: 10px;
  margin-bottom: 10px;
`;
