import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOrderedProducts } from "../../../../api/myPage";
import { completeShipment, getShipIsCompleted } from "../../../../api/order";
import UIOrderPage from "../UIOrderPage";
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
    <UIOrderPage
      products={products}
      isLoading={isLoading}
      isLoading2={isLoading2}
      goToDetail={goToDetail}
      goToSearch={goToSearch}
      setPrice={setPrice}
      clickToBtn={clickToBtn}
      completedProducts={completedProducts}
      setShowModal={setShowModal}
      setIndex={setIndex}
      showModal={showModal}
      index={index}
      getShipIsCompletedRefetch={getShipIsCompletedRefetch}
    />
  );
};

export default Order;
