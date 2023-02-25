import styled from "@emotion/styled";
export const Container = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  font-size: 25px;
`;

export const Size = styled.div`
  width: 210px;
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  cursor: ${(props) => (props.abled === true ? "pointer" : "not-allowed")};
`;

export const Right = styled.div`
  margin-top: 2px;
  cursor: pointer;
  text-align: center;
  line-height: 150%;
  font-size: 30px;
  cursor: ${(props) => (props.abled === true ? "pointer" : "not-allowed")};
`;

export const Layout = styled.div`
  display: flex;
  margin-top: 5px;
`;

export const Current = styled.div`
  color: black;
`;
