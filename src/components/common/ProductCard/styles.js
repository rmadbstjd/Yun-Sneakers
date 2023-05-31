import styled from "@emotion/styled/macro";

export const DeleteBtn = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 12px;
  right: -25px;
  cursor: pointer;
  display: none;
  color: black;
`;
export const Card = styled.div`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  cursor: pointer;
  font-family: "OTWelcomeRA";
  z-index: 1;
  &: hover {
    ${DeleteBtn} {
      display: block;
    }
  }
  font-family: "OTWelcomeRA";
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-top: 3.5%;
  background: #ebebeb;
`;

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 2px 0px;
`;

export const Category = styled.div`
  margin-bottom: 5px;
`;

export const Info = styled.div`
  font-size: 14px;
  height: 80px;
`;

export const Name = styled.div`
  margin-top: 5px;
  color: gray;
`;

export const PriceContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const HeartContainer = styled.div`
  display: flex;
`;

export const Num = styled.div`
  margin-top: -2px;
`;
