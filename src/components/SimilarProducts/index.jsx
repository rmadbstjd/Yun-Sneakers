import React from "react";
import styles from "./css/SimilarProducts.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import { getProductInfo } from "../../api/firebase";
const SimilarProducts = ({ products }) => {
  const { setCurrentProduct } = useStore();
  const navigate = useNavigate();
  const goToDetail = () => {
    setCurrentProduct(products);
    getProductInfo(products.id);
    navigate(`/products/${products.id}`);
  };
  return (
    <div className={styles.product} onClick={goToDetail}>
      <div
        className={styles.img}
        style={{ backgroundImage: "url(" + `${products.image}` + ")" }}
      ></div>
      <span className={styles.category}>{products.category}</span>
      <div className={styles.name}>{products.name}</div>
      <div className={styles.price}>
        {products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
      </div>
    </div>
  );
};

export default SimilarProducts;
