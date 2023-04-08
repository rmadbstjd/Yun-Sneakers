import React from "react";
import styles from "./ProductLikeCard.module.css";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import { HiHeart } from "react-icons/hi";
import { AiFillCloseSquare } from "react-icons/ai";
import convertToPrice from "../../hooks/convertToPrice";
import Swal from "sweetalert2";
const ProductLikeCard = ({ none, products, refetch }) => {
  const { like, product } = userInfoStore();
  const navigate = useNavigate();
  console.log("products", products);
  const clickDelete = async (e) => {
    e.stopPropagation();
    products && (await like.pushLike(products.id));
    refetch();
  };
  const goToDetail = () => {
    navigate(`/products/${products.id}`);
  };

  const clickToSettingBtn = (e) => {
    e.stopPropagation();
    navigate("/edit", { state: { productId: products && products.id } });
  };
  const clickToDeleteBtn = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "상품을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("테스트");
        await product.deleteProduct(products.id);
        navigate("/");
      }
    });
  };
  return (
    <div className={styles.card} onClick={goToDetail}>
      <div className={styles.buttonContainer}>
        <div className={styles.setting} onClick={clickToSettingBtn}>
          수정
        </div>
        <div className={styles.delete} onClick={clickToDeleteBtn}>
          삭제
        </div>
      </div>
      {none !== "none" ? (
        <AiFillCloseSquare
          className={styles.deleteButton}
          onClick={clickDelete}
        />
      ) : null}
      <img
        className={styles.img}
        src={products && products.image}
        alt="이미지"
      ></img>

      <div className={styles.infoContainer}>
        <div className={styles.categoryContainer}>
          <div className={styles.category}>
            {products && products.category[0]}
          </div>
        </div>
        <div className={styles.info}>
          <div>{products && products.description} </div>
          <div className={styles.name}>{products && products.name}</div>
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              {products && convertToPrice(products.price)}원
            </div>
            <div className={styles.heartContainer}>
              <HiHeart className={styles.heart} />
              <div className={styles.num}>{products && products.likeNum}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLikeCard;
