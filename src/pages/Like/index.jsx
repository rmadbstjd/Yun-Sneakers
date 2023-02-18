import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductLikeCard from "../../components/ProductLikeCard";
import styles from "./LikeProducts.module.css";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
const LikeProducts = () => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
  };
  const { like } = useStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const [count, setCount] = useState(0);
  const {
    isLoading,
    error,
    data: product,
    refetch,
  } = useQuery(["like"], () => like.getLikeProduct(), {
    enabled: true,
  });

  useEffect(() => {
    if (isLogin === false) {
      navigate("/login");
    }
    if (product) {
      setCount(product.length);
    }
  }, [product, isLogin, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.productsContainer}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className={styles.contentContainer}>
          <div className={styles.title}>좋아요를 누른 상품 ♥ ( {count} )</div>
          <div className={styles.horizonLine2}></div>
        </div>

        {product &&
          product.map((product) =>
            product.map((product) => (
              <ProductLikeCard
                product={product}
                key={product.id}
                refetch={refetch}
              />
            ))
          )}
        {product && product.length === 0 ? (
          <div className={styles.noneProductContainer}>
            <div className={styles.noneProduct}>
              <div className={styles.span}>좋아요를 누른 상품이 없습니다.</div>
              <div className={styles.mainBtn} onClick={goToMain}>
                CONTINUE SHOPPING{" "}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LikeProducts;
