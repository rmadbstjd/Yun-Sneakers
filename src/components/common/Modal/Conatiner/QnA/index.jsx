import React from "react";
import * as Style from "./styles";
import Button from "../../../button";
import { useTextInputs } from "./../../../../../hooks/useInputs";

const QnAModal = ({ setModalIsOpen, qna, submitBtn }) => {
  const { state: text, handleChange: setText } = useTextInputs("", 300);

  return (
    <>
      <Style.ReviewContainer>
        <Style.ReviewTitle>Q&A 답변</Style.ReviewTitle>
        <Style.QnAContent>
          <Style.Img alt="상품" src={qna?.image}></Style.Img>
          <Style.InfoContainer>
            <Style.ProductCategory>[제목] {qna?.title}</Style.ProductCategory>

            <Style.ProductDescription>
              [내용] {qna?.content}
            </Style.ProductDescription>
          </Style.InfoContainer>
        </Style.QnAContent>
        <Style.HorizonLine></Style.HorizonLine>
        <div>
          <Style.TextArea
            width={"940px"}
            height={"200px"}
            placeholder="질문에 대한 답변을 작성해주세요."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></Style.TextArea>
          <Style.TextLength>{text.length} / 300</Style.TextLength>
        </div>
      </Style.ReviewContainer>
      <Style.BtnContainer>
        <Button
          style={{
            border: "solid gray 1px",
            borderRadius: "15px",
            width: "70px",
            height: "30px",
            lineHeight: "190%",
            color: "black",
            background: "white",
            hoverColor: "white",
            hoverBackground: "black",
          }}
          isShow={true}
          onClick={() => {
            submitBtn(text);
          }}
        >
          저장
        </Button>
        <Button
          style={{
            border: "solid gray 1px",
            borderRadius: "15px",
            width: "70px",
            height: "30px",
            lineHeight: "190%",
            color: "black",
            background: "white",
            hoverColor: "white",
            hoverBackground: "black",
          }}
          isShow={true}
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          취소
        </Button>
      </Style.BtnContainer>
    </>
  );
};

export default QnAModal;
