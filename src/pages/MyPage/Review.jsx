import React, { useState, useEffect } from "react";
import styles from "./css/Review.module.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useStore from "../../store";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Modal from "../../components/common/Modal";
import Swal from "sweetalert2";
const itemArr = ["주문 내역 조회", "관심 상품", "주소록", "상품 리뷰"];
const itemArr2 = ["상품정보", "가격(수량)", "내용", "평점", "관리"];
const itemArr3 = ["상품정보", "주문번호", "주문금액(수량)", "쿠폰할인", "관리"];
const Review = () => {
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState();
  const [deleted, setDeleted] = useState(false);
  const [stateReview, setStateReview] = useState(true);
  const navigate = useNavigate();
  const { nickName, cart, order, myPage } = useStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
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
    console.log("number", number);
    if (isLogin === false) {
      navigate("/login");
    }
    if (deleted === true) {
      deleteReview(product[number].product.orderId);
      setDeleted(false);
    }
  }, [isLogin, navigate, number, stateReview, deleted]);
  console.log("product", product);
  console.log("completedProducts", completedProducts);
  if (!stateReview) {
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
            <div
              className={
                stateReview !== true ? styles.reviewTitle2 : styles.reviewTitle
              }
              onClick={() => setStateReview(true)}
            >
              작성 가능한 리뷰 ({completedProducts && completedProducts.length})
            </div>
            <div
              className={styles.reviewTitle}
              onClick={() => setStateReview(false)}
            >
              내 리뷰 ({product && product.length})
            </div>
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
          {product && product.length === 0 ? (
            <div className={styles.noneText}>아직 작성한 리뷰가 없습니다.</div>
          ) : null}
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
                      className={styles.Btn}
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
                        isReviewed={true}
                      ></Modal>
                    ) : null}
                    <div
                      className={styles.Btn}
                      onClick={() => {
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
  } else if (stateReview) {
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
            <div
              className={styles.reviewTitle}
              onClick={() => setStateReview(true)}
            >
              작성 가능한 리뷰 ({completedProducts && completedProducts.length})
            </div>
            <div
              className={
                stateReview !== true ? styles.reviewTitle : styles.reviewTitle2
              }
              onClick={() => setStateReview(false)}
            >
              내 리뷰 ({product && product.length})
            </div>
            <div className={styles.horizonLine}></div>
          </div>
          <div className={styles.topContainer}>
            <div className={styles.productInfo}>{itemArr3[0]}</div>
            <div className={styles.orderDate}>{itemArr3[1]}</div>
            <div className={styles.orderNumber}>{itemArr3[2]}</div>
            <div className={styles.orderPrice}>{itemArr3[3]}</div>
            <div className={styles.orderCoupon}>{itemArr3[4]}</div>
            <div className={styles.orderState}>{itemArr3[5]}</div>
          </div>

          <div className={styles.horizonLine2}></div>

          {completedProducts && completedProducts.length === 0 ? (
            <div className={styles.noneText}>
              아직 리뷰를 작성할 수 있는 주문내역이 없습니다.
            </div>
          ) : null}
          {completedProducts &&
            completedProducts.map((item, index) => (
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
                  <div className={styles.orderNum}>{item.product._id}</div>
                  <div className={styles.priceContainer2}>
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
                    <div>{item.product.count} 개</div>
                  </div>
                  <div className={styles.coupon}>{item.product.coupon}</div>
                  <div className={styles.state}>
                    <div>{item.product.state}</div>
                    {item.product.isReviewd === false ? (
                      <div
                        className={styles.review}
                        onClick={() => {
                          setShowModal((prev) => !prev);
                          setNumber(index);
                        }}
                      >
                        리뷰 쓰기
                      </div>
                    ) : null}
                  </div>
                </div>
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
        </div>
      </div>
    );
  }
};

export default Review;
