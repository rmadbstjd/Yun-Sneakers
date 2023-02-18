import React from "react";
import Products from "../../components/Products";
import ShowPopularProducts from "../../components/PopularProducts";
import Brand from "../../components/RecommendBrand";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dtw1xfagx/image/upload/v1672987124/homeimg_nrshhh.jpg)",
          }}
          className={styles.img}
        >
          Premium Shoes for you
        </div>
      </div>

      <div className={styles.productsContainer}>
        <div className={styles.productContainer}>
          <Brand />
          <ShowPopularProducts />
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Main;
