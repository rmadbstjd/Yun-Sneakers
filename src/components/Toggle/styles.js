import styled from "@emotion/styled";
export const Container = styled.div`
  border: solid #bebebe 1px;
  height: 133px;
  color: black;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  transform: translate(0%, 12%);
  margin-top: 10px;
  z-index: 999;
  box-shadow: 1px 2px 2px 2px #bebebe;
`;

export const Content = styled.div`
  cursor: pointer;
  height: 70px;
  &:hover {
    background-color: #fafafa;
  }
`;

export const Title = styled.div`
  font-weight: bolder;
  padding: 10px;
  font-size: 15px;
`;

export const Description = styled.div`
  color: lightGray;
  font-size: 14px;
  padding-left: 10px;
`;
