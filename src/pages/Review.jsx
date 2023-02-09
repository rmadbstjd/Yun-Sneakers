import React, { useState, useEffect } from "react";
import styles from "./css/Review.module.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useStore from "../store";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Modal from "../components/common/Modal";
import Swal from "sweetalert2";
const itemArr = ["주문 내역 조회", "관심 상품", "주소록", "상품 리뷰"];
const itemArr2 = ["상품정보", "가격(수량)", "내용", "평점", "관리"];
const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const { nickName, cart } = useStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const {
    isLoading,
    error,
    data: product,
    refetch,
  } = useQuery([], () => cart.getReview());
  const goToPage = (item) => {
    switch (item) {
      case "주문 내역 조회":
        navigate("/mypage/order");
        break;
      case "관심 상품":
        navigate("/mypage/wish");
        break;
      case "주소록":
        navigate("/mypage/address");
        break;
      case "상품 리뷰":
        navigate("/mypage/review");
        break;
      default:
        break;
    }
  };
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
    }).then((result) => {
      if (result.isConfirmed) {
        cart.deleteReview(orderId);
        refetch();
      } else {
        setShowModal(false);
      }
    });
    console.log("orderId", orderId);
  };
  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
    if (deleted === true) {
      deleteReview(product[number].product.orderId);
    }
    console.log("number", number);
  }, [isLogin, navigate, number]);
  return (
    <div className={styles.mypageContainer}>
      <div className={styles.sideContainer}>
        <div className={styles.title}>마이 페이지</div>
        {nickName && (
          <div className={styles.nickName}>
            {nickName}
            <span className={styles.last}>님</span>
          </div>
        )}
        {itemArr &&
          itemArr.map((item, index) => (
            <div
              className={styles.item}
              key={index}
              onClick={() => {
                goToPage(item);
              }}
            >
              {item}
            </div>
          ))}
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.title}>리뷰</div>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>작성 가능한 리뷰</div>
          <div className={styles.reviewTitle}>내 리뷰</div>
          <div className={styles.horizonLine}></div>
        </div>
        <div className={styles.topContainer}>
          <div className={styles.productInfo}>{itemArr2[0]}</div>
          <div className={styles.reviewPrice}>{itemArr2[1]}</div>
          <div className={styles.reviewContent}>{itemArr2[2]}</div>
          <div className={styles.reviewStar}>{itemArr2[3]}</div>
          <div className={styles.reviewState}>{itemArr2[4]}</div>
        </div>
        <div className={styles.horizonLine2}></div>
        {product &&
          product.map((item, index) => (
            <div key={index}>
              <div className={styles.date}>주문 일자 {item.product.date}</div>
              <div className={styles.productContent}>
                <img
                  className={styles.img}
                  src={item.info.image}
                  onClick={() => {
                    goToDetail(item.info);
                  }}
                ></img>
                <div className={styles.info}>
                  <div
                    className={styles.brand}
                    onClick={() => {
                      goToSearch(item.info);
                    }}
                  >
                    <span>{item.info.category}</span>
                  </div>
                  <div
                    className={styles.name}
                    onClick={() => {
                      goToDetail(item.info);
                    }}
                  >
                    <span>{item.info.name}</span>
                  </div>
                  <div className={styles.size}>
                    사이즈 [{item.product.size}]
                  </div>
                </div>
                <div className={styles.priceContainer}>
                  {item.product.coupon !== "선택안함" ? (
                    <div className={styles.firstPrice}>
                      {item.info.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      원
                    </div>
                  ) : null}
                  <div>
                    {setPrice(item.product.coupon, item.info.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    원
                  </div>
                  <div className={styles.price}>{item.product.count}개</div>
                </div>
                <div className={styles.content}>
                  <div>{item.product.content}</div>
                </div>
                <div className={styles.star}>
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
                </div>
                <div className={styles.btnContainer}>
                  <div
                    className={styles.btn}
                    onClick={() => {
                      setShowModal((prev) => !prev);
                      setNumber(index);
                    }}
                  >
                    수정
                  </div>
                  {showModal === true ? (
                    <Modal
                      isOpen={true}
                      modalIsOpen={showModal}
                      setModalIsOpen={setShowModal}
                      type={"review"}
                      product={product[number]}
                    ></Modal>
                  ) : null}
                  <div
                    className={styles.btn}
                    onClick={async () => {
                      setNumber(index);
                      setDeleted(true);
                    }}
                  >
                    삭제
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Review;
