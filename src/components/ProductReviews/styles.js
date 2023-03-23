import styled from "@emotion/styled";

export const Layout = styled.div`
  width: 1600px;
  margin: 0 auto;
`;

export const Title = styled.div`
  margin: 50px 0px 0px 170px;
  font-weight: bolder;
  font-size: 20px;
`;

export const ReviewContainer = styled.div`
  margin: 20px 0px 0px 170px;
`;

export const Review = styled.div`
  width: 89.5%;
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
  width: ${(props) => (props.isClicked === true ? "150px" : "50px")};
  height: ${(props) => (props.isClicked === true ? "150px" : "50px")};
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftLayout = styled.div``;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 10px 0px;
`;

export const Star = styled.div``;

export const Date = styled.div``;
