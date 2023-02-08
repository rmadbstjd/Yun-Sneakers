import React, { useState, useEffect } from "react";
import styles from "./css/OrderPageNavbar.module.css";
import { useQuery } from "@tanstack/react-query";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Modal from "./common/Modal";
const itemArr = [
  "상품정보",
  "주문일자",
  "주문번호",
  "주문금액(수량)",
  "쿠폰할인",
  "주문상태",
];
const OrderPageNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    isLoading,
    error,
    data: products,
    refetch: refetch1,
  } = useQuery(["배송중"], () => cart.getOrderProducts());
  const { data: completedProducts, refetch: refetch2 } = useQuery(
    ["배송완료"],
    () => cart.getShipComplete()
  );
  const { cart } = useStore();
  const navigate = useNavigate();
  const clickToBtn = async (id) => {
    await cart.addShipComplete(id);
    refetch1();
    refetch2();
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
  const goToDetail = (info) => {
    navigate(`/products/${info.id}`);
  };
  const goToSearch = (info) => {
    navigate(`/search?keyword=${info.category}`);
  };
  useEffect(() => {}, [products, completedProducts]);
  return (
    <div>
      <div className={styles.title}>주문 내역 조회</div>
      <div className={styles.title2}>
        배송중 ( {products && products.length} )
      </div>
      <div className={styles.horizonLine}></div>
      <div className={styles.topContainer}>
        <div className={styles.productInfo}>{itemArr[0]}</div>
        <div className={styles.orderDate}>{itemArr[1]}</div>
        <div className={styles.orderNumber}>{itemArr[2]}</div>
        <div className={styles.orderPrice}>{itemArr[3]}</div>
        <div className={styles.orderCoupon}>{itemArr[4]}</div>
        <div className={styles.orderState}>{itemArr[5]}</div>
      </div>
      <div className={styles.horizonLine}></div>
      {products && products.length === 0 ? (
        <div className={styles.noneText}>
          최근 배송중인 상품이 존재하지 않습니다.
        </div>
      ) : null}
      {products &&
        products.map((item, index) => (
          <div className={styles.productContent} key={index}>
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
              <div className={styles.size}>사이즈 [{item.product.size}]</div>
            </div>
            <div className={styles.date}>{item.product.date}</div>
            <div className={styles.orderNum}>{item.product.id}</div>
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
              <div>{item.product.count} 개</div>
            </div>
            <div className={styles.coupon}>{item.product.coupon}</div>
            <div className={styles.state}>
              <div className={styles.btnContainer}>
                <div className={styles.text}>배송이 완료되었다면↓</div>
                <div
                  className={styles.btn}
                  onClick={() => {
                    clickToBtn(item.product._id);
                  }}
                >
                  배송완료
                </div>
              </div>
              <div>{item.product.state}</div>
            </div>
          </div>
        ))}
      <div className={styles.title2}>
        배송 완료 ( {completedProducts && completedProducts.length} )
      </div>
      <div className={styles.horizonLine}></div>
      <div className={styles.topContainer}>
        <div className={styles.productInfo}>{itemArr[0]}</div>
        <div className={styles.orderDate}>{itemArr[1]}</div>
        <div className={styles.orderNumber}>{itemArr[2]}</div>
        <div className={styles.orderPrice}>{itemArr[3]}</div>
        <div className={styles.orderCoupon}>{itemArr[4]}</div>
        <div className={styles.orderState}>{itemArr[5]}</div>
      </div>
      <div className={styles.horizonLine}></div>
      {completedProducts && completedProducts.length === 0 ? (
        <div className={styles.noneText}>
          배송이 완료된 상품이 존재하지 않습니다.
        </div>
      ) : null}
      {completedProducts &&
        completedProducts.map((item, index) => (
          <div className={styles.productContent} key={index}>
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
              <div className={styles.size}>사이즈 [{item.product.size}]</div>
            </div>
            <div className={styles.date}>{item.product.date}</div>
            <div className={styles.orderNum}>{item.product._id}</div>
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
              <div>{item.product.count} 개</div>
            </div>
            <div className={styles.coupon}>{item.product.coupon}</div>
            <div className={styles.state}>
              <div>{item.product.state}</div>
              <div
                className={styles.review}
                onClick={() => {
                  setShowModal((prev) => !prev);
                }}
              >
                리뷰 쓰기
              </div>
            </div>
            {showModal === true ? (
              <Modal
                isOpen={true}
                modalIsOpen={showModal}
                setModalIsOpen={setShowModal}
                type={"review"}
                product={item}
              ></Modal>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default OrderPageNavbar;
