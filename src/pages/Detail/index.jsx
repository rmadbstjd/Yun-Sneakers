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
import ProductReviews from "../../components/ProductReviews";
import Swal from "sweetalert2";
import Navbar from "./../../components/common/Navbar/index";
import convertToPrice from "../../hooks/convertToPrice";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ProductDetailFooter from "../../components/ProductDetailFooter";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-scroll";
import QnA from "../../components/QnA";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, review, like, cart, userId } = userInfoStore();
  const { plusCartCount } = cartStore();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const { selectSize, setInitSize } = productStore();

  const { data: productInfo } = useQuery([id], () =>
    product.getProductInfo(id)
  );
  const products = productInfo && productInfo.product;
  const category = productInfo && productInfo.product.category[0];
  const productId = productInfo && productInfo.product.id;

  const { isLoading, data: similarProducts } = useQuery(
    ["similar", id],
    () => product.getSimilarProducts(category, id),
    { refetchOnMount: "alaways", enabled: !!category }
  );

  const { data: isLiked, refetch } = useQuery(
    ["isLiked", id],
    () => like.isLike(productId),
    { enabled: !!productId }
  );

  const { data: productReviews } = useQuery(
    ["review", id],
    () => review.getProductReviews(id),
    {
      enabled: !!productId,
    }
  );
  const [rate, setRate] = useState(0);
  const [star, setStar] = useState([false, false, false, false, false]);
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

  useEffect(() => {
    if (productReviews) {
      if (productReviews.length === 0) {
        setRate(0);
        return;
      }
      for (let i = 0; i < productReviews.length; i++) {
        setRate((prev) => prev + productReviews[i].rate);
      }
      setRate((prev) => (prev / productReviews.length).toFixed(0));
    }
  }, [productReviews]);

  useEffect(() => {
    switch (rate) {
      case 0:
        setStar([false, false, false, false, false]);
        break;
      case "1":
        setStar([true, false, false, false, false]);
        break;
      case "2":
        setStar([true, true, false, false, false]);
        break;
      case "3":
        setStar([true, true, true, false, false]);
        break;
      case "4":
        setStar([true, true, true, true, false]);
        break;
      case "5":
        setStar([true, true, true, true, true]);
        break;
      default:
        break;
    }
  }, [rate]);

  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.ProductContainer>
          <Style.ImageLayout>
            <Style.Image src={productInfo && productInfo.product.image} />
          </Style.ImageLayout>

          <Style.ProductInfoContainer>
            <HorizonLine width={"100%"} border={"3px"} color={"black"} />
            <Style.Category>
              {productInfo && productInfo.product.category[0]}
            </Style.Category>
            <Style.Description>
              {productInfo && productInfo.product.description}
            </Style.Description>
            <div style={{ display: "flex", margin: "5px 0px 0px 0px" }}>
              {" "}
              <Style.Star>
                {star.map((item, index) =>
                  item === false ? (
                    <AiOutlineStar size={15} key={index} color={"gray"} />
                  ) : (
                    <AiFillStar size={15} key={index} color={"yellow"} />
                  )
                )}
                {review.userId}
              </Style.Star>
              {productReviews && (
                <Style.ReviewCount>
                  <Link to="review" spy={true} smooth={true}>
                    {productReviews.length}개 리뷰 보기
                  </Link>
                </Style.ReviewCount>
              )}
            </div>

            <div>
              <Style.SizeContainer>
                <Style.SizeTitle>사이즈</Style.SizeTitle>
                <Style.Size onClick={showSize}>
                  {selectSize === "" ? (
                    <Style.SizeBtn>모든 사이즈</Style.SizeBtn>
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
                    marginTop: "-10px",
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
                    marginTop: "-10px",
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
                    marginTop: "-10px",
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
      <QnA></QnA>
      <ProductDetailFooter></ProductDetailFooter>
      <div id="review">
        <ProductReviews productReviews={productReviews} />
      </div>

      <Style.SimilarProductTitleLayout>
        <Style.Span>
          <Style.SimilarProductTitle>{category}</Style.SimilarProductTitle>의
          다른 상품
        </Style.Span>
      </Style.SimilarProductTitleLayout>
      <Style.SimilarContainer>
        <Style.ShoesContainer>
          {isLoading && (
            <LoadingSpinner
              width={"100%"}
              text={"상품을 준비하는 중입니다."}
              margin={"100px 0px 0px 0px"}
            />
          )}
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
