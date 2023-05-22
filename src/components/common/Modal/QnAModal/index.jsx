import React, { useState } from "react";
import ReactModal from "react-modal";
import * as Style from "./styles";
import styles from "./QnAModal.module.css";
import Button from "../../../../components/common/button";
const QnAModal = ({ modalIsOpen, setModalIsOpen, qna, submitBtn }) => {
  const [text, setText] = useState("");
  const handleSetValue = (e) => {
    if (e.target.value.length > 300) setText(text.substring(0, 300));
    else setText(e.target.value);
  };

  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
    >
      <Style.ReviewContainer>
        <Style.ReviewTitle>Q&A 답변</Style.ReviewTitle>
        <Style.QnAContent>
          <Style.Img alt="상품" src={qna && qna.image}></Style.Img>
          <Style.InfoContainer>
            <Style.ProductCategory>
              [제목] {qna && qna.title}
            </Style.ProductCategory>

            <Style.ProductDescription>
              [내용] {qna && qna.content}
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
            onChange={(e) => handleSetValue(e)}
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
    </ReactModal>
  );
};

export default QnAModal;
