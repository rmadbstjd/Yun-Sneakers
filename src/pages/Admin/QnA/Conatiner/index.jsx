import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getNotAnsweredQna,
  answerQna,
  getAnsweredQna,
} from "../../../../api/qna";
import UIQnAPage from "../UIQnAPage";
const QnA = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const {
    isNotAnsweredQnALoading,
    data: isNotAnsweredQnAs,
    refetch,
  } = useQuery(["isNotAnsweredQnA"], () => getNotAnsweredQna());
  const {
    isAnsweredQnALoading,
    data: isAnsweredQnAs,
    refetch: refetch2,
  } = useQuery(["isAnsweredQnA"], () => getAnsweredQna());
  const [showNotAnsweredQnA, setShowNotAnsweredQnA] = useState(true);
  const [isClicked, setIsClicked] = useState();

  const submitBtn = async (answer) => {
    await answerQna(
      isNotAnsweredQnAs[isClicked].productId,
      isNotAnsweredQnAs[isClicked]._id,
      answer
    );
    Swal.fire({
      icon: "success",
      title: "성공적으로 답변을 작성하였습니다.",
      confirmButtonColor: "black",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin/qna");
        setIsClicked();
      }
    });
    refetch();
    refetch2();
    setShowModal(false);
  };
  const clickToQnA = (index) => {
    if (index === isClicked) setIsClicked();
    else setIsClicked(index);
  };

  const clickToDetailPage = (e, item) => {
    e.stopPropagation();

    navigate(`/products/${item.productId}`);
  };
  return (
    <UIQnAPage
      showNotAnsweredQnA={showNotAnsweredQnA}
      setShowNotAnsweredQnA={setShowNotAnsweredQnA}
      isNotAnsweredQnAs={isNotAnsweredQnAs}
      isAnsweredQnAs={isAnsweredQnAs}
      isNotAnsweredQnALoading={isNotAnsweredQnALoading}
      isAnsweredQnALoading={isAnsweredQnALoading}
      isClicked={isClicked}
      clickToQnA={clickToQnA}
      clickToDetailPage={clickToDetailPage}
      setShowModal={setShowModal}
      showModal={showModal}
      submitBtn={submitBtn}
    />
  );
};

export default QnA;
