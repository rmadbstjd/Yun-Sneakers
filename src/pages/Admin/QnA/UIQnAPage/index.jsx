import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import Modal from "../../../../components/common/Modal/UIModal";
import QnAModal from "../../../../components/common/Modal/Conatiner/QnA";

const NavbarItems = ["제목", "내용", "유저", "날짜"];
const UIQnAPage = ({
  showNotAnsweredQnA,
  setShowNotAnsweredQnA,
  isNotAnsweredQnAs,
  isAnsweredQnAs,
  isNotAnsweredQnALoading,
  isAnsweredQnALoading,
  isClicked,
  clickToQnA,
  clickToDetailPage,
  setShowModal,
  showModal,
  submitBtn,
}) => {
  return (
    <div>
      <Navbar />
      <Style.MyPageContainer>
        <Style.MainContainer>
          <Style.Title>Q&A</Style.Title>
          <Style.ReviewContainer>
            <Style.ReviewLeftTitle
              state={showNotAnsweredQnA}
              onClick={() => setShowNotAnsweredQnA(true)}
            >
              답변 가능한 Q&A ({isNotAnsweredQnAs && isNotAnsweredQnAs.length})
            </Style.ReviewLeftTitle>
            <Style.ReviewRightTitle
              state={showNotAnsweredQnA}
              onClick={() => setShowNotAnsweredQnA(false)}
            >
              답변 완료한 Q&A({isAnsweredQnAs && isAnsweredQnAs.length})
            </Style.ReviewRightTitle>
            <Style.HorizonLine
              width={"1190px"}
              border={3}
              color={"black"}
            ></Style.HorizonLine>
          </Style.ReviewContainer>
          <Style.TopContainer>
            <Style.TopItem width={"610px"}>{NavbarItems[0]}</Style.TopItem>
            <Style.TopItem width={"50px"}>{NavbarItems[1]}</Style.TopItem>
            <Style.TopItem width={"615px"}>{NavbarItems[2]}</Style.TopItem>
            <Style.TopItem width={"40px"}>{NavbarItems[3]}</Style.TopItem>
          </Style.TopContainer>

          <Style.HorizonLine
            width={"1555px"}
            border={3}
            color={"black "}
          ></Style.HorizonLine>
          {showNotAnsweredQnA &&
          isNotAnsweredQnAs &&
          isNotAnsweredQnAs.length === 0 ? (
            <Style.NoneText>
              아직 Q&A 답변을 할 수 있는 질문이 없습니다.
            </Style.NoneText>
          ) : null}
          {!showNotAnsweredQnA &&
          isAnsweredQnAs &&
          isAnsweredQnAs.length === 0 ? (
            <Style.NoneText>
              아직 Q&A에 대한 답변이 존재하지 않습니다.
            </Style.NoneText>
          ) : null}
          {isNotAnsweredQnALoading && (
            <LoadingSpinner margin={"100px 0px 0px 0px"}>
              상품을 준비중입니다.
            </LoadingSpinner>
          )}
          {isAnsweredQnALoading && (
            <LoadingSpinner margin={"100px 0px 0px 0px"}>
              상품을 준비중입니다.
            </LoadingSpinner>
          )}
          {showNotAnsweredQnA
            ? isNotAnsweredQnAs &&
              isNotAnsweredQnAs.map((item, index) => (
                <div key={item._id}>
                  <Style.ProductContent
                    isClicked={index === isClicked}
                    onClick={() => clickToQnA(index)}
                  >
                    <Style.Img
                      alt="상품"
                      src={item.image}
                      onClick={(e) => {
                        clickToDetailPage(e, item);
                      }}
                    ></Style.Img>
                    <Style.Info>{item.title}</Style.Info>
                    <Style.OrderNum isClicked={index === isClicked}>
                      {item.content}
                    </Style.OrderNum>
                    <Style.PriceContainer height={"120px"}>
                      <div>{item.userId}</div>
                    </Style.PriceContainer>
                    <Style.Coupon>{item.dates}</Style.Coupon>
                    <Style.Review
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      답변 작성
                    </Style.Review>
                  </Style.ProductContent>
                </div>
              ))
            : isAnsweredQnAs &&
              isAnsweredQnAs.map((item, index) => (
                <div key={item._id}>
                  <Style.ProductContent
                    isClicked={index === isClicked}
                    onClick={() => clickToQnA(index)}
                  >
                    <Style.Img
                      alt="상품"
                      src={item.image}
                      onClick={(e) => {
                        clickToDetailPage(e, item);
                      }}
                    ></Style.Img>
                    <Style.Info>{item.title}</Style.Info>
                    <Style.OrderNum isClicked={index === isClicked}>
                      {item.content}
                    </Style.OrderNum>
                    <Style.PriceContainer height={"120px"}>
                      <div>{item.userId}</div>
                    </Style.PriceContainer>
                    <Style.Coupon>{item.dates}</Style.Coupon>
                    <Style.Review>답변 완료</Style.Review>
                  </Style.ProductContent>
                </div>
              ))}
          {showModal && (
            <Modal
              width={"1000px"}
              height={"650px"}
              isOpen={true}
              modalIsOpen={showModal}
              setModalIsOpen={setShowModal}
              children={
                <QnAModal
                  isOpen={true}
                  modalIsOpen={showModal}
                  setModalIsOpen={setShowModal}
                  isReviewed={false}
                  qna={isNotAnsweredQnAs[isClicked]}
                  submitBtn={submitBtn}
                ></QnAModal>
              }
            ></Modal>
          )}
        </Style.MainContainer>
      </Style.MyPageContainer>
    </div>
  );
};

export default UIQnAPage;
