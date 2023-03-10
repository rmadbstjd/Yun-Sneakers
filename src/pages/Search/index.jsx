import React, { useState, useEffect, useRef } from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { TbArrowsUpDown } from "react-icons/tb";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import userInfoStore from "../../store/userInfoStore";
import searchStore from "../../store/searchStore";
import ProductLikeCard from "../../components/ProductLikeCard";
import Toggle from "../../components/Toggle";
import Side from "../../components/Side";
import Navbar from "./../../components/common/Navbar/index";
import HorizonLine from "../../components/common/HorizonLine";

import { useImmer } from "use-immer";
const SearchPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { product } = userInfoStore();
  const { sort, initSort, showBar, setShowBar } = searchStore();
  const { recentKeyword, addRecentKeyword } = searchStore();
  const [toggle, setToggle] = useState(false);

  const { data: brands } = useQuery(["brands"], () => product.getBrandsName());
  const [showBrand, setShowBrand] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const sessionSort = sessionStorage.getItem("sort");
  //////////////////////////////////////////////////////////////////////////
  const isMounted = useRef(false);
  const sessionBrand = sessionStorage.getItem("brand");
  const sessionPrice = sessionStorage.getItem("price");
  const [checkedBrandList, setCheckedBrandList] = useImmer(
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

  const closeToBrand = (item) => {
    if (checkedBrandList.includes(item)) {
      setCheckedBrandList(checkedBrandList.filter((el) => el !== item));
    }
  };
  ///////////////////////////////////////////////
  const searchKeyword = query.get("keyword") || "";
  const searchSort = sessionSort || query.get("sort") || "null";
  const priceOrder = query.get("priceOrder") || "";
  const [result, setResult] = useState(searchKeyword);
  const [selectedBrands, setSelectedBrands] = useState([]);
  let collectionName = query.get("collectionName") || "";

  let { data: products } = useQuery(
    [searchKeyword, searchSort, collectionName, priceOrder],
    () =>
      product.searchProducts(
        searchKeyword,
        searchSort,
        collectionName,
        priceOrder
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const submitKeyword = (e) => {
    if (result.trim() === "") {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    navigate(
      `/search?keyword=${result}&sort=${
        sessionSort || sort
      }$collectionName=${collectionName}&priceOrder=${priceOrder}`
    );
    if (!recentKeyword.includes(result)) {
      addRecentKeyword(result);
    }
  };

  const clickToSort = (e) => {
    e.stopPropagation();
    setToggle((prev) => !prev);
  };
  const handleChange = (e) => {
    setResult(e.target.value);
  };
  const clickToClose = () => {
    setResult("");
    navigate("/search");
  };
  useEffect(() => {
    if (searchKeyword === "") setIsShowSearchBar(false);
    else if (searchKeyword !== "") setShowBar(true);
    else setIsShowSearchBar(true);
    setResult(searchKeyword);
    products && initSort(sessionSort);
  }, [searchKeyword, searchSort]);

  useEffect(() => {
    if (collectionName) {
      const test = collectionName.split(",");
      setSelectedBrands([test]);
    } else setSelectedBrands([]);
  }, [collectionName]);

  useEffect(() => {
    if (isMounted.current) {
      sessionStorage.setItem("brand", JSON.stringify(checkedBrandList));
      sessionStorage.setItem("price", JSON.stringify(checkedPriceList));
      navigate(
        `/search?keyword=${searchKeyword}&sort=${
          sessionSort || sort
        }&collectionName=${checkedBrandList}&priceOrder=${checkedPriceList}`
      );
    } else {
      isMounted.current = true;
    }
  }, [checkedBrandList, checkedPriceList]);

  return (
    <div onClick={() => setToggle(false)}>
      <Navbar />
      <Style.Layout>
        <Style.Container>
          <Style.SearchBarLayout>
            {showBar === true ? (
              <Style.SearchContainer isText={false}>
                <Style.SearchContent onSubmit={(e) => submitKeyword(e)}>
                  <Style.InputSearch
                    isResult={true}
                    type="text"
                    value={result}
                    placeholder="브랜드명, 모델명 등"
                    onChange={(e) => handleChange(e)}
                    autoFocus
                  />
                  <GrClose
                    style={{
                      width: "25px",
                      minWidth: "25px",
                      height: "25px",
                      minHeight: "25px",
                      cursor: "pointer",
                      margin: "10px 0px 0px 10px",
                    }}
                    onClick={() => {
                      clickToClose();
                    }}
                  />
                </Style.SearchContent>
                <HorizonLine
                  width={"558px"}
                  border={"3px"}
                  color={"black"}
                ></HorizonLine>
              </Style.SearchContainer>
            ) : (
              <Style.SearchContainer isText={true}>SHOP</Style.SearchContainer>
            )}
          </Style.SearchBarLayout>

          {/*products && products.products[0].length !== 0 ? (
            <Style.SortLayout>
              <Style.SortContent>
                <Style.Sort onClick={clickToSort}>
                  {sessionSort === "new" ? "최신순" : "인기순"}
                </Style.Sort>
                <TbArrowsUpDown
                  style={{
                    marginLeft: "0.2%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={clickToSort}
                />
              </Style.SortContent>

              {toggle && <Toggle setToggle={setToggle} />}
            </Style.SortLayout>
          ) : null*/}

          <Style.Content>
            <div>
              {<Style.Filter>필터</Style.Filter>}
              <Style.SideContainer onClick={clickToBrand}>
                <Style.BrandNavbar>브랜드</Style.BrandNavbar>

                {showBrand === false ? (
                  <AiOutlinePlus style={{ width: "80px" }} />
                ) : (
                  <AiOutlineMinus style={{ width: "80px" }} />
                )}
              </Style.SideContainer>
              {!showBrand && (
                <HorizonLine
                  width={"85%"}
                  border={"1px"}
                  color={"black"}
                  margin={"0px 0px 10% 0px"}
                ></HorizonLine>
              )}
              <Style.BrandContent isShow={showBrand === true ? true : false}>
                {brands &&
                  brands.map((item, index) => (
                    <Style.Item key={index}>
                      <Style.ItemName>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            checkedBrandList.includes(item) ? true : false
                          }
                          value={item}
                          onChange={(e) => onChecked(e, "brand")}
                        />
                        {item}
                      </Style.ItemName>
                    </Style.Item>
                  ))}
                <HorizonLine
                  width={"85%"}
                  border={"1px"}
                  color={"black"}
                  margin={"0px 0px 10% 0px"}
                ></HorizonLine>
              </Style.BrandContent>

              <Style.SideContainer onClick={clickToPrice}>
                <Style.BrandNavbar>가격</Style.BrandNavbar>
                {showPrice === false ? (
                  <AiOutlinePlus style={{ width: "80px" }} />
                ) : (
                  <AiOutlineMinus style={{ width: "80px" }} />
                )}
              </Style.SideContainer>

              {!showPrice && (
                <HorizonLine
                  width={"85%"}
                  border={"1px"}
                  color={"black"}
                  margin={"0px 0px 10% 0px"}
                ></HorizonLine>
              )}
              <Style.BrandContent isShow={showPrice === true ? true : false}>
                {priceInitArr.map((item, index) => (
                  <Style.Item key={index}>
                    <Style.ItemName>
                      {" "}
                      <input
                        type="checkbox"
                        checked={
                          checkedPriceList.includes(`${index + 1}`)
                            ? true
                            : false
                        }
                        value={item}
                        onChange={(e) => onChecked(e, "price", index + 1)}
                      />
                      {item}
                    </Style.ItemName>
                  </Style.Item>
                ))}
                <HorizonLine
                  width={"85%"}
                  border={"1px"}
                  color={"black"}
                  margin={"0px 0px 10% 0px"}
                ></HorizonLine>
              </Style.BrandContent>
            </div>

            <Style.Products>
              <Style.SelectedBrandContainer>
                {selectedBrands[0] &&
                  selectedBrands[0].map((item, index) => (
                    <Style.SelectedBrand key={index}>
                      {item}{" "}
                      <Style.ItemName>
                        <Style.Close
                          onClick={() => {
                            closeToBrand(item);
                          }}
                        >
                          X
                        </Style.Close>
                      </Style.ItemName>
                    </Style.SelectedBrand>
                  ))}
              </Style.SelectedBrandContainer>
              {products && products[0].length !== 0 ? (
                products.map((product) =>
                  product.map((product, index) => (
                    <ProductLikeCard
                      key={index}
                      none={"none"}
                      product={product}
                    ></ProductLikeCard>
                  ))
                )
              ) : (
                <Style.NotFound>
                  검색하신 상품이 존재하지 않습니다.
                </Style.NotFound>
              )}
            </Style.Products>
          </Style.Content>
        </Style.Container>
      </Style.Layout>
    </div>
  );
};

export default SearchPage;
