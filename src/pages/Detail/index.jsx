import React, { useState, useEffect } from "react";
import userInfoStore from "../../store/userInfoStore";
import cartStore from "../../store/cartStore";
import productStore from "../../store/productStore";
import styles from "./ProductDetail.module.css";
import HorizonLine from "../../components/common/HorizonLine";
import { BsArrowDownCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Modal from "../../components/common/Modal";
import CartModal from "../../components/CartModal";
import HeartModal from "../../components/HeartModal";
import SimilarProducts from "../../components/SimilarProducts";
import Swal from "sweetalert2";
import Navbar from "./../../components/common/Navbar/index";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, like, cart } = userInfoStore();
  const { plusCartCount } = cartStore();
  const { selectSize, setInitSize } = productStore();
  const [sizeModalShow, setSizeModalShow] = useState(false);
  const [cartModalShow, setCartModalShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productInfo, setProductInfo] = useState("");

  const [heart, setHeart] = useState(null);
  const [heartShow, setHeartShow] = useState(heart);
  const { data } = useQuery([id], () => product.getProductInfo(id));
  const products = data && data.product;
  const category = data && data.product.category;
  const { data: similars } = useQuery(
    ["similar", id],
    () => product.getSimilarProducts(category, id),
    { refetchOnMount: "alaways", enabled: !!category }
  );

  const showSize = () => {
    setSizeModalShow((prev) => !prev);
    setModalIsOpen((prev) => !prev);
  };

  const clickToCart = async () => {
    if (!selectSize) {
      Swal.fire({
        title: "사이즈를 선택해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }

    setCartModalShow((prev) => !prev);
    setTimeout(setCartModalShow, 3000);

    const isSubmit = await cart.addUserCart(products, selectSize);

    if (isSubmit.success === false) {
      return;
    }
    plusCartCount(1);
  };
  const clickToHeart = () => {
    if (!heart) {
      setHeartShow((prev) => !prev);
      setTimeout(setHeartShow, 2000);
    }
  };
  const clickToLike = () => {
    like.pushLike(productInfo.product.id);
    setHeart((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      setProductInfo(await product.getProductInfo(id));
    };
    fetchData();
    setInitSize();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      productInfo &&
        setHeart(
          (await like.isLike(productInfo.product.id).result) === true
            ? true
            : false
        );
    };
    fetchData();
  }, [productInfo]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.productContainer}>
          <div
            className={styles.img}
            style={{
              backgroundImage:
                "url(" + `${productInfo && productInfo.product.image}` + ")",
            }}
          ></div>

          <div className={styles.infoContainer}>
            <div className={styles.category}>
              {productInfo && productInfo.product.category}
            </div>
            <div>
              <div>{productInfo[6]}</div>
              <div className={styles.description}>
                {productInfo && productInfo.product.description}
              </div>
            </div>

            <div>
              <div className={styles.sizeContainer}>
                <div className={styles.size}>사이즈</div>
                <div className={styles.test} onClick={showSize}>
                  {selectSize === "" ? (
                    <div className={styles.sizeBtn}>사이즈</div>
                  ) : (
                    <div className={styles.sizeNum}>{selectSize}</div>
                  )}
                  <div className={styles.circle}>
                    <BsArrowDownCircle size={20} />
                  </div>
                </div>
                {sizeModalShow === true ? (
                  <Modal
                    isOpen={true}
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                    size={productInfo && productInfo.product.size}
                    type={"size"}
                  ></Modal>
                ) : (
                  <Modal
                    isOpen={false}
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                    type={"size"}
                  ></Modal>
                )}
              </div>
              <HorizonLine />
            </div>

            <div className={styles.price}>
              {productInfo &&
                productInfo.product.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </div>
            {cartModalShow && (
              <CartModal
                cartShow={cartModalShow}
                setCartShow={setCartModalShow}
              ></CartModal>
            )}
            {heartShow && (
              <HeartModal
                heartShow={heartShow}
                setHeartShow={setHeartShow}
              ></HeartModal>
            )}
            <div className={styles.cartContainer}>
              <div className={styles.addBtn} onClick={clickToCart}>
                장바구니에 추가
              </div>

              <div
                className={
                  heart === true
                    ? styles.heartContainer2
                    : styles.heartContainer1
                }
                onClick={clickToHeart}
              >
                {heart === false ? (
                  <BsHeart className={styles.heart1} onClick={clickToLike} />
                ) : heart === true ? (
                  <FaHeart className={styles.heart2} onClick={clickToLike} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.p}>
        <div className={styles.p2}>
          <span className={styles.category2}>{category}</span>의 다른 상품
        </div>
      </div>
      <div className={styles.similarContainer}>
        <div className={styles.shoesContainer}>
          {similars &&
            similars.map((item) => (
              <SimilarProducts key={item.productId} products={item} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
