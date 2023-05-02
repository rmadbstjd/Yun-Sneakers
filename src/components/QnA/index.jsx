import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteQna } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import { AiFillLock } from "@react-icons/all-files/ai/AiFillLock";
import { getProductInfo, addQna, modifyQna, getQna } from "../../api/product";
import Button from "../common/button";
import Pagination from "../../components/common/Pagination";
import HorizonLine from "../common/HorizonLine";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import * as Style from "./styles";

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
  const userId = info && info.id;
  const { id } = useParams();
  const [isClickedModifyBtn, setIsClickedModifyBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState();
  const [secretChecked, setSecretChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [index, setIndex] = useState();
  const [page, setPage] = useState(1);
  let { data: QnA, refetch } = useQuery(["qna"], () => getQna(id, page));
  const { data: productInfo } = useQuery([id], () => getProductInfo(id));
  const image = productInfo?.product?.image;
  const QnAcounts = QnA?.count?.length;
  QnA = QnA?.QnA;

  const clickToWriteBtn = () => {};
  const clickToSubmitBtn = async () => {
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
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let days2 = now.getDate();

    if (month + 1 < 10) {
      month = "0".concat(String(month + 1));
    }
    if (days2 < 10) {
      days2 = "0".concat(String(days2));
    }

    let dates = `${year}.${month}.${days2}`;
    if (!isClickedModifyBtn) {
      await addQna(id, title, content, secretChecked, dates, image);
      setShowModal(false);
      setTitle("");
      setContent("");
      setSecretChecked(false);
      refetch();
    } else {
      await modifyQna(id, title, content, secretChecked, dates, QnA[index]._id);
      setShowModal(false);
      setTitle("");
      setContent("");
      setSecretChecked(false);
      refetch();
      setIndex();
      setIsClickedModifyBtn(false);
    }
  };

  const handleSetTitle = (e) => {
    if (e.target.value.length > 29) setTitle(title.substring(0, 29));
    else setTitle(e.target.value);
  };

  const handleSetContent = (e) => {
    if (e.target.value.length > 300) setContent(content.substring(0, 300));
    else setContent(e.target.value);
  };

  const clickToQnA = (index) => {
    if (QnA[index].isSecret) {
      if (QnA[index].userId !== userId) {
        Swal.fire({
          title: "비밀글입니다.",
          confirmButtonColor: "black",
        });
        return;
      }
    }
    if (index === showContent) {
      setShowContent();
      return;
    }
    setShowContent(index);
  };

  const clickToModifyBtn = (e, index) => {
    e.stopPropagation();
    setIsClickedModifyBtn(true);
    setTitle(QnA[index].title);
    setContent(QnA[index].content);
    setSecretChecked(QnA[index].isSecret);
    setIndex(index);
    setShowModal(true);
  };

  const clickToDeleteBtn = (e, index) => {
    e.stopPropagation();
    setIndex(index);
    Swal.fire({
      title: "삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteQna(id, QnA[index]._id);
        refetch();
        setIndex();
        setShowContent();
      }
    });
  };

  const handlePageChange = async (page) => {
    setPage(page);
    QnA = await getQna(id, page);
    refetch();
  };

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
      {QnA?.length === 0 && (
        <Style.NullText>
          궁금한 점은 언제든지 Q&A 쓰기를 통해 물어보세요.
          <HorizonLine
            width={"100%"}
            border={"1px"}
            color={"gray"}
            margin={"40px 0px 0px 0px"}
          />
        </Style.NullText>
      )}
      {showModal && (
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
              onChange={(e) => handleSetTitle(e)}
            ></Style.InputTitle>
            <Style.Label htmlFor="checkbox" secretChecked={secretChecked}>
              비밀글
            </Style.Label>
            <Style.CheckBox
              defaultChecked={secretChecked}
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
            <Button
              border={"solid #d4d4d4 1px"}
              width={"80px"}
              height={"40px"}
              margin={"0px 5px 0px 5px"}
              color={"black"}
              background={"white"}
              fontWeight={"bolder"}
              onClick={() => {
                setShowModal(false);
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
              {isClickedModifyBtn ? "수정" : "등록"}
            </Button>
          </Style.BtnLayout>
          <Style.Notice>
            <Style.NoticeTitle>상품 Q&A 작성 시 유의사항</Style.NoticeTitle>
            {noticeArr.map((text) => (
              <Style.Text key={text}>{text}</Style.Text>
            ))}
          </Style.Notice>
        </Style.Modal>
      )}
      {QnA?.map((item, index) => (
        <Style.QnALayout
          key={`${item.title}+${index}`}
          onClick={() => {
            clickToQnA(index);
          }}
          isShow={index === showContent}
        >
          <Style.QnAContainer>
            <Style.QnATitle>
              {item.isSecret ? (
                <Style.LockImg>
                  <AiFillLock size={20} style={{ margin: "0px 5px 0px 0px" }} />
                </Style.LockImg>
              ) : null}
              {item.isSecret ? "비밀글입니다." : item.title}
            </Style.QnATitle>
            <Style.QnAInfo>
              <Style.UserId>{item.userId}</Style.UserId>{" "}
              <Style.Dates>{item.dates}</Style.Dates>
              <Style.AnswerBox answered={item.isAnswered}>
                {item.isAnswered ? "yes" : "no"}
              </Style.AnswerBox>
            </Style.QnAInfo>
          </Style.QnAContainer>
          {index === showContent && (
            <Style.QnAContent>{item.content}</Style.QnAContent>
          )}
          {index === showContent && QnA[index].userId === userId && (
            <Style.ButtonLayout>
              <Style.Button
                onClick={(e) => {
                  clickToModifyBtn(e, index);
                }}
              >
                수정
              </Style.Button>
              <Style.Button
                onClick={(e) => {
                  clickToDeleteBtn(e, index);
                }}
              >
                삭제
              </Style.Button>
            </Style.ButtonLayout>
          )}

          {index === showContent && (
            <Style.QnAContent font={"bolder"}>
              {item.isAnswerd && <div>답변</div>}
              {item.answer}
            </Style.QnAContent>
          )}
          <HorizonLine
            width={"100.8%"}
            border={"1px"}
            color={"gray"}
            margin={"10px 0px 0px -10px"}
          />
        </Style.QnALayout>
      ))}
      {QnA?.length !== 0 && (
        <Pagination
          count={QnAcounts && QnAcounts}
          pagePerCount={5}
          page={page}
          handleChange={handlePageChange}
        ></Pagination>
      )}
    </Style.Layout>
  );
};

export default QnA;
