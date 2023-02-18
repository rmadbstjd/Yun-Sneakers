import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import styles from "./css/PopularProducts.module.css";
import useStore from "../../store";
import Arrow from "../Arrow";
const ShowPopularProducts = () => {
  const { product } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["popular", currentPage], () =>
    product.getPopularProducts(currentPage)
  );
  return (
    <div className={styles.container}>
      <div className={styles.productsContainer}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className={styles.popular}>Most Popular</div>
        <div className={styles.popular2}>인기 있는 상품</div>
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        <div className={styles.moreContainer}>
          <div className={styles.more}>
            <Arrow currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPopularProducts;
