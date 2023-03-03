import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import cartStore from "../../store/cartStore";
import productStore from "../../store/productStore";
import { BsArrowDownCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import HorizonLine from "../../components/common/HorizonLine";
import Modal from "../../components/common/Modal";
import SimilarProducts from "../../components/SimilarProducts";
import Swal from "sweetalert2";
import Navbar from "./../../components/common/Navbar/index";
import convertToPrice from "../../hooks/convertToPrice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, like, cart, userId } = userInfoStore();
  const { plusCartCount } = cartStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const { selectSize, setInitSize } = productStore();

  const { data: productInfo } = useQuery([id], () =>
    product.getProductInfo(id)
  );
  const products = productInfo && productInfo.product;
  const category = productInfo && productInfo.product.category;
  const productId = productInfo && productInfo.product.id;

  const { data: similarProducts } = useQuery(
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
  const showSize = () => {
    setSizeModalShow((prev) => !prev);
    setModalIsOpen((prev) => !prev);
  };

  const clickToCart = async () => {
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
    if (!isLogin) navigate("/login");
    await like.pushLike(productInfo.product.id, userId);
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
          <Style.ImageLayout>
            <Style.Image src={productInfo && productInfo.product.image} />
          </Style.ImageLayout>

          <Style.ProductInfoContainer>
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
                  <Style.ShowSizeCircle>
                    <BsArrowDownCircle size={20} />
                  </Style.ShowSizeCircle>
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
              <HorizonLine width={"100%"} border={"1px"} color={"gray"} />
            </div>

            <Style.Price>
              {productInfo && convertToPrice(productInfo.product.price)}원
            </Style.Price>
            {cartModalShow && (
              <Style.GoToCartPageBtnLayout>
                <Style.GoToCartPageBtnContainer>
                  <div>장바구니에 추가되었습니다.</div>
                  <Style.GoToCartBtn
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    바로가기
                  </Style.GoToCartBtn>
                </Style.GoToCartPageBtnContainer>
              </Style.GoToCartPageBtnLayout>
            )}

            <Style.AddBtnContainer>
              <Style.AddBtn onClick={clickToCart}>장바구니에 추가</Style.AddBtn>
              {isLogin === false ? (
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
              ) : null}
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
            </Style.AddBtnContainer>
          </Style.ProductInfoContainer>
        </Style.ProductContainer>
      </Style.Container>
      <Style.SimilarProductTitleLayout>
        <Style.Span>
          <Style.SimilarProductTitle>{category}</Style.SimilarProductTitle>의
          다른 상품
        </Style.Span>
      </Style.SimilarProductTitleLayout>
      <Style.SimilarContainer>
        <Style.ShoesContainer>
          {similarProducts &&
            similarProducts.map((item) => (
              <SimilarProducts key={item.id} products={item} />
            ))}
        </Style.ShoesContainer>
      </Style.SimilarContainer>
    </>
  );
};

export default ProductDetail;
