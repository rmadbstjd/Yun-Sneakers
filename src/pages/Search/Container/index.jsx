import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useUpdateScroll } from "../../../hooks/useUpdateScroll";
import { searchForProducts } from "../../../api/product";
import { getBrandsName } from "../../../api/product";
import searchStore from "../../../store/searchStore";
import UISearchPage from "../UISearchPage";
const Search = () => {
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { recentKeyword, addRecentKeyword } = searchStore();
  const { scrollPosition } = useUpdateScroll();

  const initPage = query.get("page") || 1;
  const [pages, setPages] = useState(Number(initPage));
  const [showBrand, setShowBrand] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [searchProducts, setSearchProducts] = useState([]);
  const [showSearchedProducts, setShowSearchedProducts] = useState(false);
  const sessionSort = sessionStorage.getItem("sort");
  const sessionBrand = sessionStorage.getItem("brand");
  const sessionPrice = sessionStorage.getItem("price");
  const page = query.get("page") || 1;
  const searchKeyword = query.get("keyword") || "";
  const priceOrder = query.get("priceOrder") || "";
  const [result, setResult] = useState(searchKeyword);
  const [selectedBrands, setSelectedBrands] = useState([]);
  let collectionName = query.get("collectionName") || "";

  const [checkedBrandList, setCheckedBrandList] = useImmer(
    JSON.parse(sessionBrand) || []
  );
  const [checkedPriceList, setCheckedPriceList] = useState(
    JSON.parse(sessionPrice) || sessionBrand || []
  );
  const [checkedSort, setCheckedSort] = useState(sessionSort || "popular");

  const { isLoading, data: products } = useQuery(
    [searchKeyword, checkedSort, collectionName, priceOrder, page],
    () =>
      searchForProducts(
        searchKeyword,
        checkedSort,
        collectionName,
        priceOrder,
        page
      )
  );
  const { data: brands } = useQuery(["brands"], () => getBrandsName());

  const clickToBrand = () => {
    setShowBrand((prev) => !prev);
  };

  const clickToPrice = () => {
    setShowPrice((prev) => !prev);
  };

  const onChecked = (e, title, index) => {
    if (title === "brand") {
      if (e.target.checked) {
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

      if (e.target.checked) {
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
    setShowSearchedProducts(true);
    setResult(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") setShowSearchedProducts(false);
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

  const handleBlur = () => {
    setShowSearchedProducts(false);
  };

  const handleMouseDown = (e) => e.preventDefault();

  const fetch = async (result) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/search/autocompletedproducts`,
      {
        keyword: result,
      }
    );
    const data = response.data;
    setSearchProducts(data.products);

    return;
  };

  const handlePageChange = (pages) => {
    navigate(
      `/search?keyword=${result}&sort=${checkedSort}&collectionName=${collectionName}&priceOrder=${priceOrder}&page=${pages}`
    );
    setPages(pages);
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
      checkedSort === "popular" &&
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
  return (
    <UISearchPage
      searchKeyword={searchKeyword}
      sessionSort={sessionSort}
      collectionName={collectionName}
      priceOrder={priceOrder}
      result={result}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
      handleBlur={handleBlur}
      submitKeyword={submitKeyword}
      clickToBrand={clickToBrand}
      clickToClose={clickToClose}
      clickToPrice={clickToPrice}
      clickToSort={clickToSort}
      showSearchedProducts={showSearchedProducts}
      searchProducts={searchProducts}
      handleMouseDown={handleMouseDown}
      goToDetail={goToDetail}
      scrollPosition={scrollPosition}
      showBrand={showBrand}
      brands={brands}
      checkedBrandList={checkedBrandList}
      onChecked={onChecked}
      showPrice={showPrice}
      checkedPriceList={checkedPriceList}
      products={products}
      checkedSort={checkedSort}
      selectedBrands={selectedBrands}
      closeToBrand={closeToBrand}
      isLoading={isLoading}
      handlePageChange={handlePageChange}
      pages={pages}
    />
  );
};

export default Search;
