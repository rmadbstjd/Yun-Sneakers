import styled from "@emotion/styled";

export const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 18px;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 5px;
  font-weight: bolder;
`;

export const SizeBox = styled.div`
  border: solid gray 1px;
  border-radius: 15px;
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 300%;
  margin: 10px;
  cursor: pointer;
  font-weight: bolder;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const Close = styled.div`
  width: 70px;
  margin-top: 40px;
  margin-left: 170px;
  height: 25px;
  text-align: center;
  cursor: pointer;
  background-color: black;
  border: solid black 0px;
  border-radius: 5px;
  line-height: 160%;
  color: white;
`;
