import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import HorizonLine from "../../../../components/common/HorizonLine";
import Modal from "../../../../components/common/Modal/UIModal";
import SizeModal from "../../../../components/common/Modal/Conatiner/Size";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import Button from "../../../../components/common/button";
import ProductDetailFooter from "../../DetailFooter";
import Reviews from "../../Reviews/Container";
import SimilarProducts from "../../SimilarProducts";
import QnAForm from "../../QnA/Container";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { CgArrowDownO } from "@react-icons/all-files/cg/CgArrowDownO";
import { BsHeart } from "@react-icons/all-files/bs/BsHeart";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { Link } from "react-scroll";
import convertStringToNumber from "../../../../utils/convertStringToNumber";

const UIDetailPage = ({
  productInfo,
  star,
  review,
  productReviews,
  showSize,
  selectSize,
  sizeModalShow,
  setSizeModalShow,
  cartModalShow,
  modalIsOpen,
  navigate,
  clickToCart,
  token,
  clickToLike,
  isLiked,
  category,
  isLoading,
  similarProducts,
}) => {
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
                <Style.Text>장바구니에 추가되었습니다.</Style.Text>
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
              {isLiked === false ? (
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
              ) : isLiked ? (
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
        <QnAForm />
        <ProductDetailFooter></ProductDetailFooter>
        <div id="review">
          <Reviews productReviews={productReviews} />
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
              <SimilarProducts key={item.id} products={item} width={"11vw"} />
            ))}
          </Style.ShoesContainer>
        </Style.SimilarContainer>
      </Style.Container2>
    </>
  );
};

export default UIDetailPage;
