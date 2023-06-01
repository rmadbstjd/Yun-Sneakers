import styled from "@emotion/styled";

export const RequestBox = styled.div`
  border: solid #bebebe 1px;
  margin: 10px 0px 30px 132px;
  width: 400px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: white;
  line-height: 250%;
`;
export const Item = styled.div`
  border: solid black 0px;
  width: 129px;
  height: 40px;
  line-height: 240%;
`;
export const RequestContainer = styled.div`
  border-left: solid #bebebe 1px;
  border-right: solid #bebebe 1px;
  border-bottom: solid #bebebe 1px;
  position: absolute;
  margin: 360px 0px 0px 132px;
  z-index: 999;
`;

export const Request = styled.div`
  border: solid #bebebe 0px;
  width: 400px;
  height: 35px;
  line-height: 240%;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #d4d4d4;
  }
`;

export const TextArea = styled.textarea`
  width: 398px;
  height: 100px;
  margin: -30px 0px 30px 132px;
  outline: none;
  background: #f8f8f8;
`;

export const LetterCount = styled.div`
  width: 322px;
  height: 15px;
  font-size: 13px;
  text-align: end;
  color: black;
  margin: -30px 0px 10px 212px;
`;
