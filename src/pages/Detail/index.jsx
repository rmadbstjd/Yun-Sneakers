import React, { useState, useEffect } from "react";
import userInfoStore from "../../store/userInfoStore";
import cartStore from "../../store/cartStore";
import productStore from "../../store/productStore";
import HorizonLine from "../../components/common/HorizonLine";
import { BsArrowDownCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Modal from "../../components/common/Modal";
import CartModal from "../../components/CartModal";
import SimilarProducts from "../../components/SimilarProducts";
import Swal from "sweetalert2";
import Navbar from "./../../components/common/Navbar/index";
import * as Style from "./styles";
import convertToPrice from "../../hooks/convertToPrice";
import { useNavigate } from "react-router-dom";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, like, cart } = userInfoStore();
  const { plusCartCount } = cartStore();
  const { selectSize, setInitSize } = productStore();

  const { data: productInfo } = useQuery([id], () =>
    product.getProductInfo(id)
  );
  const products = productInfo && productInfo.product;
  const category = productInfo && productInfo.product.category;
  const productId = productInfo && productInfo.product.id;

  const { data: similars } = useQuery(
    ["similar", id],
    () => product.getSimilarProducts(category, id),
    { refetchOnMount: "alaways", enabled: !!category }
  );

  const { data: isLiked, refetch } = useQuery(
    ["isLiked", id],
    () => like.isLike(productId),
    { enabled: !!productId }
  );

  const [sizeModalShow, setSizeModalShow] = useState(false);
  const [cartModalShow, setCartModalShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isLogin = localStorage.getItem("isLogin") === "true";
  const showSize = () => {
    setSizeModalShow((prev) => !prev);
    setModalIsOpen((prev) => !prev);
  };

  const clickToCart = async () => {
    console.log("isLogin", isLogin);
    if (!isLogin) {
      navigate("/login");
      return;
    }
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
    if (isSubmit.success === false) return;
    plusCartCount(1);
  };

  const clickToLike = async () => {
    await like.pushLike(productInfo.product.id);
    refetch();
  };

  useEffect(() => {
    setInitSize();
  }, []);

  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.ProductContainer>
          <Style.Image
            style={{
              backgroundImage:
                "url(" + `${productInfo && productInfo.product.image}` + ")",
            }}
          ></Style.Image>

          <Style.InfoContainer>
            <Style.Category>
              {productInfo && productInfo.product.category}
            </Style.Category>
            <Style.Description>
              {productInfo && productInfo.product.description}
            </Style.Description>

            <div>
              <Style.SizeContainer>
                <Style.SizeTitle>사이즈</Style.SizeTitle>
                <Style.Size onClick={showSize}>
                  {selectSize === "" ? (
                    <Style.SizeBtn>사이즈</Style.SizeBtn>
                  ) : (
                    <Style.SizeNum>{selectSize}</Style.SizeNum>
                  )}
                  <Style.Circle>
                    <BsArrowDownCircle size={20} />
                  </Style.Circle>
                </Style.Size>
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
              </Style.SizeContainer>
              <HorizonLine />
            </div>

            <Style.Price>
              {productInfo && convertToPrice(productInfo.product.price)}원
            </Style.Price>
            {cartModalShow && (
              <CartModal
                cartShow={cartModalShow}
                setCartShow={setCartModalShow}
              ></CartModal>
            )}

            <Style.CartContainer>
              <Style.AddBtn onClick={clickToCart}>장바구니에 추가</Style.AddBtn>

              {isLiked && isLiked.result === false ? (
                <BsHeart
                  style={{
                    width: "45px",
                    height: "45px",
                    marginTop: "2px",
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontsize: "35px",
                    color: "gray",
                  }}
                  onClick={clickToLike}
                />
              ) : isLiked && isLiked.result === true ? (
                <FaHeart
                  style={{
                    width: "45px",
                    height: "45px",
                    marginTop: "2px",
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontsize: "35px",
                    color: "red",
                  }}
                  onClick={clickToLike}
                />
              ) : null}
            </Style.CartContainer>
          </Style.InfoContainer>
        </Style.ProductContainer>
      </Style.Container>
      <Style.SpanContainer>
        <Style.Span>
          <Style.Category2>{category}</Style.Category2>의 다른 상품
        </Style.Span>
      </Style.SpanContainer>
      <Style.SimilarContainer>
        <Style.ShoesContainer>
          {similars &&
            similars.map((item) => (
              <SimilarProducts key={item.productId} products={item} />
            ))}
        </Style.ShoesContainer>
      </Style.SimilarContainer>
    </>
  );
};

export default ProductDetail;
