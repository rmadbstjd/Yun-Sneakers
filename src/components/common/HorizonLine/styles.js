import styled from "@emotion/styled";

export const Line = styled.div`
  width: ${(props) => props.width};
  border-bottom: ${(props) => `${props.border} solid ${props.color}`};
  margin: ${(props) => props.margin};
  line-height: 0.1rem;
`;
