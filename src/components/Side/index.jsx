import React, { useState, useEffect, useRef } from "react";
import styles from "./Side.module.css";
import { useQuery } from "@tanstack/react-query";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
const Side = () => {
  const isMounted = useRef(false);
  const [query] = useSearchParams();
  const { product, sort } = useStore();
  const {
    isLoading,
    error,
    data: brands,
  } = useQuery(["test"], () => product.getBrandsName());
  const [showBrand, setShowBrand] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const sessionSort = sessionStorage.getItem("sort");
  const sessionBrand = sessionStorage.getItem("brand");
  const sessionPrice = sessionStorage.getItem("price");

  const searchQuery = query.get("keyword") || "null";
  const [checkedBrandList, setCheckedBrandList] = useState(
    JSON.parse(sessionBrand) || []
  );
  const [checkedPriceList, setCheckedPriceList] = useState(
    JSON.parse(sessionPrice) || sessionBrand || []
  );
  const priceInitArr = [
    "20만원 이하",
    "20만원 - 40만원 이하",
    "40만원 - 60만원 이하",
    "60만원 이상",
  ];

  const navigate = useNavigate();

  const clickToBrand = () => {
    setShowBrand((prev) => !prev);
  };
  const clickToPrice = () => {
    setShowPrice((prev) => !prev);
  };
  const onChecked = (e, title, index) => {
    if (title === "brand") {
      if (e.target.checked === true) {
        setCheckedBrandList([...checkedBrandList, e.target.value]);
      } else {
        setCheckedBrandList(
          checkedBrandList.filter((el) => el !== e.target.value)
        );
      }
    }
    if (title === "price") {
      if (checkedPriceList[0] === "0") {
        setCheckedPriceList(checkedPriceList.filter((el) => el === "0"));
      }

      if (e.target.checked === true) {
        setCheckedPriceList([...checkedPriceList, `${index}`]);
      } else {
        setCheckedPriceList(checkedPriceList.filter((el) => el !== `${index}`));
      }
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      sessionStorage.setItem("brand", JSON.stringify(checkedBrandList));
      sessionStorage.setItem("price", JSON.stringify(checkedPriceList));
      navigate(
        `/search?keyword=${searchQuery}&sort=${
          sessionSort || sort
        }&collectionName=${checkedBrandList}&priceOrder=${checkedPriceList}`
      );
    } else {
      isMounted.current = true;
    }
  }, [checkedBrandList, checkedPriceList]);
  return (
    <div className={styles.container}>
      {<div className={styles.filter}>필터</div>}
      <div className={styles.brandContainer} onClick={clickToBrand}>
        <div className={styles.brandNavbar}>브랜드</div>

        {showBrand === false ? (
          <AiOutlinePlus className={styles.plus} />
        ) : (
          <AiOutlineMinus className={styles.plus} />
        )}
      </div>
      {!showBrand && <div className={styles.horizonLine2}></div>}
      <div
        className={
          showBrand === true
            ? styles.brandContentIsBlock
            : styles.brandContentIsNone
        }
      >
        {brands &&
          brands.map((item, index) => (
            <div className={styles.item} key={index}>
              <label className={styles.itemName}>
                {" "}
                <input
                  type="checkbox"
                  checked={checkedBrandList.includes(item) ? true : false}
                  value={item}
                  onChange={(e) => onChecked(e, "brand")}
                />
                {item}
              </label>
            </div>
          ))}
        <div className={styles.horizonLine2}></div>
      </div>

      <div className={styles.priceContainer} onClick={clickToPrice}>
        <div className={styles.brandNavbar}>가격</div>
        {showPrice === false ? (
          <AiOutlinePlus className={styles.plus} />
        ) : (
          <AiOutlineMinus className={styles.plus} />
        )}
      </div>

      {!showPrice && <div className={styles.horizonLine2}></div>}
      <div
        className={
          showPrice === true
            ? styles.brandContentIsBlock
            : styles.brandContentIsNone
        }
      >
        {priceInitArr.map((item, index) => (
          <div className={styles.item} key={index}>
            <label className={styles.itemName}>
              {" "}
              <input
                type="checkbox"
                checked={
                  checkedPriceList.includes(`${index + 1}`) ? true : false
                }
                value={item}
                onChange={(e) => onChecked(e, "price", index + 1)}
              />
              {item}
            </label>
          </div>
        ))}
        <div className={styles.horizonLine2}></div>
      </div>
    </div>
  );
};

export default Side;
