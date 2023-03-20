import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  height: 80px;
`;

export const Text = styled.div`
  margin-bottom: 10px;
`;
