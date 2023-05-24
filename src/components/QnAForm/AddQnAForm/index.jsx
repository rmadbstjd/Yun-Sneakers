import React, { useState } from "react";
import userInfoStore from "../../../store/userInfoStore";
import { validateAddQnAForm } from "../../../utils/validateAddQnAForm";
import { getProductInfo, addQna } from "../../../api/product";
import { bringNowDates } from "../../../utils/bringNowDates";
import { useQuery } from "@tanstack/react-query";
import Layout from "./Layout";
const noticeList = [
  "교환, 반품, 취소는 1:1문의를 통해 접수 부탁드립니다.",
  " 상품 및 상품 구매 과정과 관련 없는 비방, 욕설, 명예훼손성 게시글 및 상품과 관련 없는 광고글 등 부적절한 게시글 등록 시 글쓰기 제한 및 게시글이 삭제 조치 될 수 있습니다.",
  "전화번호, 이메일 등 개인 정보가 포함된 글 작성이 필요한 경우 판매자만 볼 수 있도록 비밀글로 문의해 주시기 바랍니다.",
];

const AddQnAForm = ({ setShowWriteForm, id, refetch }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSecretChecked, setIsSecretChecked] = useState(false);

  const { data: productInfo } = useQuery([id], () => getProductInfo(id));
  const image = productInfo?.product?.image;

  const { userId } = userInfoStore();
  const dates = bringNowDates();

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
    <Layout
      userId={userId}
      title={title}
      content={content}
      validateTitle={validateTitle}
      validateContent={validateContent}
      clickToSubmitBtn={clickToSubmitBtn}
      noticeList={noticeList}
      setShowWriteForm={setShowWriteForm}
      isSecretChecked={isSecretChecked}
      setIsSecretChecked={setIsSecretChecked}
    />
  );
};

export default AddQnAForm;
