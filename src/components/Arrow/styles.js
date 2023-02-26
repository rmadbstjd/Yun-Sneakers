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
  margin-top: 5px;
  cursor: pointer;
  text-align: center;
  cursor: ${(props) => (props.abled === true ? "pointer" : "not-allowed")};
  &:hover {
    margin-right: -5px;
    border: solid black 0px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fafafa;
  }
`;

export const Right = styled.div`
  margin-top: 4px;
  cursor: pointer;

  text-align: center;
  line-height: 150%;
  &:hover {
    margin-left: -5px;
    border: solid black 0px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fafafa;
  }
  cursor: ${(props) => (props.abled === true ? "pointer" : "not-allowed")};
`;

export const Layout = styled.div`
  display: flex;
  margin-top: 5px;
`;

export const Current = styled.div`
  color: black;
`;
