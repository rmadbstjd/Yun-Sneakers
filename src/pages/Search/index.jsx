import React, { useState, useEffect, useRef } from "react";
import * as Style from "./styles";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import userInfoStore from "../../store/userInfoStore";
import searchStore from "../../store/searchStore";
import ProductLikeCard from "../../components/ProductLikeCard";
import Navbar from "./../../components/common/Navbar/index";
import HorizonLine from "../../components/common/HorizonLine";
import convertToPrice from "../../hooks/convertToPrice";
import { useImmer } from "use-immer";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Pagination from "../../components/common/Pagination";
const SearchPage = () => {
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchProducts, setSearchProducts] = useState([]);
  const [showSearchedProducts, setShowSearchedProducts] = useState(false);
  const [query] = useSearchParams();
  const { product } = userInfoStore();
  const { recentKeyword, addRecentKeyword } = searchStore();
  const { data: brands } = useQuery(["brands"], () => product.getBrandsName());
  const [showBrand, setShowBrand] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const sessionSort = sessionStorage.getItem("sort");
  const sessionBrand = sessionStorage.getItem("brand");
  const sessionPrice = sessionStorage.getItem("price");

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const [checkedBrandList, setCheckedBrandList] = useImmer(
    JSON.parse(sessionBrand) || []
  );
  const [checkedPriceList, setCheckedPriceList] = useState(
    JSON.parse(sessionPrice) || sessionBrand || []
  );
  const [checkedSort, setCheckedSort] = useState(sessionSort || "0");
  const priceInitArr = [
    "20만원 이하",
    "20만원 - 40만원 이하",
    "40만원 - 60만원 이하",
    "60만원 이상",
  ];
  const sortArr = [
    { id: "0", title: "인기순" },
    { id: "1", title: "최신순" },
    { id: "2", title: "높은 가격순" },
    { id: "3", title: "낮은 가격순" },
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
  const page = query.get("page") || 1;

  const searchKeyword = query.get("keyword") || "";
  const priceOrder = query.get("priceOrder") || "";
  const [result, setResult] = useState(searchKeyword);
  const [selectedBrands, setSelectedBrands] = useState([]);
  let collectionName = query.get("collectionName") || "";

  const { isLoading, data: products } = useQuery(
    [searchKeyword, checkedSort, collectionName, priceOrder, page],
    () =>
      product.searchProducts(
        searchKeyword,
        checkedSort,
        collectionName,
        priceOrder,
        page
      )
  );

  const submitKeyword = (e) => {
    if (result.trim() === "") {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    navigate(
      `/search?keyword=${result}&sort=${checkedSort}&collectionName=${collectionName}&priceOrder=${priceOrder}&page=${page}`
    );

    if (!recentKeyword.includes(result)) {
      addRecentKeyword(result);
    }
  };

  const handleChange = (e) => {
    setResult(e.target.value);
  };

  const clickToClose = () => {
    setResult("");
    if (collectionName) {
      navigate(
        `/search?&sort=${checkedSort}&collectionName=${collectionName}&priceOrder=${priceOrder}&page=${page}`
      );
    }
    if (!collectionName) {
      if (priceOrder) {
        navigate(
          `/search?&sort=${checkedSort}&collectionName=${collectionName}&priceOrder=${priceOrder}&page=${page}`
        );
      } else {
        navigate("/search");
      }
    }
  };

  const clickToSort = (item) => {
    setCheckedSort(item.id);
  };

  const goToDetail = (item) => {
    navigate(`/products/${item.id}`);
  };
  const handleFocus = () => {
    setShowSearchedProducts(true);
  };

  const handleBlur = () => {
    setShowSearchedProducts(false);
  };
  const handleMouseDown = (e) => e.preventDefault();

  const fetch = async (result) => {
    const response = await axios.post(
      "http://localhost:3000/api/search/autocompleted",
      {
        keyword: result,
      }
    );
    const data = response.data;
    setSearchProducts(data.products);

    return;
  };

  useEffect(() => {
    if (result) {
      if (result.trim() === "") return;
      result.trim();
      fetch(result);
    } else {
      setSearchProducts([]);
    }
  }, [result]);

  useEffect(() => {
    if (
      searchKeyword === "" &&
      checkedSort === "0" &&
      collectionName === "" &&
      priceOrder === "" &&
      page === ""
    )
      navigate("/search");

    if (collectionName) {
      const name = collectionName.split(",");
      setSelectedBrands([name]);
    } else setSelectedBrands([]);

    setResult(searchKeyword);
  }, [searchKeyword, checkedSort, collectionName, products, priceOrder]);

  useEffect(() => {
    if (isMounted.current) {
      sessionStorage.setItem("brand", JSON.stringify(checkedBrandList));
      sessionStorage.setItem("price", JSON.stringify(checkedPriceList));
      sessionStorage.setItem("sort", checkedSort);

      navigate(
        `/search?keyword=${searchKeyword}&sort=${checkedSort}&collectionName=${checkedBrandList}&priceOrder=${checkedPriceList}&page=${page}`
      );
    } else {
      isMounted.current = true;
    }
  }, [checkedBrandList, checkedPriceList, checkedSort]);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  return (
    <div>
      <Navbar
        searchKeyword={searchKeyword}
        sort={sessionSort}
        collectionName={collectionName}
        priceOrder={priceOrder}
      />
      <Style.Layout>
        <Style.Container>
          <Style.SearchBarLayout>
            <Style.SearchContainer isText={false}>
              <Style.SearchContent onSubmit={(e) => submitKeyword(e)}>
                <Style.InputSearch
                  type="text"
                  value={result}
                  placeholder="브랜드명, 모델명 등"
                  onChange={(e) => handleChange(e)}
                  onFocus={() => handleFocus()}
                  onBlur={() => handleBlur()}
                />
                <AiFillCloseCircle
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    margin: "10px 0px 0px 10px",
                    color: "#F4F4F4",
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
          </Style.SearchBarLayout>
          {showSearchedProducts === true ? (
            searchProducts.length !== 0 ? (
              <Style.ProductsLayout>
                {searchProducts.map((item) => (
                  <div key={item.name}>
                    <Style.ProductContent
                      onMouseDown={handleMouseDown}
                      onClick={() => {
                        goToDetail(item);
                      }}
                    >
                      <Style.ProductImage src={item.image}></Style.ProductImage>
                      <Style.ProductInfo>
                        <Style.ProductDesc>
                          {item.description}
                        </Style.ProductDesc>
                        <Style.ProductTitle>{item.name}</Style.ProductTitle>
                      </Style.ProductInfo>
                    </Style.ProductContent>
                  </div>
                ))}
              </Style.ProductsLayout>
            ) : result && result.length !== 0 ? (
              <Style.NullTextLayout>
                <Style.NullText>
                  검색하신 상품이 존재하지 않습니다.
                </Style.NullText>
              </Style.NullTextLayout>
            ) : null
          ) : null}
          <Style.Content>
            <Style.SideLayout isScrolled={scrollPosition > 100 ? true : false}>
              <Style.Filter>필터</Style.Filter>

              <Style.SideContainer onClick={clickToBrand}>
                <Style.BrandNavbar>브랜드</Style.BrandNavbar>

                {showBrand === false ? (
                  <AiOutlinePlus style={{ width: "20px" }} />
                ) : (
                  <AiOutlineMinus style={{ width: "20px" }} />
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
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "8px",
                          }}
                        />
                        <Style.Span>{item}</Style.Span>
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
                  <AiOutlinePlus style={{ width: "20px" }} />
                ) : (
                  <AiOutlineMinus style={{ width: "20px" }} />
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
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                        }}
                      />
                      <Style.Span>{item}</Style.Span>
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
            </Style.SideLayout>

            <Style.Products>
              <Style.SortLayout>
                <Style.ProductsCount>
                  상품{" "}
                  {products && products.products.length !== 0
                    ? convertToPrice(products.count)
                    : 0}
                </Style.ProductsCount>
                <Style.SortContainer>
                  {sortArr.map((item) => (
                    <Style.SortContent
                      isClicked={checkedSort === item.id}
                      width={item.length}
                      key={item.id}
                      onClick={() => {
                        clickToSort(item);
                      }}
                    >
                      {item.title}
                    </Style.SortContent>
                  ))}
                </Style.SortContainer>
              </Style.SortLayout>
              {selectedBrands[0] && (
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
              )}
              <Style.Cards>
                {isLoading && (
                  <LoadingSpinner
                    width={"80%"}
                    margin={"100px 0px 0px 0px"}
                    text={"상품을 준비하는 중입니다."}
                  />
                )}
                {!isLoading && products && products.products.length === 0 ? (
                  <Style.NotFound>
                    검색하신 상품이 존재하지 않습니다.
                  </Style.NotFound>
                ) : null}
                {products && products.products.length !== 0
                  ? products.products.map((item, index) => (
                      <ProductLikeCard
                        key={index}
                        none={"none"}
                        product={item}
                      ></ProductLikeCard>
                    ))
                  : null}
              </Style.Cards>
            </Style.Products>
          </Style.Content>
          <Pagination
            result={result}
            checkedSort={checkedSort}
            collectionName={collectionName}
            priceOrder={priceOrder}
            count={products && products.count}
          ></Pagination>
        </Style.Container>
      </Style.Layout>
    </div>
  );
};

export default SearchPage;
