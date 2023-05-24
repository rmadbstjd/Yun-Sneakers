import React, { useState } from "react";

import { validateAddQnAForm } from "../../../utils/validateAddQnAForm";
import { modifyQna } from "../../../api/product";
import { bringNowDates } from "../../../utils/bringNowDates";
import Layout from "./Layout";

const noticeList = [
  "교환, 반품, 취소는 1:1문의를 통해 접수 부탁드립니다.",
  " 상품 및 상품 구매 과정과 관련 없는 비방, 욕설, 명예훼손성 게시글 및 상품과 관련 없는 광고글 등 부적절한 게시글 등록 시 글쓰기 제한 및 게시글이 삭제 조치 될 수 있습니다.",
  "전화번호, 이메일 등 개인 정보가 포함된 글 작성이 필요한 경우 판매자만 볼 수 있도록 비밀글로 문의해 주시기 바랍니다.",
];
const EditQnAForm = ({ QnA, setShowEditForm, id, refetch, setIndex }) => {
  const dates = bringNowDates();
  const [title, setTitle] = useState(QnA.title);
  const [content, setContent] = useState(QnA.content);
  const [isSecretChecked, setIsSecretChecked] = useState(QnA.isSecret);

  const clickToEditForm = async () => {
    if (validateAddQnAForm(title, content)) {
      await modifyQna(id, title, content, isSecretChecked, dates, QnA._id);
      setShowEditForm(false);
      setTitle("");
      setContent("");
      setIsSecretChecked(false);
      refetch();
      setIndex();
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
    <Layout
      QnA={QnA}
      title={title}
      content={content}
      validateContent={validateContent}
      validateTitle={validateTitle}
      isSecretChecked={isSecretChecked}
      setIsSecretChecked={setIsSecretChecked}
      setShowEditForm={setShowEditForm}
      clickToEditForm={clickToEditForm}
      noticeList={noticeList}
    />
  );
};

export default EditQnAForm;
