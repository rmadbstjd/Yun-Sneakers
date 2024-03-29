import React from "react";
import HorizonLine from "../../../../components/common/HorizonLine";
import AddQnAForm from "../../../../components/Form/QnAForm/AddQnAForm/Container";
import EditQnAForm from "../../../../components/Form/QnAForm/EditQnAForm/Container";
import QnALists from "../QnAList";
import Pagination from "../../../../components/common/Pagination";
import LoadingSpinner from "./../../../../components/common/LoadingSpinner/index";
import * as Style from "./styles";
const UIForm = ({
  isLoading,
  clickToWriteBtn,
  QnAList,
  showWriteForm,
  showEditForm,
  setShowEditForm,
  isClickedModifyBtn,
  id,
  refetch,
  qnaIdx,
  setShowWriteForm,
  setIndex,
  clickToQnAItem,
  showContent,
  editQnAItem,
  userId,
  deleteQnAItem,
  page,
  QnAcounts = 1,
  handlePageChange,
}) => {
  return (
    <Style.Layout>
      <Style.Header>
        <Style.Title>상품 Q&A({QnAcounts})</Style.Title>
        <Style.Write
          onClick={() => {
            clickToWriteBtn();
          }}
        >
          Q&A 쓰기
        </Style.Write>
      </Style.Header>
      <HorizonLine width={"100%"} border={"4px"} color={"black"} />
      {isLoading && (
        <LoadingSpinner margin={"100px 0px 0px 0px"}>
          Q&A 목록을 준비하는 중입니다.
        </LoadingSpinner>
      )}
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
          setShowWriteForm={setShowWriteForm}
          isClickedModifyBtn={isClickedModifyBtn}
          id={id}
          refetch={refetch}
        />
      )}
      {showEditForm && (
        <EditQnAForm
          QnA={QnAList[qnaIdx]}
          qnaIdx={qnaIdx}
          setShowEditForm={setShowEditForm}
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
          count={QnAcounts}
          pagePerCount={5}
          page={page}
          handleChange={handlePageChange}
        ></Pagination>
      )}
    </Style.Layout>
  );
};

export default UIForm;
