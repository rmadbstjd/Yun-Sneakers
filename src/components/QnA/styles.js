import styled from "@emotion/styled";

export const Layout = styled.div`
  width: 1260px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 20px 0px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
  margin-top: 10px;
`;

export const Write = styled.div`
  text-decoration: underline;
  cursor: pointer;
  font-weight: bolder;
  margin-top: 10px;
`;

export const Modal = styled.div`
  background: #f4f4f4;
`;

export const ID = styled.div`
  width: 163px;
  margin-left: 30px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const QuestionTitle = styled.div`
  margin-right: 20px;
`;

export const QuestionLayout = styled.div`
  display: flex;
  margin: 30px 0px 0px 30px;
  line-height: 135%;
`;

export const InputTitle = styled.input`
  border: solid #d4d4d4 1px;
`;

export const CheckBox = styled.input`
  border: solid #d4d4d4 1px;
  height: 25px;
  width: 20px;
  height: 20px;
`;

export const Label = styled.label`
  margin-left: 10px;
  font-weight: ${(props) => props.secretChecked && "bolder"};
  font-size: 15px;
  line-height: 160%;
`;

export const InputTextArea = styled.textarea`
  width: 1100px;
  height: 150px;
  margin-left: 38px;
  border: solid #d4d4d4 1px;
  resize: none;
  padding: 10px;
`;

export const BtnLayout = styled.div`
  display: flex;
  width: 1247px;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const Btn = styled.button`
  border: solid #d4d4d4 1px;
  width: 80px;
  height: 40px;
  margin: 0px 5px 0px 5px;
  color: ${(props) => props.color};
  background: ${(props) => props.backColor};
  font-weight: bolder;
  cursor: pointer;
`;

export const Notice = styled.div`
  width: 900px;
  margin: 0px 0px 30px 120px;
  font-size: 13px;
  color: #a3a0a0;
`;

export const NoticeTitle = styled.div`
  margin: -60px 0px 20px 0px;
`;

export const Text = styled.div`
  line-height: 180%;
`;

export const Count = styled.div`
  width: 1240px;
  display: flex;
  margin-top: 5px;
  justify-content: flex-end;
`;

export const InitCount = styled.div`
  color: ${(props) => (props.isInit === false ? "black" : "gray")};
`;

export const QnALayout = styled.div`
  padding: 10px 0px 0px 10px;
  line-height: 190%;
  background: ${(props) => props.isShow && "#f3f3f3"};
`;

export const LockImg = styled.div`
  margin-top: 2.5px;
`;
export const QnAContainer = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const QnAInfo = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-around;
  font-size: 13px;
  cursor: pointer;
`;
export const UserId = styled.div``;

export const Dates = styled.div``;

export const AnswerBox = styled.div`
  border: solid black 0px;
  color: white;
  width: 35px;
  height: 25px;
  background: ${(props) => (props.answered === true ? "#375fff" : "gray")};
  text-align: center;
  line-height: 185%;
  margin-top: 5px;
`;

export const QnATitle = styled.div`
  display: flex;
  cursor: pointer;
`;

export const QnAContent = styled.div`
  cursor: pointer;
`;

export const NullText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

export const ButtonLayout = styled.div`
  width: 1236px;
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.div`
  text-decoration: underline;
  margin: 0px 5px 0px 5px;
  cursor: pointer;
`;
