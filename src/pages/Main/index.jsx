import React from "react";
import * as Style from "./styles";
import NewProducts from "../../components/NewProducts";
import PopularProducts from "../../components/PopularProducts";
import Brand from "../../components/RecommendBrand";
import Navbar from "./../../components/common/Navbar/index";
const Main = () => {
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
            <Brand />
            <PopularProducts />
            <NewProducts />
          </Style.ProductsContainer>
        </Style.ProductsContainerLayout>
      </Style.Container>
    </>
  );
};

export default Main;
