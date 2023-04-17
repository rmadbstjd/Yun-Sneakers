import React, { useState, useEffect } from "react";
import styles from "./InputProduct.module.css";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import userInfoStore from "../../store/userInfoStore";
import { uploadImage } from "../../api/upload";
import Navbar from "../common/Navbar";
import convertToPrice from "../../hooks/convertToPrice";
import Swal from "sweetalert2";
const InputProduct = ({ title, type, productInfo }) => {
  const { product } = userInfoStore();
  const [newProducts, setNewProducts] = useImmer({
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  });

  const [file, setFile] = useState("");
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { files } = e.target;
    setFile(files && files[0]);
  };

  const onSubmit = async (e) => {
    if (!file) {
      if (type === "수정") {
        let url = productInfo.image;
        product.editProduct(newProducts, url, productInfo.product.id);
      } else {
        setCount(1);
        const url = await uploadImage(file);
        product.addProduct(newProducts, url);
      }
    } else if (file) {
      const url = await uploadImage(file);
      setCount(1);
      if (type === "수정") {
        product.editProduct(newProducts, url, productInfo.product.id);
      } else {
        product.addProduct(newProducts, url);
      }
    }
    Swal.fire({
      icon: "success",
      title: "성공적으로 상품을 수정하였습니다.",
      confirmButtonColor: "black",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/manage");
      }
    });
  };
  const onCancel = () => {
    setCount(0);
    navigate("/manage");
  };
  const onChangeProduct = (e, column) => {
    const row = e.target.value;
    setNewProducts((product) => {
      product[column] = row;
    });
  };

  useEffect(() => {
    if (productInfo) {
      setNewProducts((product) => {
        product["url"] = productInfo.product.image;
        product["price"] = convertToPrice(productInfo.product.price);
        product["title"] = productInfo.product.name;
        product["size"] = productInfo.product.size;
        product["description"] = productInfo.product.description;
        product["category"] = productInfo.product.category;
      });
    }
  }, [productInfo]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.btnContainer}>
            <div>{title}</div>

            <div>
              <button onClick={onSubmit} className={styles.addBtn}>
                {type}
              </button>
              <button onClick={onCancel} className={styles.addBtn}>
                취소
              </button>
            </div>
          </div>
          <div className={styles.imgContainer}>
            {file && (
              <img className={styles.img} src={URL.createObjectURL(file)}></img>
            )}
            {!file && newProducts && (
              <img className={styles.img} src={newProducts.url}></img>
            )}
          </div>
          <div className={styles.form1}>
            <div>
              <input
                value={newProducts.image}
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                name="file"
                required
                onChange={onChange}
              ></input>
            </div>
          </div>
          <div className={styles.form}>
            <input
              value={newProducts.title}
              type="text"
              placeholder={
                count === 0
                  ? "상품명"
                  : newProducts.title === true
                  ? "상품명"
                  : "상품명을 입력해주세요."
              }
              onChange={(e) => onChangeProduct(e, "title")}
              className={
                count === 0
                  ? styles.input
                  : newProducts.title === true
                  ? styles.input
                  : styles.input2
              }
            ></input>
          </div>
          <div className={styles.form}>
            <input
              value={newProducts.price}
              type="text"
              placeholder={
                count === 0
                  ? "가격"
                  : newProducts.price === true
                  ? "가격"
                  : "가격을 입력해주세요."
              }
              onChange={(e) => onChangeProduct(e, "price")}
              className={
                count === 0
                  ? styles.input
                  : newProducts.price === true
                  ? styles.input
                  : styles.input2
              }
            ></input>
          </div>
          <div className={styles.form}>
            <input
              value={newProducts.category}
              type="text"
              placeholder={
                count === 0
                  ? "카테고리 ex)나이키,NIKE"
                  : newProducts.category === true
                  ? "카테고리 ex)나이키,NIKE"
                  : "카테고리를 입력해주세요.ex)나이키,NIKE"
              }
              onChange={(e) => onChangeProduct(e, "category")}
              className={
                count === 0
                  ? styles.input
                  : newProducts.category === true
                  ? styles.input
                  : styles.input2
              }
            ></input>
          </div>
          <div className={styles.form}>
            <input
              type="text"
              value={newProducts.description}
              placeholder={
                count === 0
                  ? "설명"
                  : newProducts.description === true
                  ? "설명"
                  : "설명을 입력해주세요."
              }
              onChange={(e) => onChangeProduct(e, "description")}
              className={
                count === 0
                  ? styles.input
                  : newProducts.description === true
                  ? styles.input
                  : styles.input2
              }
            ></input>
          </div>
          <div className={styles.form}>
            <input
              value={newProducts.size}
              type="text"
              //placeholder="사이즈(,로 구분해주세요)"
              placeholder={
                count === 0
                  ? '"사이즈(쉼표로 구분해주세요)"'
                  : newProducts.size === true
                  ? '"사이즈(쉼표로 구분해주세요)"'
                  : "사이즈를 입력해주세요"
              }
              onChange={(e) => onChangeProduct(e, "size")}
              className={
                count === 0
                  ? styles.input
                  : newProducts.price === true
                  ? styles.input
                  : styles.input2
              }
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputProduct;
