import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Style from "./styles";
import HorizonLine from "../common/HorizonLine";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
const noticeArr = [
  "교환, 반품, 취소는 1:1문의를 통해 접수 부탁드립니다.",
  " 상품 및 상품 구매 과정과 관련 없는 비방, 욕설, 명예훼손성 게시글 및 상품과 관련 없는 광고글 등 부적절한 게시글 등록 시 글쓰기 제한 및 게시글이 삭제 조치 될 수 있습니다.",
  "전화번호, 이메일 등 개인 정보가 포함된 글 작성이 필요한 경우 판매자만 볼 수 있도록 비밀글로 문의해 주시기 바랍니다.",
];
const QnA = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const isLogin = localStorage.getItem("isLogin");
  const info = token && jwt_decode(token);
  const id = info && info.id;
  const [showModal, setShowModal] = useState(false);
  const [secretChecked, setSecretChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const clickToWriteBtn = () => {};
  const clickToSubmitBtn = () => {
    if (title.length === 0) {
      Swal.fire({
        title: "문의 제목을 작성해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }
    if (content.length <= 4) {
      Swal.fire({
        title: "문의 내용을 형식에 맞게 작성해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }
  };
  const handleSetTitle = (e) => {
    if (e.target.value.length > 14) setTitle(title.substring(0, 14));
    else setTitle(e.target.value);
  };
  const handleSetContent = (e) => {
    console.log("e", e.target.value);
    if (e.target.value.length > 300) setContent(content.substring(0, 300));
    else setContent(e.target.value);
  };
  console.log("title", title);
  return (
    <Style.Layout>
      <Style.Header>
        <Style.Title>상품 Q&A</Style.Title>
        <Style.Write
          onClick={() => {
            if (isLogin === "false") navigate("/login");
            clickToWriteBtn(setShowModal(true));
          }}
        >
          Q&A 쓰기
        </Style.Write>
      </Style.Header>
      <HorizonLine width={"100%"} border={"4px"} color={"black"} />
      {showModal && (
        <Style.Modal>
          <Style.ID>
            <span>아이디 </span> <span>{id}</span>
          </Style.ID>
          <Style.QuestionLayout>
            <Style.QuestionTitle>문의 제목</Style.QuestionTitle>
            <Style.InputTitle
              type="text"
              placeholder="15자 이내 입력"
              value={title}
              onChange={(e) => handleSetTitle(e)}
            ></Style.InputTitle>
            <Style.Label htmlFor="checkbox" secretChecked={secretChecked}>
              비밀글
            </Style.Label>
            <Style.CheckBox
              type="checkbox"
              id="checkbox"
              onClick={() => {
                setSecretChecked((prev) => !prev);
              }}
            ></Style.CheckBox>
          </Style.QuestionLayout>
          <Style.QuestionLayout>
            <Style.QuestionTitle>내용</Style.QuestionTitle>
            <Style.InputTextArea
              placeholder="문의 내용은 최소 5자 이상 입력해주세요."
              onChange={(e) => handleSetContent(e)}
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
            <Style.Btn
              color={"black"}
              backColor={"white"}
              onClick={() => {
                setShowModal(false);
              }}
            >
              닫기
            </Style.Btn>
            <Style.Btn
              color={"white"}
              backColor={"#303033"}
              onClick={() => clickToSubmitBtn()}
            >
              등록
            </Style.Btn>
          </Style.BtnLayout>
          <Style.Notice>
            <Style.NoticeTitle>상품 Q&A 작성 시 유의사항</Style.NoticeTitle>
            {noticeArr.map((text) => (
              <Style.Text key={text}>{text}</Style.Text>
            ))}
          </Style.Notice>
        </Style.Modal>
      )}
    </Style.Layout>
  );
};

export default QnA;
