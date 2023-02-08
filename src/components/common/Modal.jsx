import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import produce from "immer";
import styles from "./css/Modal.module.css";
import useStore from "../../store";
import AddShip from "../AddShip";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Swal from "sweetalert2";
const Modal = ({
  modalIsOpen,
  setModalIsOpen,
  type,
  size,
  setShowModal,
  submitBtn,
  product,
}) => {
  const [sizes, setSizes] = useState([]);
  const [star, setStar] = useState([false, false, false, false, false]);
  const [clickIndex, setClickIndex] = useState();
  const [text, setText] = useState("");

  const { setSize } = useStore();
  const closeShow = () => {
    setModalIsOpen((prev) => !prev);
  };
  const clickSize = (item) => {
    setSize(item);
    setModalIsOpen((prev) => !prev);
  };
  const clickToStar = (index) => {
    setClickIndex(index);
    if (clickIndex === index) {
      console.log("이꼬르", index);
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
    setText(e.target.value);
  };
  const submitReview = () => {
    if (star[0] === false) {
      Swal.fire({
        title: "별점을 매겨주세요.",
        confirmButtonColor: "black",
      });
    } else if (text.length < 10) {
      Swal.fire({
        title: "리뷰 내용을 10자 이상 입력해주세요.",
        confirmButtonColor: "black",
      });
    }
  };
  useEffect(() => {
    size && setSizes(size.split(","));
    console.log("Star", star);
    if (text.length === 10) {
      console.log("10개");
    }
  }, [size, star, text]);
  console.log("product", product);
  if (type === "size") {
    return (
      <ReactModal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <div className={styles.sizeContainer}>
          <div className={styles.sizeContainer}>
            <div className={styles.name}>Size</div>
            <div className={styles.sizeContainer}>
              {sizes &&
                sizes.map((item) => (
                  <div
                    onClick={() => {
                      clickSize(item);
                    }}
                    className={styles.sizeBox}
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>

          <button className={styles.close} onClick={closeShow}>
            X
          </button>
        </div>
      </ReactModal>
    );
  } else if (type === "ship") {
    return (
      <ReactModal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <div className={styles.addressContainer}>
          <div className={styles.addressContent}>
            <AddShip />
            <div className={styles.btnContainer}>
              <div
                className={styles.Btn}
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                취소
              </div>
              <div
                className={styles.Btn}
                onClick={() => {
                  submitBtn();
                }}
              >
                저장
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  } else if (type === "review") {
    return (
      <ReactModal
        className={styles.reviewModal}
        overlayClassName={styles.reviewOverlay}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <div className={styles.reviewContainer}>
          <div className={styles.reviewTitle}>리뷰 쓰기</div>
          <div className={styles.productContent}>
            <img className={styles.img} src={product.info.image}></img>
            <div className={styles.infoContainer}>
              <div className={styles.productCategory}>
                {product.info.category}
              </div>
              <div className={styles.productName}>{product.info.name}</div>
              <div className={styles.productDescription}>
                {product.info.description}
              </div>
              <div>[사이즈] {product.product.size}</div>
            </div>
          </div>
          <div className={styles.horizonLine}></div>
          <div className={styles.starContainer}>
            <div className={styles.starText1}>상품은 어떠셨나요?</div>
            <div className={styles.starText2}>
              상품에 대한 별점을 매겨주세요.
            </div>
            <div className={styles.star}>
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
            </div>
          </div>
          <div className={styles.horizonLine}></div>
          <div>
            <textarea
              placeholder="최소 10자 이상을 입력해주세요."
              value={text}
              onChange={(e) => handleSetValue(e)}
            ></textarea>
          </div>
          <div className={styles.horizonLine}></div>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btn1} onClick={submitReview}>
            등록하기
          </div>
          <div
            className={styles.btn2}
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            취소하기
          </div>
        </div>
      </ReactModal>
    );
  }
};

export default Modal;
