import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import * as Style from "./styles";
import styles from "./QnAModal.module.css";

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
          <Style.Img src={qna && qna.image}></Style.Img>
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
        <Style.Btn
          onClick={() => {
            submitBtn(text);
          }}
        >
          저장
        </Style.Btn>
        <Style.Btn
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          취소
        </Style.Btn>
      </Style.BtnContainer>
    </ReactModal>
  );
};

export default QnAModal;
