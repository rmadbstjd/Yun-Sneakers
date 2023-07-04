import styled from "@emotion/styled";
export const Product = styled.div`
  margin-top: 20px;
  width: ${(props) => props.width};
  cursor: pointer;
  font-family: "OTWelcomeRA";
  margin-right: 3vw;
`;

export const Img = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border-radius: 10px;
  margin-bottom: 5px;
  background: #ededed;
  &:hover {
    scale: 1.05;
  }
`;

export const Category = styled.div`
  margin-bottom: 10px;
`;

export const Name = styled.div`
  width: ${(props) => props.width};
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
`;

export const Price = styled.div`
  font-size: 15px;
  font-weight: bolder;
`;
