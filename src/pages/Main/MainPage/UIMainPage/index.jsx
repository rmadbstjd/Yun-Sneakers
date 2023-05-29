import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import RecommendBrand from "../../RecommendBrand";
import MainProducts from "../../../../components/MainProducts";
const UIMainPage = ({
  isLoadingOfPopularProducts,
  popularProducts,
  showPopularMoreBtn,
  setShowPopularMoreBtn,
  onClickPopularShowMoreProductsBtn,
  goToDetail,
  isLoadingOfNewProducts,
  newProducts,
  newCurrentPage,
  setNewCurrentPage,
  showNewMoreBtn,
  setShowNewMoreBtn,
  onClickNewShowMoreProductsBtn,
  isLoadingOfUniqueProducts,
  uniqueProducts,
  uniqueCurrentPage,
  setUniqueCurrentPage,
  showUniqueMoreBtn,
  setShowUniqueMoreBtn,
  onClickUniqueShowMoreProductsBtn,
}) => {
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

export default UIMainPage;
