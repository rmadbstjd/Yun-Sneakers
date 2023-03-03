import React, { useState, useEffect } from "react";
import * as Style from "./styles";
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
import HorizonLine from "../../components/common/HorizonLine";
const SearchPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { product } = userInfoStore();
  const { sort, initSort } = searchStore();
  const { recentKeyword, addRecentKeyword } = searchStore();
  const [toggle, setToggle] = useState(false);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const sessionSort = sessionStorage.getItem("sort");
  const searchQuery = query.get("keyword") || "null";
  const searchSort = sessionSort || query.get("sort") || "null";
  const priceOrder = query.get("priceOrder") || undefined;
  const [result, setResult] = useState(searchQuery);
  let collectionName = query.get("collectionName") || undefined;
  let { data: products } = useQuery(
    [searchQuery, searchSort, collectionName, priceOrder],
    () =>
      product.searchProducts(
        searchQuery,
        searchSort,
        collectionName,
        priceOrder
      )
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

  useEffect(() => {
    if (searchQuery === "null") setIsShowSearchBar(false);
    else setIsShowSearchBar(true);
    setResult(searchQuery);
    products && initSort(sessionSort);
  }, [searchQuery, searchSort]);
  return (
    <div onClick={() => setToggle(false)}>
      <Navbar />
      <Style.Layout>
        <Style.Container>
          <Style.SearchBarLayout>
            {isShowSearchBar === true ? (
              <Style.SearchContainer isText={false}>
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
                    onClick={() => {
                      setResult("");
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

          {products && products.products[0].length !== 0 ? (
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
          ) : null}

          <Style.Content
            isShow={
              products && products.products[0].length !== 0 ? true : false
            }
          >
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
        </Style.Container>
      </Style.Layout>
    </div>
  );
};

export default SearchPage;
