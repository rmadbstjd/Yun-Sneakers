import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import styles from "./CartProduct.module.css";
import Swal from "sweetalert2";
const CartProduct = ({ item, refetch }) => {
  const { cart } = userInfoStore();
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(item.quantity);

  const plus = async () => {
    if (productCount >= 10) {
      Swal.fire({
        title: "최대 구매 갯수는 10개입니다.",
        confirmButtonColor: "black",
      });
      return;
    }
    setProductCount((prev) => prev + 1);
    await cart.updateUserCart(item.productId, item.size, productCount + 1);
    refetch();
  };
  const minus = async () => {
    if (productCount <= 1) {
      return;
    }
    setProductCount((prev) => prev - 1);
    await cart.updateUserCart(item.productId, item.size, productCount - 1);
    refetch();
  };
  const deleteProduct = async () => {
    await cart.deleteUserCart(item.productId, item.size);
    refetch();
  };

  const goToDetail = () => {
    navigate(`/products/${item.productId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.real}>
        <div className={styles.infoContainer}>
          <div
            className={styles.img}
            style={{ backgroundImage: "url(" + `${item.image}` + ")" }}
            onClick={goToDetail}
          ></div>
          <div className={styles.infoContent}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.description}>{item.description}</div>

            <div className={styles.size}>[사이즈] {item.size}</div>
            <div className={styles.price}>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </div>
          </div>
        </div>
        <div className={styles.real2}>
          <div className={styles.quantity}>
            <div className={styles.quantityContent}>
              <div className={styles.minus} onClick={minus}>
                -
              </div>
              <div className={styles.count}>{productCount}</div>
              <div className={styles.plus} onClick={plus}>
                +
              </div>
            </div>
          </div>
          <div className={styles.deleteContainer}>
            <div className={styles.delete} onClick={deleteProduct}>
              삭제하기
            </div>
          </div>
        </div>
      </div>
      <div className={styles.horizonLine2}></div>
    </div>
  );
};

export default CartProduct;
