import React, { useState } from "react";
import * as Style from "./styles";
import Button from "../../common/button";
import { validateAddQnAForm } from "../../../utils/validateAddQnAForm";
import { getProductInfo, addQna } from "../../../api/product";
import { bringNowDates } from "../../../utils/bringNowDates";
import { useQuery } from "@tanstack/react-query";
const AddQnAForm = ({
  QnA,
  isSecretChecked,
  setIsSecretChecked,
  setShowWriteForm,
  noticeList,
  id,
  refetch,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dates = bringNowDates();

  const { data: productInfo } = useQuery([id], () => getProductInfo(id));
  const image = productInfo?.product?.image;

  const clickToSubmitBtn = async () => {
    if (validateAddQnAForm(title, content)) {
      await addQna(id, title, content, isSecretChecked, dates, image);
      setShowWriteForm(false);
      setTitle("");
      setContent("");
      setIsSecretChecked(false);
      refetch();
    }
  };
  const validateTitle = (e) => {
    if (e.target.value.length > 29) setTitle(title.substring(0, 29));
    else setTitle(e.target.value);
  };

  const validateContent = (e) => {
    if (e.target.value.length > 300) setContent(content.substring(0, 300));
    else setContent(e.target.value);
  };
  return (
    <Style.Modal>
      <Style.ID>
        <span>아이디 </span> <span>{QnA.userId}</span>
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
          border={"solid #d4d4d4 1px"}
          width={"80px"}
          height={"40px"}
          margin={"0px 5px 0px 5px"}
          color={"black"}
          background={"white"}
          fontWeight={"bolder"}
          onClick={() => {
            setShowWriteForm(false);
          }}
        >
          닫기
        </Button>
        <Button
          border={"solid #d4d4d4 1px"}
          width={"80px"}
          height={"40px"}
          margin={"0px 5px 0px 5px"}
          color={"white"}
          hoverColor={"white"}
          background={"#303033"}
          hoverBackground={"#303033"}
          fontWeight={"bolder"}
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

export default AddQnAForm;
