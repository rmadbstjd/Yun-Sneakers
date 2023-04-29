import React, { useState } from "react";
import ReactModal from "react-modal";
import produce from "immer";
import styles from "./ReviewModal.module.css";
import * as Style from "./styles";
import userInfoStore from "../../../../store/userInfoStore";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Swal from "sweetalert2";

const Modal = ({
  modalIsOpen,
  setModalIsOpen,
  product,
  isReviewed,
  refetch,
  refetch2,
}) => {
  const [star, setStar] = useState([false, false, false, false, false]);
  const [clickIndex, setClickIndex] = useState();
  const [text, setText] = useState("");
  const { myPage } = userInfoStore();

  const clickToStar = (index) => {
    setClickIndex(index);
    if (clickIndex === index) {
      setStar(
        produce(star, (draft) => {
          for (let i = 0; i <= index; i++) {
            draft[i] = false;
          }
        })
      );
      setClickIndex("");
      return;
    }
    setStar(
      produce(star, (draft) => {
        for (let i = 0; i <= index; i++) {
          draft[i] = true;
        }
        for (let i = index + 1; i <= 4; i++) {
          draft[i] = false;
        }
      })
    );
  };

  const handleSetValue = (e) => {
    if (e.target.value.length > 300) setText(text.substring(0, 300));
    else setText(e.target.value);
  };

  const submitReview = () => {
    if (star[0] === false) {
      Swal.fire({
        title: "별점을 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    } else if (text.length < 10) {
      Swal.fire({
        title: "리뷰 내용을 10자 이상 입력해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }

    if (!isReviewed) {
      myPage.addProductReview(
        product.info.image,
        star,
        product.product.count,
        product.product.coupon,
        product.info.price,
        product.product.date,
        product.product.size,
        product.product.productId,
        product.product._id,
        text,
        clickIndex + 1
      );
    } else if (isReviewed) {
      myPage.addProductReview(
        product.info.image,
        star,
        product.product.count,
        product.product.coupon,
        product.info.price,
        product.product.date,
        product.product.size,
        product.product.productId,
        product.product.orderId,
        text,
        clickIndex + 1
      );
    }
    Swal.fire({
      icon: "success",
      title: "성공적으로 리뷰를 작성하였습니다.",
      confirmButtonColor: "black",
    }).then((result) => {
      if (result.isConfirmed) {
        setModalIsOpen(false);
        refetch();
        refetch2();
      }
    });
  };

  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
    >
      <Style.ReviewContainer>
        <Style.ReviewTitle>리뷰 쓰기</Style.ReviewTitle>
        <Style.ProductContent>
          <Style.Img src={product.info.image} alt="상품"></Style.Img>
          <Style.InfoContainer>
            <Style.ProductCategory>
              {product.info.category}
            </Style.ProductCategory>
            <Style.ProductName>{product.info.name}</Style.ProductName>
            <Style.ProductDescription>
              {product.info.description}
              <Style.Size>[사이즈] {product.product.size}</Style.Size>
            </Style.ProductDescription>
          </Style.InfoContainer>
        </Style.ProductContent>
        <Style.HorizonLine></Style.HorizonLine>
        <Style.StarContainer>
          <Style.StarTopText>상품은 어떠셨나요?</Style.StarTopText>
          <Style.StarBotText>
            상품에 대한 별점을 입력해주세요.
          </Style.StarBotText>
          <Style.Star>
            {star.map((item, index) =>
              item === false ? (
                <AiOutlineStar
                  size={35}
                  key={index}
                  color={"gray"}
                  cursor={"pointer"}
                  onClick={() => {
                    clickToStar(index);
                  }}
                />
              ) : (
                <AiFillStar
                  size={35}
                  key={index}
                  color={"yellow"}
                  cursor={"pointer"}
                  onClick={() => {
                    clickToStar(index);
                  }}
                />
              )
            )}
          </Style.Star>
        </Style.StarContainer>
        <Style.HorizonLine></Style.HorizonLine>
        <div>
          <Style.TextArea
            width={"565px"}
            height={"200px"}
            placeholder="정확한 리뷰 작성을 위해 최소 10자 이상을 입력해주세요."
            value={text}
            onChange={(e) => handleSetValue(e)}
          ></Style.TextArea>
          <Style.TextLength>{text.length} / 300</Style.TextLength>
        </div>
        <Style.HorizonLine></Style.HorizonLine>
      </Style.ReviewContainer>
      <Style.BtnContainer>
        <Style.StarBtn
          color={"white"}
          backcolor={"black"}
          border={"black"}
          onClick={() => {
            submitReview();
          }}
        >
          등록하기
        </Style.StarBtn>
        <Style.StarBtn
          color={"#303033"}
          backcolor={"white"}
          border={"gray"}
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          취소하기
        </Style.StarBtn>
      </Style.BtnContainer>
    </ReactModal>
  );
};

export default Modal;
