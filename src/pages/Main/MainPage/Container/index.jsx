import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPopularProducts,
  getNewProducts,
  getUniqueProducts,
} from "../../../../api/product";
import useGetUserAddress from "../../../../hooks/useGetUserAddress";
import { useNavigate } from "react-router-dom";
import UIMainPage from "../UIMainPage";
const MainPage = () => {
  const [newCurrentPage, setNewCurrentPage] = useState(1);
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const [uniqueCurrentPage, setUniqueCurrentPage] = useState(1);
  const [showNewMoreBtn, setShowNewMoreBtn] = useState(true);
  const [showPopularMoreBtn, setShowPopularMoreBtn] = useState(true);
  const [showUniqueMoreBtn, setShowUniqueMoreBtn] = useState(true);
  useGetUserAddress();
  const { isLoading: isLoadingOfNewProducts, data: newProducts } = useQuery(
    ["showNewProducts", newCurrentPage],
    () => getNewProducts(newCurrentPage)
  );
  const { isLoading: isLoadingOfPopularProducts, data: popularProducts } =
    useQuery(["showPopularProducts", popularCurrentPage], () =>
      getPopularProducts(popularCurrentPage)
    );
  const { isLoading: isLoadingOfUniqueProducts, data: uniqueProducts } =
    useQuery(["showUniqueProducts", uniqueCurrentPage], () =>
      getUniqueProducts(uniqueCurrentPage)
    );
  const navigate = useNavigate();

  const goToDetail = (productId) => {
    navigate(`/products/${productId}`);
  };
  const onClickNewShowMoreProductsBtn = () => {
    setNewCurrentPage((prev) => prev + 1);
    if (newCurrentPage >= 4) setShowNewMoreBtn(false);
  };

  const onClickPopularShowMoreProductsBtn = () => {
    setPopularCurrentPage((prev) => prev + 1);
    if (popularCurrentPage >= 4) setShowPopularMoreBtn(false);
  };

  const onClickUniqueShowMoreProductsBtn = () => {
    setUniqueCurrentPage((prev) => prev + 1);
    if (uniqueCurrentPage >= 1) setShowUniqueMoreBtn(false);
  };
  return (
    <UIMainPage
      isLoadingOfPopularProducts={isLoadingOfPopularProducts}
      popularProducts={popularProducts}
      showPopularMoreBtn={showPopularMoreBtn}
      setShowPopularMoreBtn={setShowPopularMoreBtn}
      onClickPopularShowMoreProductsBtn={onClickPopularShowMoreProductsBtn}
      goToDetail={goToDetail}
      isLoadingOfNewProducts={isLoadingOfNewProducts}
      newProducts={newProducts}
      newCurrentPage={newCurrentPage}
      setNewCurrentPage={setNewCurrentPage}
      showNewMoreBtn={showNewMoreBtn}
      setShowNewMoreBtn={setShowNewMoreBtn}
      onClickNewShowMoreProductsBtn={onClickNewShowMoreProductsBtn}
      isLoadingOfUniqueProducts={isLoadingOfUniqueProducts}
      uniqueProducts={uniqueProducts}
      uniqueCurrentPage={uniqueCurrentPage}
      setUniqueCurrentPage={setUniqueCurrentPage}
      showUniqueMoreBtn={showUniqueMoreBtn}
      setShowUniqueMoreBtn={setShowUniqueMoreBtn}
      onClickUniqueShowMoreProductsBtn={onClickUniqueShowMoreProductsBtn}
    />
  );
};

export default MainPage;
