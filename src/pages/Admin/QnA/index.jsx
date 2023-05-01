import React, { useState } from "react";
import * as Style from "./styles";
import { answerQna } from "../../../api/product";
import Navbar from "../../../components/common/Navbar/index";
import { useQuery } from "@tanstack/react-query";
import QnAModal from "../../../components/common/Modal/QnAModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getNotAnsweredQna, getAnsweredQna } from "../../../api/product";
const itemArr3 = ["제목", "내용", "유저", "날짜"];
const QnA = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { data: isNotAnsweredQnAs, refetch } = useQuery(
    ["isNotAnsweredQnA"],
    () => getNotAnsweredQna()
  );
  const { data: isAnsweredQnAs, refetch: refetch2 } = useQuery(
    ["isAnsweredQnA"],
    () => getAnsweredQna()
  );
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
            <Style.TopItem width={"610px"}>{itemArr3[0]}</Style.TopItem>
            <Style.TopItem width={"50px"}>{itemArr3[1]}</Style.TopItem>
            <Style.TopItem width={"615px"}>{itemArr3[2]}</Style.TopItem>
            <Style.TopItem width={"40px"}>{itemArr3[3]}</Style.TopItem>
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
          {showModal ? (
            <QnAModal
              isOpen={true}
              modalIsOpen={showModal}
              setModalIsOpen={setShowModal}
              isReviewed={false}
              qna={isNotAnsweredQnAs[isClicked]}
              submitBtn={submitBtn}
            ></QnAModal>
          ) : null}
        </Style.MainContainer>
      </Style.MyPageContainer>
    </div>
  );
};

export default QnA;
