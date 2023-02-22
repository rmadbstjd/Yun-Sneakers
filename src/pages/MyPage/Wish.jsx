import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./css/Wish.module.css";
import MypageSide from "../../components/MypageSide";
import Navbar from "./../../components/common/Navbar/index";
import userInfoStore from "../../store/userInfoStore";
import ProductLikeCard from "../../components/ProductLikeCard";
const Wish = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { like } = userInfoStore();
  const {
    isLoading,
    error,
    data: product,
    refetch,
  } = useQuery(["like"], () => like.getLikedProducts(), {
    enabled: true,
  });
  const goToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    if (product) {
      setCount(product.length);
    }
  }, [product]);
  return (
    <>
      <Navbar />
      <div className={styles.mypageContainer}>
        <MypageSide />
        <div className={styles.mainContainer}>
          <div className={styles.title}>관심 상품 ( {count} )</div>
          <div className={styles.horizonLine}></div>
          <div className={styles.productsContainer}>
            {product &&
              product.map((item) =>
                item.map((product) => (
                  <ProductLikeCard
                    product={product}
                    refetch={refetch}
                  ></ProductLikeCard>
                ))
              )}
            {product && product.length === 0 ? (
              <div className={styles.noneProductContainer}>
                <div className={styles.noneProduct}>
                  <div className={styles.span}>
                    좋아요를 누른 상품이 없습니다.
                  </div>
                  <div className={styles.mainBtn} onClick={goToMain}>
                    CONTINUE SHOPPING{" "}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wish;
