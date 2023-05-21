import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteQna } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import { getQna } from "../../api/product";
import Pagination from "../common/Pagination";
import HorizonLine from "../common/HorizonLine";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import * as Style from "./styles";
import AddQnAForm from "./AddQnAForm";
import EditQnAForm from "./EditQnAForm";
import QnALists from "./QnAList";
const noticeList = [
  "교환, 반품, 취소는 1:1문의를 통해 접수 부탁드립니다.",
  " 상품 및 상품 구매 과정과 관련 없는 비방, 욕설, 명예훼손성 게시글 및 상품과 관련 없는 광고글 등 부적절한 게시글 등록 시 글쓰기 제한 및 게시글이 삭제 조치 될 수 있습니다.",
  "전화번호, 이메일 등 개인 정보가 포함된 글 작성이 필요한 경우 판매자만 볼 수 있도록 비밀글로 문의해 주시기 바랍니다.",
];

const QnAForm = () => {
  const [isClickedModifyBtn] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showContent, setShowContent] = useState();
  const [qnaIdx, setQnAIdx] = useState();
  const [isSecretChecked, setIsSecretChecked] = useState(false);
  const [setIndex] = useState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const info = token && jwt_decode(token);
  const userId = info && info.id;

  let { data: QnAList, refetch } = useQuery(["qna"], () => getQna(id, page));
  const QnAcounts = QnAList?.count?.length;
  QnAList = QnAList?.QnA;

  const clickToWriteBtn = () => {
    if (!token) navigate("/login");
    setShowWriteForm(true);
  };

  const clickToQnAItem = (index) => {
    if (QnAList[index].isSecret) {
      if (QnAList[index].userId !== userId) {
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
    setQnAIdx(index);
  };

  const editQnAItem = () => {
    setShowEditForm(true);
  };

  const deleteQnAItem = (e, index) => {
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
        await deleteQna(id, QnAList[index]._id);
        refetch();
        setIndex();
        setShowContent();
      }
    });
  };

  const handlePageChange = async (page) => {
    setPage(page);
    QnAList = await getQna(id, page);
    refetch();
  };

  return (
    <Style.Layout>
      <Style.Header>
        <Style.Title>상품 Q&A</Style.Title>
        <Style.Write
          onClick={() => {
            clickToWriteBtn();
          }}
        >
          Q&A 쓰기
        </Style.Write>
      </Style.Header>
      <HorizonLine width={"100%"} border={"4px"} color={"black"} />
      {QnAList?.length === 0 && (
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
      {showWriteForm && (
        <AddQnAForm
          QnA={QnAList}
          isSecretChecked={isSecretChecked}
          setIsSecretChecked={setIsSecretChecked}
          setShowWriteForm={setShowWriteForm}
          isClickedModifyBtn={isClickedModifyBtn}
          noticeList={noticeList}
          id={id}
          refetch={refetch}
        />
      )}
      {showEditForm && (
        <EditQnAForm
          QnA={QnAList[qnaIdx]}
          qnaIdx={qnaIdx}
          isSecretChecked={isSecretChecked}
          setIsSecretChecked={setIsSecretChecked}
          setShowEditForm={setShowEditForm}
          noticeList={noticeList}
          id={id}
          refetch={refetch}
          setIndex={setIndex}
        />
      )}
      <QnALists
        clickToQnAItem={clickToQnAItem}
        showContent={showContent}
        userId={userId}
        editQnAItem={editQnAItem}
        deleteQnAItem={deleteQnAItem}
        page={page}
      />
      {QnAList?.length !== 0 && (
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

export default QnAForm;
