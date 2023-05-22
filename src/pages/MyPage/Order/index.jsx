import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOrderedProducts } from "../../../api/myPage";
import { Link } from "react-scroll";
import { completeShipment, getShipIsCompleted } from "../../../api/order";
import Button from "../../../components/common/button";
import ReviewModal from "../../../components/common/Modal/ReviewModal";
import convertStringToNumber from "../../../utils/convertStringToNumber";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import * as Style from "./styles";
import MypageSide from "../../../components/MypageSide";
import Navbar from "./../../../components/common/Navbar/index";

const itemArr = [
  "상품정보",
  "주문일자",
  "주문번호",
  "주문금액(수량)",
  "쿠폰할인",
  "주문상태",
];
const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState();
  const {
    isLoading,
    data: products,
    refetch: getOrderedProductsRefetch,
  } = useQuery(["배송중"], () => getOrderedProducts());
  const {
    isLoading: isLoading2,
    data: completedProducts,
    refetch: getShipIsCompletedRefetch,
  } = useQuery(["배송완료"], () => getShipIsCompleted());
  const navigate = useNavigate();

  const clickToBtn = async (id) => {
    await completeShipment(id);
    await getShipIsCompleted();
    refetchProducts();
  };

  const refetchProducts = () => {
    getOrderedProductsRefetch();
    getShipIsCompletedRefetch();
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
    navigate(`/search?keyword=${info.category[0]}`);
  };
  return (
    <>
      <Navbar />
      <Style.MyPageContainer>
        <MypageSide />
        <Style.MainContainer>
          <div>
            <Style.Header>주문 내역 조회</Style.Header>
            <Style.Title>배송중 ( {products && products.length} )</Style.Title>
            <Style.HorizonLine></Style.HorizonLine>
            <Style.TopContainer>
              <Style.TopItem width={"500px"}>{itemArr[0]}</Style.TopItem>
              <Style.TopItem width={"150px"}>{itemArr[1]}</Style.TopItem>
              <Style.TopItem width={"350px"}>{itemArr[2]}</Style.TopItem>
              <Style.TopItem width={"200px"}>{itemArr[3]}</Style.TopItem>
              <Style.TopItem width={"200px"}>{itemArr[4]}</Style.TopItem>
              <Style.TopItem width={"200px"}>{itemArr[5]}</Style.TopItem>
            </Style.TopContainer>
            <Style.HorizonLine></Style.HorizonLine>
            {products?.length === 0 ? (
              <Style.NoneText>
                최근 배송중인 상품이 존재하지 않습니다.
              </Style.NoneText>
            ) : null}
            {isLoading && (
              <LoadingSpinner
                text={"상품을 준비하고 있습니다."}
                margin={"100px 0px 0px 0px"}
              />
            )}
            {products?.map((item) => (
              <Style.ProductContent key={item.product._id}>
                <Style.Img
                  alt="상품"
                  src={item.info.image}
                  onClick={() => {
                    goToDetail(item.info);
                  }}
                ></Style.Img>
                <Style.InfoContainer>
                  <Style.InfoItem
                    onClick={() => {
                      goToSearch(item.info);
                    }}
                  >
                    <span style={{ cursor: "pointer" }}>
                      {item.info.category[0]}
                    </span>
                  </Style.InfoItem>
                  <Style.InfoItem
                    onClick={() => {
                      goToDetail(item.info);
                    }}
                  >
                    <span style={{ cursor: "pointer" }}>{item.info.name}</span>
                  </Style.InfoItem>
                  <Style.InfoItem>사이즈 [{item.product.size}]</Style.InfoItem>
                </Style.InfoContainer>
                <Style.OrderDate>{item.product.date}</Style.OrderDate>
                <Style.OrderNum>{item.product._id}</Style.OrderNum>
                <Style.PriceContainer>
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
                  <div>{item.product.count} 개</div>
                </Style.PriceContainer>
                <Style.Coupon>{item.product.coupon}</Style.Coupon>
                <Style.State>
                  <Style.BtnContainer>
                    <Style.Text>배송이 완료되었다면↓</Style.Text>

                    <Link to="shipComplete" spy={true} smooth={true}>
                      <Button
                        style={{
                          border: "solid gray 1px",
                          width: "80px",
                          height: "30px",
                          margin: "0px 0px 0px 17px",
                          fontSize: "15px",
                          background: "white",

                          color: "black",
                          hoverColor: "white",
                          hoverBackground: "black",
                        }}
                        isShow={true}
                        onClick={() => {
                          clickToBtn(item.product._id);
                        }}
                      >
                        배송완료
                      </Button>
                    </Link>
                  </Style.BtnContainer>
                  <div>{item.product.state}</div>
                </Style.State>
              </Style.ProductContent>
            ))}
            <Style.ShipmentTitle>
              <div id="shipComplete">
                배송 완료 ( {completedProducts && completedProducts.length} )
              </div>
            </Style.ShipmentTitle>
            <Style.HorizonLine></Style.HorizonLine>
            <Style.TopContainer>
              <Style.TopItem width={"500px"}>{itemArr[0]}</Style.TopItem>
              <Style.TopItem width={"150px"}>{itemArr[1]}</Style.TopItem>
              <Style.TopItem width={"350px"}>{itemArr[2]}</Style.TopItem>
              <Style.TopItem width={"200px"}>{itemArr[3]}</Style.TopItem>
              <Style.TopItem width={"200px"}>{itemArr[4]}</Style.TopItem>
              <Style.TopItem width={"200px"}>{itemArr[5]}</Style.TopItem>
            </Style.TopContainer>
            <Style.HorizonLine></Style.HorizonLine>
            {completedProducts && completedProducts.length === 0 ? (
              <Style.NoneText>
                배송이 완료된 상품이 존재하지 않습니다.
              </Style.NoneText>
            ) : null}
            {isLoading2 && (
              <LoadingSpinner
                text={"상품을 준비하고 있습니다."}
                margin={"100px 0px 0px 0px"}
              />
            )}
            {completedProducts &&
              completedProducts.map((item, index) => (
                <Style.ProductContent key={item.product._id}>
                  <Style.Img
                    alt="상품"
                    src={item.info.image}
                    onClick={() => {
                      goToDetail(item.info);
                    }}
                  ></Style.Img>
                  <Style.InfoContainer>
                    <Style.InfoItem
                      onClick={() => {
                        goToSearch(item.info);
                      }}
                    >
                      <span style={{ cursor: "pointer" }}>
                        {item.info.category}
                      </span>
                    </Style.InfoItem>
                    <Style.InfoItem
                      onClick={() => {
                        goToDetail(item.info);
                      }}
                    >
                      <span style={{ cursor: "pointer" }}>
                        {item.info.name}
                      </span>
                    </Style.InfoItem>
                    <Style.TopItem>사이즈 [{item.product.size}]</Style.TopItem>
                  </Style.InfoContainer>
                  <Style.OrderDate>{item.product.date}</Style.OrderDate>
                  <Style.OrderNum>{item.product._id}</Style.OrderNum>
                  <Style.PriceContainer>
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
                    <div>{item.product.count} 개</div>
                  </Style.PriceContainer>
                  <Style.Coupon>{item.product.coupon}</Style.Coupon>
                  <Style.State>
                    <div>{item.product.state}</div>
                    {!item.product.isReviewd ? (
                      <Button
                        style={{
                          border: "solid gray 1px",
                          width: "70px",
                          height: "25px",
                          background: "#303033",
                          color: "white",
                          lineHeight: "190%",
                          margin: "10px 0px 0px 0px",
                          fontSize: "13px",
                          hoverColor: "white",
                          hoverBackground: "black",
                        }}
                        isShow={true}
                        onClick={() => {
                          setShowModal((prev) => !prev);
                          setIndex(index);
                        }}
                      >
                        리뷰 쓰기
                      </Button>
                    ) : null}
                  </Style.State>
                </Style.ProductContent>
              ))}
            {showModal ? (
              <ReviewModal
                isOpen={true}
                modalIsOpen={showModal}
                setModalIsOpen={setShowModal}
                product={completedProducts[index]}
                isReviewed={false}
                refetch={getShipIsCompletedRefetch}
              ></ReviewModal>
            ) : null}
          </div>
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default Order;
