import React, { useEffect, useState } from "react";
import * as Style from "./styles";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import searchStore from "../../store/searchStore";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
const recommendKeywordArr = ["나이키", "조던", "아디다스", "뉴발란스"];
const Search = ({ setShowSearch }) => {
  const navigate = useNavigate();
  const {
    searchWord,
    setSearchWord,
    recentKeyword,
    addRecentKeyword,
    setRecentKeyword,
    allDeleteRecentKeyword,
  } = searchStore();
  const [showKeyword, setShowKeyword] = useState(recentKeyword || []);
  const [products, setProducts] = useState([]);
  const submitKeyword = async (e) => {
    if (searchWord.trim() === "") {
      e.preventDefault();
      return;
    }

    sessionStorage.clear();
    navigate(`/search?keyword=${searchWord}`);
    setShowSearch((prev) => !prev);
    if (!recentKeyword.includes(searchWord)) {
      addRecentKeyword(searchWord);
    }
  };
  const goToSearchPage = (item) => {
    sessionStorage.clear();

    navigate(`/search?keyword=${item}`);
    setShowSearch((prev) => !prev);
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
      "http://localhost:3000/api/search/autocompleted",
      {
        keyword,
      }
    );
    const data = response.data;
    setProducts(data);
    return data;
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
    }
  }, [searchWord]);
  console.log("프러덕뜨", products);
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

          <GrClose
            style={{
              width: "45px",
              height: "45px",
              cursor: "pointer",
              marginTop: "5px",
            }}
            onClick={closeSearch}
          />
        </Style.SearchContent>
        <Style.HorizonLine></Style.HorizonLine>
        {products.length !== 0 ? (
          <Style.ProductsLayout>
            {products.map((item) => (
              <Style.ProductContent>
                <Style.ProductImage src={item.image}></Style.ProductImage>
                <Style.ProductDescription>
                  <span>{item.description}</span>
                  <span>{item.name}</span>
                </Style.ProductDescription>
              </Style.ProductContent>
            ))}
          </Style.ProductsLayout>
        ) : searchWord.length !== 0 ? (
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
          {showKeyword &&
            showKeyword.map((item) => (
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

export default Search;
