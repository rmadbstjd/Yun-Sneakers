import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPopularProducts,
  getNewProducts,
  getUniqueProducts,
} from "../../api/product";
import * as Style from "./styles";
import RecommendBrand from "./RecommendBrand";
import Navbar from "./../../components/common/Navbar/index";
import MainProducts from "../../components/MainProducts";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const [newCurrentPage, setNewCurrentPage] = useState(1);
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const [uniqueCurrentPage, setUniqueCurrentPage] = useState(1);
  const [showNewMoreBtn, setShowNewMoreBtn] = useState(true);
  const [showPopularMoreBtn, setShowPopularMoreBtn] = useState(true);
  const [showUniqueMoreBtn, setShowUniqueMoreBtn] = useState(true);

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
    <>
      <Navbar />
      <Style.Container>
        <Style.ImgContainer>
          <Style.Img
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dtw1xfagx/image/upload/v1672987124/homeimg_nrshhh.jpg)",
            }}
          >
            Premium Shoes for you !
          </Style.Img>
        </Style.ImgContainer>

        <Style.ProductsContainerLayout>
          <Style.ProductsContainer>
            <RecommendBrand />
            <MainProducts
              isLoading={isLoadingOfPopularProducts}
              products={popularProducts}
              showMoreBtn={showPopularMoreBtn}
              setShowMoreBtn={setShowPopularMoreBtn}
              onClick={onClickPopularShowMoreProductsBtn}
              titleENG={"Most Popular"}
              titleKOR={"인기 있는 상품"}
              width={"94.8%"}
              onNavigate={goToDetail}
            />

            <MainProducts
              isLoading={isLoadingOfNewProducts}
              products={newProducts}
              currentPage={newCurrentPage}
              setCurrentPage={setNewCurrentPage}
              showMoreBtn={showNewMoreBtn}
              setShowMoreBtn={setShowNewMoreBtn}
              onClick={onClickNewShowMoreProductsBtn}
              titleENG={"New In"}
              titleKOR={"새로운 상품"}
              width={"100%"}
              onNavigate={goToDetail}
            />
            <MainProducts
              isLoading={isLoadingOfUniqueProducts}
              products={uniqueProducts}
              currentPage={uniqueCurrentPage}
              setCurrentPage={setUniqueCurrentPage}
              showMoreBtn={showUniqueMoreBtn}
              setShowMoreBtn={setShowUniqueMoreBtn}
              onClick={onClickUniqueShowMoreProductsBtn}
              titleENG={"Unique Products"}
              titleKOR={"시선을 사로잡는 상품"}
              width={"100%"}
              onNavigate={goToDetail}
            />
          </Style.ProductsContainer>
        </Style.ProductsContainerLayout>
      </Style.Container>
    </>
  );
};

export default Main;
