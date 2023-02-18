import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import { HiHeart } from "react-icons/hi";
const ProductCard = ({ product }) => {
  const { setCurrentProduct } = useStore();
  const navigate = useNavigate();
  const goToDetail = () => {
    setCurrentProduct(product);

    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={goToDetail}>
      <img className={styles.img} src={product && product.image}></img>
      <div className={styles.infoContainer}>
        <div className={styles.categoryContainer}>
          <div className={styles.category}>{product && product.category}</div>
        </div>
        <div className={styles.info}>
          <div>{product && product.description} </div>
          <div className={styles.name}>{product && product.name}</div>
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </div>
            <div className={styles.heartContainer}>
              <HiHeart className={styles.heart} />
              <div className={styles.num}>{product && product.likeNum}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
