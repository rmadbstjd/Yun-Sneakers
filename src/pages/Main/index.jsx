import React from "react";
import * as Style from "./styles";
import NewProducts from "../../components/NewProducts";
import PopularProducts from "../../components/PopularProducts";
import Brand from "../../components/RecommendBrand";
import Navbar from "./../../components/common/Navbar/index";
import UniqueProducts from "../../components/UniqueProducts";
const Main = () => {
  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.ImgContainer>
          <Style.Img
            alt="상품"
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
            <Brand />
            <PopularProducts />
            <NewProducts />
            <UniqueProducts />
          </Style.ProductsContainer>
        </Style.ProductsContainerLayout>
      </Style.Container>
    </>
  );
};

export default Main;
