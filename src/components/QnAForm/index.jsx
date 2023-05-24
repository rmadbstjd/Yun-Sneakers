import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteQna } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import { getQna } from "../../api/product";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

import Layout from "./Layout";
const QnAForm = () => {
  const [isClickedModifyBtn] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showContent, setShowContent] = useState();
  const [qnaIdx, setQnAIdx] = useState();

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
    <Layout
      clickToWriteBtn={clickToWriteBtn}
      QnAList={QnAList}
      showWriteForm={showWriteForm}
      showEditForm={showEditForm}
      setShowEditForm={setShowEditForm}
      isClickedModifyBtn={isClickedModifyBtn}
      id={id}
      refetch={refetch}
      qnaIdx={qnaIdx}
      setShowWriteForm={setShowWriteForm}
      setIndex={setIndex}
      clickToQnAItem={clickToQnAItem}
      showContent={showContent}
      editQnAItem={editQnAItem}
      userId={userId}
      deleteQnAItem={deleteQnAItem}
      page={page}
      QnAcounts={QnAcounts}
      handlePageChange={handlePageChange}
    />
  );
};

export default QnAForm;
