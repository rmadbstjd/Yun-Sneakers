import React from "react";
import * as Style from "./styles";
import Button from "../../../../common/button";
const Layout = ({
  userId,
  title,
  content,
  validateTitle,
  validateContent,
  clickToSubmitBtn,
  noticeList,
  setShowWriteForm,
  isSecretChecked,
  setIsSecretChecked,
}) => {
  return (
    <Style.Modal>
      <Style.ID>
        <span>아이디 </span> <span>{userId}</span>
      </Style.ID>
      <Style.QuestionLayout>
        <Style.QuestionTitle>문의 제목</Style.QuestionTitle>
        <Style.InputTitle
          type="text"
          placeholder="30자 이내 입력"
          value={title}
          onChange={(e) => validateTitle(e)}
        ></Style.InputTitle>
        <Style.Label htmlFor="checkbox" secretChecked={isSecretChecked}>
          비밀글
        </Style.Label>
        <Style.CheckBox
          defaultChecked={isSecretChecked}
          type="checkbox"
          id="checkbox"
          onClick={() => {
            setIsSecretChecked((prev) => !prev);
          }}
        ></Style.CheckBox>
      </Style.QuestionLayout>
      <Style.QuestionLayout>
        <Style.QuestionTitle>내용</Style.QuestionTitle>
        <Style.InputTextArea
          placeholder="문의 내용은 최소 5자 이상 입력해주세요."
          onChange={(e) => validateContent(e)}
          value={content}
        ></Style.InputTextArea>
      </Style.QuestionLayout>
      <Style.Count>
        <Style.InitCount isInit={content.length === 0 ? true : false}>
          {content.length}&nbsp;
        </Style.InitCount>{" "}
        / 300
      </Style.Count>
      <Style.BtnLayout>
        <Button
          style={{
            border: "solid #d4d4d4 1px",
            width: "80px",
            height: "40px",
            margin: "0px 5px 0px 5px",
            color: "black",
            background: "white",
            fontWeight: "bolder",
          }}
          onClick={() => {
            setShowWriteForm(false);
          }}
        >
          닫기
        </Button>
        <Button
          style={{
            border: "solid #d4d4d4 1px",
            width: "80px",
            height: "40px",
            margin: "0px 5px 0px 5px",
            color: "white",
            hoverColor: "white",
            background: "#303033",
            hoverBackground: "#303033",
            fontWeight: "bolder",
          }}
          onClick={() => clickToSubmitBtn()}
        >
          등록
        </Button>
      </Style.BtnLayout>
      <Style.Notice>
        <Style.NoticeTitle>상품 Q&A 작성 시 유의사항</Style.NoticeTitle>
        {noticeList.map((text) => (
          <Style.Text key={text}>{text}</Style.Text>
        ))}
      </Style.Notice>
    </Style.Modal>
  );
};

export default Layout;
