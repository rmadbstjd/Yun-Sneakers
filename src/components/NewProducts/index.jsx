import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import styles from "./Products.module.css";
import userInfoStore from "../../store/userInfoStore";
import Arrow from "../Arrow";
const Products = () => {
  const { product } = userInfoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["new", currentPage], () => product.getProducts(currentPage));

  useEffect(() => {}, [products]);
  return (
    <div className={styles.container}>
      <div className={styles.productsContainer}>
        <div className={styles.new}>New In</div>
        <div className={styles.new2}>새로운 상품</div>
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

export default Products;
