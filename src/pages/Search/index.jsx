import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { TbArrowsUpDown } from "react-icons/tb";
import userInfoStore from "../../store/userInfoStore";
import searchStore from "../../store/searchStore";
import ProductLikeCard from "../../components/ProductLikeCard";
import Toggle from "../../components/Toggle";
import Side from "../../components/Side";
import Navbar from "./../../components/common/Navbar/index";
import * as Style from "./styles";
const SearchPage = () => {
  const navigate = useNavigate(); //ok
  const { product } = userInfoStore(); // ok
  const { sort, initSort } = searchStore(); //ok
  const { recentKeyword, addRecentKeyword } = searchStore(); // ok
  const [query] = useSearchParams(); //ok
  const [toggle, setToggle] = useState(false); // ok 최신순 인기순 토글 (가격순도 있으면 좋겠다)
  const [isShowSearchBar, setIsShowSearchBar] = useState(false); //전체 상품 보여주기 이건 수정 필요
  const sessionSort = sessionStorage.getItem("sort"); //최신순인지 인기순인지
  const searchQuery = query.get("keyword") || "null"; // query의 keyword 부분
  const searchSort = sessionSort || query.get("sort") || "null"; //query의 sort부분
  const priceOrder = query.get("priceOrder") || undefined; //query의 priceOrder부분
  const [result, setResult] = useState(searchQuery); // 검색창 키워드 부분인듯?
  let collectionName = query.get("collectionName") || undefined; //collection 네임
  let { data: products } = useQuery(
    [searchQuery, searchSort, collectionName, priceOrder],
    () =>
      product.searchProducts(
        searchQuery,
        searchSort,
        collectionName,
        priceOrder
      )
  ); //searcqhQuery, searchSort, collectionName, prcieOrder에 따라 받아오는 상품들....

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
    if (searchQuery === "null") setIsShowSearchBar(false);
    else setIsShowSearchBar(true);
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
  products && console.log("products", products);
  return (
    <>
      <Navbar />
      <Style.Container onClick={() => setToggle(false)}>
        <Style.ProductsContainer>
          <Style.ContentContainer>
            {isShowSearchBar === true ? (
              <Style.SearchContainer>
                <Style.SearchContent onSubmit={(e) => submitKeyword(e)}>
                  <Style.InputSearch
                    type="text"
                    value={result}
                    placeholder="브랜드명, 모델명"
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
                    onClick={closeSearch}
                  />
                </Style.SearchContent>
                <Style.HorizonLine></Style.HorizonLine>
              </Style.SearchContainer>
            ) : (
              <Style.SearchContainer>SHOP</Style.SearchContainer>
            )}
          </Style.ContentContainer>

          {products && products.products[0].length !== 0 ? (
            <Style.SortContainer>
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
            </Style.SortContainer>
          ) : null}

          <Style.Content>
            <Side />

            <Style.Products>
              {products && products.products[0].length !== 0 ? (
                products.products.map((product) =>
                  product.map((product, index) => (
                    <ProductLikeCard
                      none={"none"}
                      product={product}
                      key={index}
                    />
                  ))
                )
              ) : (
                <Style.NotFound>
                  검색하신 상품이 존재하지 않습니다.
                </Style.NotFound>
              )}
            </Style.Products>
          </Style.Content>
        </Style.ProductsContainer>
      </Style.Container>
    </>
  );
};

export default SearchPage;
