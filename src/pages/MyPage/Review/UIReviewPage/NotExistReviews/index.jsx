import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../../components/common/Navbar/Container";
import MypageSide from "../../../../../components/MypageSide/Container";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import Button from "../../../../../components/common/button";
import Modal from "../../../../../components/common/Modal/UIModal";
import convertStringToNumber from "./../../../../../utils/convertStringToNumber";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import ReviewModal from "./../../../../../components/common/Modal/Conatiner/Review/index";
const navbarItems = ["상품정보", "가격(수량)", "내용", "평점", "관리"];
const NotExistsReviews = ({
  stateReview,
  setStateReview,
  completedProducts,
  product,
  isLoading,
  goToDetail,
  goToSearch,
  setPrice,
  setShowModal,
  setNumber,
  showModal,
  number,
  refetch,
  refetch2,
  setDeleted,
}) => {
  return (
    <>
      <Navbar />
      <Style.MyPageContainer>
        <MypageSide />
        <Style.MainContainer>
          <Style.Title>리뷰</Style.Title>
          <Style.ReviewContainer>
            <Style.ReviewLeftTitle
              state={stateReview}
              onClick={() => setStateReview(true)}
            >
              작성 가능한 리뷰 ({completedProducts && completedProducts.length})
            </Style.ReviewLeftTitle>
            <Style.ReviewRightTitle
              state={stateReview}
              onClick={() => setStateReview(false)}
            >
              내 리뷰 ({product && product.length})
            </Style.ReviewRightTitle>
            <Style.HorizonLine
              width={"1190px"}
              border={3}
              color={"black"}
            ></Style.HorizonLine>
          </Style.ReviewContainer>
          <Style.TopContainer>
            <Style.TopItem width={"450px"}>{navbarItems[0]}</Style.TopItem>
            <Style.TopItem width={"350px"}>{navbarItems[1]}</Style.TopItem>
            <Style.TopItem width={"270px"}>{navbarItems[2]}</Style.TopItem>
            <Style.TopItem width={"300px"}>{navbarItems[3]}</Style.TopItem>
            <Style.TopItem width={"110px"}>{navbarItems[4]}</Style.TopItem>
          </Style.TopContainer>
          <Style.HorizonLine
            width={"1555px"}
            border={3}
            color={"black"}
          ></Style.HorizonLine>
          {product?.length === 0 ? (
            <Style.NoneText>아직 작성한 리뷰가 없습니다.</Style.NoneText>
          ) : null}
          {isLoading && (
            <LoadingSpinner margin={"100px 0px 0px 0px"}>
              상품을 준비하고 있습니다
            </LoadingSpinner>
          )}
          {product?.map((item, index) => (
            <div key={item.product._id}>
              <Style.Date>주문 일자 {item.product.date}</Style.Date>
              <Style.ProductContent>
                <Style.Img
                  src={item.info.image}
                  onClick={() => {
                    goToDetail(item.info);
                  }}
                  alt="상품"
                ></Style.Img>

                <Style.Info>
                  <Style.Text
                    onClick={() => {
                      goToSearch(item.info);
                    }}
                  >
                    <span>{item.info.category}</span>
                  </Style.Text>

                  <Style.Text
                    onClick={() => {
                      goToDetail(item.info);
                    }}
                  >
                    <span>{item.info.name}</span>
                  </Style.Text>

                  <Style.Text>사이즈 [{item.product.size}]</Style.Text>
                </Style.Info>

                <Style.PriceContainer height={"130px"}>
                  {item.product.coupon !== "선택안함" ? (
                    <Style.FirstPrice>
                      {convertStringToNumber(item.info.price)}원
                    </Style.FirstPrice>
                  ) : null}
                  <div>
                    {setPrice(item.product.coupon, item.info.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    원
                  </div>
                  <div>{item.product.count}개</div>
                </Style.PriceContainer>

                <Style.Content>
                  <div>{item.product.content}</div>
                </Style.Content>

                <Style.Star>
                  {item.product.star.map((item, index) =>
                    !item ? (
                      <AiOutlineStar
                        size={35}
                        key={index}
                        color={"gray"}
                        cursor={"pointer"}
                      />
                    ) : (
                      <AiFillStar
                        size={35}
                        key={index}
                        color={"yellow"}
                        cursor={"pointer"}
                      />
                    )
                  )}
                </Style.Star>

                <Style.BtnContainer>
                  <Button
                    style={{
                      border: "solid gray 1px",
                      borderRadius: "15px",
                      width: "80px",
                      height: "30px",
                      lineHeight: "190%",
                      margin: "0px 10px 0px 0px",
                      hoverColor: "white",
                      hoverBackground: "black",
                    }}
                    onClick={() => {
                      setShowModal((prev) => !prev);
                      setNumber(index);
                    }}
                  >
                    수정
                  </Button>
                  {showModal && (
                    <Modal
                      width={"700px"}
                      height={"750px"}
                      isOpen={true}
                      modalIsOpen={showModal}
                      setModalIsOpen={setShowModal}
                      children={
                        <ReviewModal
                          isOpen={true}
                          modalIsOpen={showModal}
                          setModalIsOpen={setShowModal}
                          product={product[number]}
                          setStateReview={setStateReview}
                          refetch={refetch}
                          refetch2={refetch2}
                          type={"edit"}
                        />
                      }
                    />
                  )}

                  <Button
                    style={{
                      border: "solid gray 1px",
                      borderRadius: "15px",
                      width: "80px",
                      height: "30px",
                      lineHeight: "190%",
                      margin: "0px 10px 0px 0px",
                      hoverColor: "white",
                      hoverBackground: "black",
                    }}
                    onClick={() => {
                      setNumber(index);
                      setDeleted(true);
                    }}
                  >
                    삭제
                  </Button>
                </Style.BtnContainer>
              </Style.ProductContent>
            </div>
          ))}
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default NotExistsReviews;
