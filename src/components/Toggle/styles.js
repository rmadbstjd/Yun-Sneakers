import styled from "@emotion/styled";
export const Container = styled.div`
  width: 98%;
  height: 133px;
  color: black;
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(0%, 12%);
  margin-top: 10px;
  z-index: 999;
`;

export const Content = styled.div`
  cursor: pointer;
  height: 45px;
  opacity: 0.8;
  margin: 0% 0% 5% 2%;
  line-height: 270%;
  &:hover {
    opacity: 1;
    font-weight: bolder;
  }
`;

export const Title = styled.span`
  font-weight: bolder;
  padding: 10px;
  font-size: 15px;
`;

export const Description = styled.span`
  color: black;
  font-size: 14px;
  padding-left: 10px;
`;
