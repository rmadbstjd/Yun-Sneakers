import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 145px 20px 0px 10px;
  width: 150px;
  height: 400px;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const NickName = styled.div`
  width: 160px;
  text-align: start;
  font-weight: bolder;
  font-size: 22px;
`;

export const Last = styled.span`
  font-size: 17px;
`;

export const Item = styled.div`
  color: ${(props) => (props.isChecked ? "black" : "gray")};
  font-weight: ${(props) => (props.isChecked ? "bolder" : "none")};
  margin-top: 10px;
  cursor: pointer;
`;
