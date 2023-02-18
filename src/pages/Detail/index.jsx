import React, { useState, useEffect } from "react";
import useStore from "../../store";
import styles from "./ProductDetail.module.css";
import HorizonLine from "../../components/common/HorizonLine";
import { BsArrowDownCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import CartModal from "../../components/CartModal";
import HeartModal from "../../components/HeartModal";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import SimilarProducts from "../../components/SimilarProducts";
import Swal from "sweetalert2";
import Modal from "../../components/common/Modal";
const ProductDetail = () => {
  const [sizeShow, setSizeShow] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [test, setTest] = useState(null);
  const [heartShow, setHeartShow] = useState(test);
  const {
    size,
    setInitSize,
    setWillAddProduct,
    plusProductCount,
    product,
    like,
    cart,
    plusCartCount,
  } = useStore();

  const [productInfo, setProductInfo] = useState("");
  const [addProduct] = useState({});
  const { id } = useParams();
  const showSize = () => {
    setSizeShow((prev) => !prev);
    setModalIsOpen((prev) => !prev);
  };
  const { data } = useQuery([id], () => product.getProductInfo(id));
  const products = data && data.product;
  const category = data && data.product.category;

  const {
    isLoading,
    error,
    data: similars,
  } = useQuery(
    ["similar", id],
    () => product.getSimilarProducts(category, id),
    { refetchOnMount: "alaways", enabled: !!category }
  );
  const clickToCart = async () => {
    if (!size) {
      Swal.fire({
        title: "사이즈를 선택해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }
    plusProductCount();
    setCartShow((prev) => !prev);
    setTimeout(setCartShow, 3000);
    const test = await cart.addUserCart(products, size);

    if (test.success === false) {
      return;
    }
    plusCartCount(1);
  };
  const clickToHeart = () => {
    if (!test) {
      setHeartShow((prev) => !prev);
      setTimeout(setHeartShow, 2000);
    }
  };
  const clickToLike = () => {
    like.pushLike(productInfo.product.id);
    setTest((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      setProductInfo(await product.getProductInfo(id));
    };

    fetchData();
    setInitSize();
  }, [id]);
  useEffect(() => {
    addProduct && setWillAddProduct(addProduct);
    //addProduct  && addOrUpdateToCart(email.split('.')[0], addProduct);
  }, [addProduct]);

  useEffect(() => {
    const fetchData = async () => {
      productInfo && setTest(await like.isLike(productInfo.product.id));
    };

    fetchData();
  }, [productInfo]);

  return (
    <div>
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
                  {size === "" ? (
                    <div className={styles.sizeBtn}>사이즈</div>
                  ) : (
                    <div className={styles.sizeNum}>{size}</div>
                  )}
                  <div className={styles.circle}>
                    <BsArrowDownCircle size={20} />
                  </div>
                </div>
                {sizeShow === true ? (
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
            {cartShow && (
              <CartModal
                cartShow={cartShow}
                setCartShow={setCartShow}
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
                  test === true
                    ? styles.heartContainer2
                    : styles.heartContainer1
                }
                onClick={clickToHeart}
              >
                {" "}
                {test === false ? (
                  <BsHeart className={styles.heart1} onClick={clickToLike} />
                ) : test === true ? (
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
    </div>
  );
};

export default ProductDetail;
