import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getQna } from "../../../api/product";
import QnAItem from "../QnAItem";
const QnAList = ({
  clickToQnAItem,
  showContent,
  userId,
  editQnAItem,
  deleteQnAItem,
  page,
}) => {
  const { id } = useParams();
  let { data: QnAList } = useQuery(["qna"], () => getQna(id, page));
  QnAList = QnAList?.QnA;
  return (
    <>
      {QnAList?.map((item, index) => (
        <QnAItem
          item={item}
          index={index}
          showContent={showContent}
          clickToQnAItem={clickToQnAItem}
          QnAList={QnAList}
          userId={userId}
          editQnAItem={editQnAItem}
          deleteQnAItem={deleteQnAItem}
        />
      ))}
    </>
  );
};

export default QnAList;
