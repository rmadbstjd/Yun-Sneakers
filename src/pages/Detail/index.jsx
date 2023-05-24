import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import cartStore from "../../store/cartStore";
import productStore from "../../store/productStore";
import { CgArrowDownO } from "@react-icons/all-files/cg/CgArrowDownO";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BsHeart } from "@react-icons/all-files/bs/BsHeart";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import HorizonLine from "../../components/common/HorizonLine";
import SizeModal from "../../components/common/Modal/Children/Size";
import Modal from "../../components/common/Modal/Layout";
import SimilarProducts from "./SimilarProducts";
import ProductReviews from "./Reviews";
import Swal from "sweetalert2";
import Navbar from "./../../components/common/Navbar/index";
import convertStringToNumber from "../../utils/convertStringToNumber";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ProductDetailFooter from "./DetailFooter";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { Link } from "react-scroll";
import QnAForm from "../../components/QnAForm";
import NotFound from "../NotFound";
import getProductReviews from "../../api/review";
import { addUserCart, getUserCarts } from "../../api/cart";
import { pushLike, isLike } from "../../api/like";
import { getSimilarProducts } from "../../api/product";
import { getProductInfo } from "../../api/product";
import Button from "../../components/common/button";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { review, userId } = userInfoStore();
  const { plusCartCount } = cartStore();
  const token = localStorage.getItem("accessToken");
  const { selectSize, setInitSize } = productStore();

  const { data: productInfo } = useQuery([id], () => getProductInfo(id));

  const { refetch: cartRefetch } = useQuery(["cart", userId], () =>
    getUserCarts()
  );

  const products = productInfo?.product;
  const category = productInfo?.product?.category[0];
  const productId = productInfo?.product?.id;

  const { isLoading, data: similarProducts } = useQuery(
    ["similar", id],
    () => getSimilarProducts(category, id),
    { refetchOnMount: "alaways", enabled: !!category }
  );

  const { data: isLiked, refetch } = useQuery(
    ["isLiked", id],
    () => isLike(productId),
    { enabled: !!productId }
  );

  const { data: productReviews } = useQuery(
    ["review", id],
    () => getProductReviews(id),
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
    if (!token) {
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
    const isSubmit = await addUserCart(products, selectSize);
    cartRefetch();
    if (!isSubmit?.success) return;
    plusCartCount(1);
  };

  const clickToLike = async () => {
    if (!token) navigate("/login");
    await pushLike(productInfo.product.id, userId);
    refetch();
  };

  useEffect(() => {
    setInitSize();
  }, []);

  useEffect(() => {
    if (productReviews) {
      if (productReviews.count === 0) {
        setRate(0);
        return;
      }

      for (let i = 0; i < productReviews.count; i++) {
        setRate((prev) => prev + productReviews?.reviews[i]?.rate);
      }
      setRate((prev) => (prev / productReviews?.count).toFixed(0));
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
  if (productInfo === "error") {
    return <NotFound />;
  }

  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.ProductContainer>
          <Style.ImageLayout>
            <Style.Image src={productInfo?.product?.image} />
          </Style.ImageLayout>

          <Style.ProductInfoContainer>
            <HorizonLine width={"100%"} border={"3px"} color={"black"} />
            <Style.Category>{productInfo?.product?.category[0]}</Style.Category>
            <Style.Description>
              {productInfo?.product?.description}
            </Style.Description>
            <div style={{ display: "flex", margin: "5px 0px 0px 0px" }}>
              {" "}
              <Style.Star>
                {star.map((item, index) =>
                  !item ? (
                    <AiOutlineStar size={15} key={index} color={"gray"} />
                  ) : (
                    <AiFillStar size={15} key={index} color={"yellow"} />
                  )
                )}
                {review?.userId}
              </Style.Star>
              {productReviews && (
                <Style.ReviewCount>
                  <Link to="review" spy={true} smooth={true}>
                    {productReviews.count}개 리뷰 보기
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
                    <CgArrowDownO size={20} />
                  </Style.ShowSizeCircle>
                </Style.Size>
                {sizeModalShow && (
                  <Modal
                    width={"400px"}
                    height={"400px"}
                    isOpen={true}
                    modalIsOpen={sizeModalShow}
                    setModalIsOpen={setSizeModalShow}
                    children={
                      <SizeModal
                        isOpen={true}
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setSizeModalShow}
                        size={productInfo?.product.size}
                      />
                    }
                  ></Modal>
                )}
              </Style.SizeContainer>
              <HorizonLine width={"100%"} border={"1px"} color={"gray"} />
            </div>
            <Style.Price>
              {productInfo?.product &&
                convertStringToNumber(productInfo?.product?.price)}
              원
            </Style.Price>
            {cartModalShow && (
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
            )}
            <Style.AddBtnContainer>
              <Button
                style={{
                  border: "solid gray 0px",
                  width: "88%",
                  height: "50px",
                  borderRadius: "10px",
                  color: "white",
                  hoverBackground: "black",
                  hoverColor: "white",
                  background: "#bcbcbc",
                  fontSize: "20px",
                  lineHeight: "250%",
                  margin: "-10px 0px 0px 0px",

                  transition: "all 0.8s",
                }}
                isShow={true}
                onClick={clickToCart}
              >
                장바구니에 추가
              </Button>
              {!token ? (
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
              {isLiked?.result === false ? (
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
              ) : isLiked?.result ? (
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
      <Style.Container2>
        {" "}
        <QnAForm></QnAForm>
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
            {similarProducts?.map((item) => (
              <SimilarProducts key={item.id} products={item} />
            ))}
          </Style.ShoesContainer>
        </Style.SimilarContainer>
      </Style.Container2>
    </>
  );
};

export default ProductDetail;
