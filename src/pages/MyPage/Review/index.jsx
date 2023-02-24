import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userInfoStore from "../../../store/userInfoStore";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Modal from "../../../components/common/Modal";
import Swal from "sweetalert2";
import convertToPrice from "../../../hooks/convertToPrice";
import MypageSide from "../../../components/MypageSide";
import Navbar from "./../../../components/common/Navbar/index";

const itemArr2 = ["상품정보", "가격(수량)", "내용", "평점", "관리"];
const itemArr3 = ["상품정보", "주문번호", "주문금액(수량)", "쿠폰할인", "관리"];
const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState();
  const [deleted, setDeleted] = useState(false);
  const [stateReview, setStateReview] = useState(true);
  const navigate = useNavigate();
  const { order, myPage } = userInfoStore();
  const {
    isLoading,
    error,
    data: product,
    refetch,
  } = useQuery([], () => myPage.getUserReviews());

  const { data: completedProducts, refetch: refetch2 } = useQuery(
    ["리뷰"],
    () => order.getIsNotReviewdProducts()
  );

  const goToDetail = (info) => {
    navigate(`/products/${info.id}`);
  };
  const goToSearch = (info) => {
    navigate(`/search?keyword=${info.category}`);
  };
  const setPrice = (coupon, price) => {
    switch (coupon) {
      case "선택안함":
        return price;
      case "Welcome 5% 할인 쿠폰":
        return price * 0.95;
      case "10만원 이상 구매 시 10% 할인 쿠폰":
        return price * 0.9;
      case "20만원 이상 구매 시 20% 할인 쿠폰":
        return price * 0.8;
      default:
        break;
    }
  };
  const deleteReview = (orderId) => {
    Swal.fire({
      title: "리뷰를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "black",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await myPage.deleteProductReview(orderId);
        refetch();
        refetch2();
      } else {
        setShowModal(false);
      }
    });
  };
  useEffect(() => {
    if (deleted === true) {
      deleteReview(product[number].product.orderId);
      setDeleted(false);
    }
  }, [number, stateReview, deleted]);
  console.log("stateReview", stateReview);
  if (!stateReview) {
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
                작성 가능한 리뷰 (
                {completedProducts && completedProducts.length})
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
              <Style.TopItem width={"450px"}>{itemArr2[0]}</Style.TopItem>
              <Style.TopItem width={"350px"}>{itemArr2[1]}</Style.TopItem>
              <Style.TopItem width={"270px"}>{itemArr2[2]}</Style.TopItem>
              <Style.TopItem width={"300px"}>{itemArr2[3]}</Style.TopItem>
              <Style.TopItem width={"110px"}>{itemArr2[4]}</Style.TopItem>
            </Style.TopContainer>
            <Style.HorizonLine
              width={"1555px"}
              border={3}
              color={"black"}
            ></Style.HorizonLine>
            {product && product.length === 0 ? (
              <Style.NoneText>아직 작성한 리뷰가 없습니다.</Style.NoneText>
            ) : null}
            {product &&
              product.map((item, index) => (
                <div key={index}>
                  <Style.Date>주문 일자 {item.product.date}</Style.Date>
                  <Style.ProductContent>
                    <Style.Img
                      src={item.info.image}
                      onClick={() => {
                        goToDetail(item.info);
                      }}
                      alt="이미지"
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
                          {convertToPrice(item.info.price)}원
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
                        item === false ? (
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
                      <Style.Btn
                        onClick={() => {
                          setShowModal((prev) => !prev);
                          setNumber(index);
                        }}
                      >
                        수정
                      </Style.Btn>
                      {showModal === true ? (
                        <Modal
                          isOpen={true}
                          modalIsOpen={showModal}
                          setModalIsOpen={setShowModal}
                          type={"review"}
                          product={product[number]}
                          isReviewed={true}
                        ></Modal>
                      ) : null}
                      <Style.Btn
                        onClick={() => {
                          setNumber(index);
                          setDeleted(true);
                        }}
                      >
                        삭제
                      </Style.Btn>
                    </Style.BtnContainer>
                  </Style.ProductContent>
                </div>
              ))}
          </Style.MainContainer>
        </Style.MyPageContainer>
      </>
    );
  } else if (stateReview) {
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
                작성 가능한 리뷰 (
                {completedProducts && completedProducts.length})
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
              <Style.TopItem width={"450px"}>{itemArr3[0]}</Style.TopItem>
              <Style.TopItem width={"350px"}>{itemArr3[1]}</Style.TopItem>
              <Style.TopItem width={"340px"}>{itemArr3[2]}</Style.TopItem>
              <Style.TopItem width={"190px"}>{itemArr3[3]}</Style.TopItem>
              <Style.TopItem width={"190px"}>{itemArr3[4]}</Style.TopItem>
              <Style.TopItem width={"190px"}>{itemArr3[5]}</Style.TopItem>
            </Style.TopContainer>

            <Style.HorizonLine
              width={"1555px"}
              border={3}
              color={"black "}
            ></Style.HorizonLine>

            {completedProducts && completedProducts.length === 0 ? (
              <Style.NoneText>
                아직 리뷰를 작성할 수 있는 주문내역이 없습니다.
              </Style.NoneText>
            ) : null}
            {completedProducts &&
              completedProducts.map((item, index) => (
                <div key={index}>
                  <Style.Date>주문 일자 {item.product.date}</Style.Date>
                  <Style.ProductContent>
                    <Style.Img
                      src={item.info.image}
                      onClick={() => {
                        goToDetail(item.info);
                      }}
                      alt="이미지"
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
                          {convertToPrice(item.info.price)}원 원
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
                      {item.product.isReviewd === false ? (
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
            {showModal === true ? (
              <Modal
                isOpen={true}
                modalIsOpen={showModal}
                setModalIsOpen={setShowModal}
                type={"review"}
                product={completedProducts[number]}
                isReviewed={false}
              ></Modal>
            ) : null}
          </Style.MainContainer>
        </Style.MyPageContainer>
      </>
    );
  }
};

export default Review;