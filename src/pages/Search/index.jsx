import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { TbArrowsUpDown } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import useStore from "../../store";
import styles from "./SearchPage.module.css";
import ProductLikeCard from "../../components/ProductLikeCard";
import Toggle from "../../components/Toggle";
import Side from "../../components/Side";
import Filter from "../../components/Filter";
const SearchPage = () => {
  const navigate = useNavigate();
  const { product, sort, initSort, recentKeyword, addRecentKeyword } =
    useStore();
  const [query] = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [show, setShow] = useState(true);
  const sessionSort = sessionStorage.getItem("sort");
  const searchQuery = query.get("keyword") || "null";
  const searchSort = sessionSort || query.get("sort") || "null";
  const priceOrder = query.get("priceOrder") || undefined;
  const [result, setResult] = useState(searchQuery);
  let collectionName = query.get("collectionName") || undefined;
  let {
    error,
    isLoading,
    data: products,
  } = useQuery([searchQuery, searchSort, collectionName, priceOrder], () =>
    product.searchProducts(searchQuery, searchSort, collectionName, priceOrder)
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
  const closeSearch = () => {
    setResult("");
  };
  useEffect(() => {
    setResult(searchQuery);
    products && initSort(sessionSort);
  }, [searchQuery, searchSort]);

  const clickToSort = (e) => {
    e.stopPropagation();
    setToggle((prev) => !prev);
  };
  const handleChange = (e) => {
    setResult(e.target.value);
  };
  const clickHamburger = () => {
    setHamburger((prev) => !prev);
    setShow((prev) => !prev);
  };

  return (
    <div className={styles.container} onClick={() => setToggle(false)}>
      {show && (
        <div className={styles.productsContainer}>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <div className={styles.contentContainer}>
            <div className={styles.searchContainer}>
              <form
                className={styles.searchContent}
                onSubmit={(e) => submitKeyword(e)}
              >
                <input
                  type="text"
                  value={result}
                  placeholder="브랜드명, 모델명"
                  onChange={(e) => handleChange(e)}
                  className={styles.searchBar}
                  autoFocus
                />
                <GrClose className={styles.close} onClick={closeSearch} />
              </form>
              <div className={styles.horizonLine}></div>
            </div>
          </div>

          {products && products.products[0].length !== 0 ? (
            <div className={styles.sortContainer}>
              <GiHamburgerMenu
                className={styles.hamburger}
                onClick={clickHamburger}
              />

              <div className={styles.test}>
                <div className={styles.sort} onClick={clickToSort}>
                  {sessionSort === "new" ? "최신순" : "인기순"}
                </div>
                <TbArrowsUpDown
                  className={styles.toggleIcon}
                  onClick={clickToSort}
                />
              </div>

              {toggle && <Toggle setToggle={setToggle} />}
            </div>
          ) : null}

          <div className={styles.content}>
            <Side className={styles.side} />
            <div className={styles.products}>
              {products && products.products[0].length !== 0 ? (
                products.products.map((product, index) =>
                  product.map((product, index) => (
                    <ProductLikeCard
                      none={"none"}
                      product={product}
                      key={index}
                    />
                  ))
                )
              ) : (
                <div className={styles.notFound}>
                  검색하신 상품이 존재하지 않습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {hamburger && <Filter setShow={setShow} setHamburger={setHamburger} />}
    </div>
  );
};

export default SearchPage;
