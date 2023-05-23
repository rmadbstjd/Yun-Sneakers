import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  margin-left: 17.2%;
`;

export const Input = styled.input`
  width: 20px;
  height: 20px;
  margin-left: ${(props) => props.margin};
`;

export const Title = styled.div`
  line-height: 175%;
  margin-left: 7px;
  font-size: 14px;
`;
