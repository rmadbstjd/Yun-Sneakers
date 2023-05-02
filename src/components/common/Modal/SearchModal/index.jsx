import React, { useEffect, useState } from "react";
import * as Style from "./styles";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "@react-icons/all-files/io/IoMdCloseCircle";
import searchStore from "../../../../store/searchStore";
import axios from "axios";
import HorizonLine from "../../HorizonLine";
const recommendKeywordArr = ["나이키", "조던", "아디다스", "뉴발란스"];

const SearchModal = ({ setShowSearch }) => {
  const navigate = useNavigate();
  const {
    searchWord,
    setSearchWord,
    recentKeyword,
    addRecentKeyword,
    setRecentKeyword,
    allDeleteRecentKeyword,
    setShowNavbar,
  } = searchStore();
  const [showKeyword, setShowKeyword] = useState(recentKeyword || []);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const submitKeyword = async (e) => {
    if (searchWord.trim() === "") {
      e.preventDefault();
      return;
    }
    sessionStorage.clear();
    navigate(`/search?keyword=${searchWord}`);
    setShowSearch((prev) => !prev);
    setShowNavbar(true);
    if (!recentKeyword.includes(searchWord)) {
      addRecentKeyword(searchWord);
    }
  };

  const goToSearchPage = (item) => {
    sessionStorage.clear();
    navigate(`/search?keyword=${item}`);
    setShowSearch((prev) => !prev);
    setShowNavbar(true);
  };

  const clickToBrand = (item) => {
    sessionStorage.clear();
    navigate(`/search?keyword=${item[0]}`);
    setShowSearch((prev) => !prev);
    setShowNavbar(true);
  };

  const goToDetail = (item) => {
    navigate(`/products/${item.id}`);
    setShowNavbar(true);
  };

  const closeSearch = () => {
    setSearchWord("");
  };

  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  const deleteAllRecentKeyword = () => {
    localStorage.removeItem("recentKeyword");
    setShowKeyword([]);
    allDeleteRecentKeyword();
  };

  const deleteKeyword = (item) => {
    setShowKeyword(showKeyword.filter((keyword) => keyword !== item));
    setRecentKeyword(item);
  };

  const fetch = async (keyword) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/search/autocompleted`,
      {
        keyword,
      }
    );
    const data = response.data;
    setProducts(data.products);
    setBrands(data.brands);
    return;
  };

  useEffect(() => {
    recentKeyword &&
      localStorage.setItem("recentKeyword", JSON.stringify(recentKeyword));
  }, [recentKeyword]);

  useEffect(() => {
    if (searchWord) {
      if (searchWord.trim() === "") return;
      searchWord.trim();
      fetch(searchWord);
    } else {
      setProducts([]);
      setBrands([]);
    }
  }, [searchWord]);
  return (
    <Style.Container>
      <Style.Close>
        {" "}
        <GrClose
          style={{
            width: "25px",
            height: "25px",
            cursor: "pointer",
            marginTop: "5px",
            color: "gray",
          }}
          onClick={() => {
            setShowSearch(false);
            setShowNavbar(true);
          }}
        />
      </Style.Close>
      <Style.SearchContainer>
        <Style.SearchContent onSubmit={(e) => submitKeyword(e)}>
          <Style.SearchBar
            type="text"
            value={searchWord || ""}
            placeholder="브랜드명, 모델명 등"
            onChange={(e) => handleChange(e)}
            autoFocus
          />
          <AiFillCloseCircle
            style={{
              width: "25px",
              height: "25px",
              cursor: "pointer",
              marginTop: "15px",
              color: "black",
            }}
            onClick={closeSearch}
          />
        </Style.SearchContent>
        <HorizonLine width={"100%"} border={"3px"} color={"black"} />
        {products.length !== 0 ? (
          <Style.ProductsLayout>
            {brands.map((item) => (
              <div key={item}>
                <Style.BrandLayout
                  onClick={() => {
                    clickToBrand(item);
                  }}
                >
                  <Style.BrandName>
                    <Style.KorName>{item[0]}</Style.KorName>{" "}
                    <Style.EngName>{item[1]}</Style.EngName>
                  </Style.BrandName>
                  <Style.BrandText>BRAND</Style.BrandText>
                </Style.BrandLayout>
                <HorizonLine width={"86.1%"} border={"1px"} color={"#EBEBEB"} />
              </div>
            ))}
            {products.map((item) => (
              <div key={item.name}>
                <Style.ProductContent
                  onClick={() => {
                    goToDetail(item);
                  }}
                >
                  <Style.ProductImage src={item.image}></Style.ProductImage>
                  <Style.ProductInfo>
                    <Style.ProductDesc>{item.description}</Style.ProductDesc>
                    <Style.ProductTitle>{item.name}</Style.ProductTitle>
                  </Style.ProductInfo>
                </Style.ProductContent>
                <HorizonLine width={"86.1%"} border={"1px"} color={"#EBEBEB"} />
              </div>
            ))}
          </Style.ProductsLayout>
        ) : searchWord && searchWord.length !== 0 ? (
          <Style.NullTextLayout>
            <Style.NullText>검색하신 상품이 존재하지 않습니다.</Style.NullText>
          </Style.NullTextLayout>
        ) : null}
        <Style.RecentSearchContainer>
          <Style.RecentSearch>최근 검색어</Style.RecentSearch>
          <Style.Delete onClick={deleteAllRecentKeyword}>
            모두 지우기
            <IoMdCloseCircle />
          </Style.Delete>
        </Style.RecentSearchContainer>
        <Style.KeywordContainer>
          {showKeyword?.map((item) => (
            <Style.KeywordContent key={item}>
              <Style.Keyword onClick={() => goToSearchPage(item)}>
                {item}
              </Style.Keyword>
              <IoMdCloseCircle
                style={{
                  marginTop: "5px",
                  width: "20px",
                  height: "20px",
                  color: "gray",
                  cursor: "pointer",
                }}
                onClick={() => deleteKeyword(item)}
              />{" "}
            </Style.KeywordContent>
          ))}
        </Style.KeywordContainer>
        <Style.RecommendSearch>추천 검색어</Style.RecommendSearch>
        <Style.RecommendContainer>
          {recommendKeywordArr.map((item) => (
            <Style.RecommendContent
              onClick={() => {
                navigate(`/search?keyword=${item}`);
                setShowSearch(false);
                setShowNavbar(true);
              }}
              key={item}
            >
              {item}{" "}
            </Style.RecommendContent>
          ))}
        </Style.RecommendContainer>
      </Style.SearchContainer>
    </Style.Container>
  );
};

export default SearchModal;
