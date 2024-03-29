import styled from "@emotion/styled";

export const Layout = styled.div`
  width: 67vw;
  margin: 0 auto;
`;

export const Title = styled.div`
  margin: 50px 0px 0px 0px;
  font-weight: bolder;
  font-size: 20px;
`;

export const ReviewContainer = styled.div`
  width: 100%;
  margin: 0px 0px 0px 0px;
`;

export const Review = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: ${(props) => props.isClicked && "#f4f4f4"};
`;

export const Content = styled.div`
  width: 1000px;
  overflow: ${(props) => !props.isClicked && "hidden"};
  text-overflow: ${(props) => !props.isClicked && "ellipsis"};
  white-space: ${(props) => !props.isClicked && "nowrap"};
`;

export const Size = styled.div`
  margin-bottom: 15px;
  color: #a0a0a0;
`;

export const Img = styled.img`
  width: ${(props) => (props.isClicked ? "150px" : "50px")};
  height: ${(props) => (props.isClicked ? "150px" : "50px")};
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftLayout = styled.div`
  width: 56vw;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 10px 0px;
`;

export const Star = styled.div``;

export const UserId = styled.span`
  margin-left: 10px;
`;
export const Date = styled.div``;

export const NoneTextTitle = styled.div`
  width: 90%;
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

export const NoneTextContent = styled.div`
  width: 90%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;
