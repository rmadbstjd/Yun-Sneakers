import React from "react";
import styles from "./ProductLikeCard.module.css";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import { HiHeart } from "react-icons/hi";
import { AiFillCloseSquare } from "react-icons/ai";
import convertToPrice from "../../hooks/convertToPrice";
const ProductLikeCard = ({ none, product, refetch }) => {
  const { like } = userInfoStore();
  const navigate = useNavigate();
  const clickDelete = async (e) => {
    e.stopPropagation();
    product && (await like.pushLike(product.id));
    refetch();
  };
  const goToDetail = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={goToDetail}>
      {none !== "none" ? (
        <AiFillCloseSquare
          className={styles.deleteButton}
          onClick={clickDelete}
        />
      ) : null}
      <img
        className={styles.img}
        src={product && product.image}
        alt="이미지"
      ></img>

      <div className={styles.infoContainer}>
        <div className={styles.categoryContainer}>
          <div className={styles.category}>{product && product.category}</div>
        </div>
        <div className={styles.info}>
          <div>{product && product.description} </div>
          <div className={styles.name}>{product && product.name}</div>
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              {convertToPrice(product.price)}원
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

export default ProductLikeCard;
