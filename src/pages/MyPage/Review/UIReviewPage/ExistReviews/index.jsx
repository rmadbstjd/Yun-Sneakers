import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../../components/common/Navbar/Container";
import MypageSide from "../../../../../components/MypageSide/Container";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import Modal from "../../../../../components/common/Modal/UIModal";
import convertStringToNumber from "./../../../../../utils/convertStringToNumber";
import ReviewModal from "./../../../../../components/common/Modal/Conatiner/Review/index";
const navbarItems = [
  "상품정보",
  "주문번호",
  "주문금액(수량)",
  "쿠폰할인",
  "관리",
];
const ExistReviews = ({
  stateReview,
  setStateReview,
  completedProducts,
  product,
  isLoading2,
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
              작성 가능한 리뷰 ({completedProducts?.length})
            </Style.ReviewLeftTitle>
            <Style.ReviewRightTitle
              state={stateReview}
              onClick={() => setStateReview(false)}
            >
              내 리뷰 ({product?.length})
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
            <Style.TopItem width={"340px"}>{navbarItems[2]}</Style.TopItem>
            <Style.TopItem width={"190px"}>{navbarItems[3]}</Style.TopItem>
            <Style.TopItem width={"190px"}>{navbarItems[4]}</Style.TopItem>
            <Style.TopItem width={"190px"}>{navbarItems[5]}</Style.TopItem>
          </Style.TopContainer>

          <Style.HorizonLine
            width={"1555px"}
            border={3}
            color={"black "}
          ></Style.HorizonLine>

          {completedProducts?.length === 0 ? (
            <Style.NoneText>
              아직 리뷰를 작성할 수 있는 주문내역이 없습니다.
            </Style.NoneText>
          ) : null}
          {isLoading2 && (
            <LoadingSpinner
              text={"상품을 준비하고 있습니다."}
              margin={"100px 0px 0px 0px"}
            />
          )}
          {completedProducts?.map((item, index) => (
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
                <Style.OrderNum>{item.product._id}</Style.OrderNum>
                <Style.PriceContainer height={"120px"}>
                  {item.product.coupon !== "선택안함" ? (
                    <Style.FirstPrice>
                      {convertStringToNumber(item.info.price)}원 원
                    </Style.FirstPrice>
                  ) : null}
                  <div>
                    {setPrice(item.product.coupon, item.info.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    원
                  </div>
                  <div>{item.product.count} 개</div>
                </Style.PriceContainer>
                <Style.Coupon>{item.product.coupon}</Style.Coupon>
                <Style.State>
                  <div>{item.product.state}</div>
                  {!item.product.isReviewd ? (
                    <Style.Review
                      onClick={() => {
                        setShowModal((prev) => !prev);
                        setNumber(index);
                      }}
                    >
                      리뷰 쓰기
                    </Style.Review>
                  ) : null}
                </Style.State>
              </Style.ProductContent>
            </div>
          ))}
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
                  product={completedProducts[number]}
                  refetch={refetch}
                  refetch2={refetch2}
                  type={"new"}
                />
              }
            />
          )}
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default ExistReviews;
