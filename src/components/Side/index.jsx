import React, { useState, useEffect, useRef } from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import userInfoStore from "../../store/userInfoStore";
import searchStore from "../../store/searchStore";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
const Side = () => {
  const isMounted = useRef(false);
  const [query] = useSearchParams();
  const { product } = userInfoStore();
  const { sort } = searchStore();
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
    <div>
      {<Style.Filter>필터</Style.Filter>}
      <Style.Container onClick={clickToBrand}>
        <Style.BrandNavbar>브랜드</Style.BrandNavbar>

        {showBrand === false ? (
          <AiOutlinePlus style={{ width: "80px" }} />
        ) : (
          <AiOutlineMinus style={{ width: "80px" }} />
        )}
      </Style.Container>
      {!showBrand && <Style.HorizonLine></Style.HorizonLine>}
      <Style.BrandContent isShow={showBrand === true ? true : false}>
        {brands &&
          brands.map((item, index) => (
            <Style.Item key={index}>
              <Style.ItemName>
                {" "}
                <input
                  type="checkbox"
                  checked={checkedBrandList.includes(item) ? true : false}
                  value={item}
                  onChange={(e) => onChecked(e, "brand")}
                />
                {item}
              </Style.ItemName>
            </Style.Item>
          ))}
        <Style.HorizonLine></Style.HorizonLine>
      </Style.BrandContent>

      <Style.Container onClick={clickToPrice}>
        <Style.BrandNavbar>가격</Style.BrandNavbar>
        {showPrice === false ? (
          <AiOutlinePlus style={{ width: "80px" }} />
        ) : (
          <AiOutlineMinus style={{ width: "80px" }} />
        )}
      </Style.Container>

      {!showPrice && <Style.HorizonLine></Style.HorizonLine>}
      <Style.BrandContent isShow={showPrice === true ? true : false}>
        {priceInitArr.map((item, index) => (
          <Style.Item key={index}>
            <Style.ItemName>
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
            </Style.ItemName>
          </Style.Item>
        ))}
        <Style.HorizonLine></Style.HorizonLine>
      </Style.BrandContent>
    </div>
  );
};

export default Side;
