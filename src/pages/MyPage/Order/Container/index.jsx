import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOrderedProducts } from "../../../../api/product";
import { completeDelivery, getDeliveredProducts } from "../../../../api/order";
import UIOrderPage from "../UIOrderPage";
const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState();
  const {
    isLoading: isOrderedproductsLoading,
    data: products,
    refetch: getOrderedProductsRefetch,
  } = useQuery(["배송중"], () => getOrderedProducts());
  const {
    isLoading: isDelieveredProductsLoading,
    data: completedProducts,
    refetch: getDeliveredProductsRefetch,
  } = useQuery(["배송완료"], () => getDeliveredProducts());
  const navigate = useNavigate();

  const clickToBtn = async (id) => {
    await completeDelivery(id);
    await getDeliveredProducts();
    refetchProducts();
  };

  const refetchProducts = () => {
    getOrderedProductsRefetch();
    getDeliveredProductsRefetch();
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
      isOrderedproductsLoading={isOrderedproductsLoading}
      isDelieveredProductsLoading={isDelieveredProductsLoading}
      goToDetail={goToDetail}
      goToSearch={goToSearch}
      setPrice={setPrice}
      clickToBtn={clickToBtn}
      completedProducts={completedProducts}
      setShowModal={setShowModal}
      setIndex={setIndex}
      showModal={showModal}
      index={index}
      getShipIsCompletedRefetch={getDeliveredProductsRefetch}
    />
  );
};

export default Order;
