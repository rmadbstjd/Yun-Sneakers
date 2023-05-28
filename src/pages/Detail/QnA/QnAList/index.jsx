import React from "react";
import { useParams } from "react-router-dom";
import QnAItem from "../QnAItem";
import { useGetProductQnA } from "./../../../../hooks/useGetProductQnA";
const QnAList = ({
  clickToQnAItem,
  showContent,
  userId,
  editQnAItem,
  deleteQnAItem,
  page,
}) => {
  const { id } = useParams();
  const { QnAList } = useGetProductQnA(id, page);

  return (
    <>
      {QnAList?.map((item, index) => (
        <QnAItem
          key={index}
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
