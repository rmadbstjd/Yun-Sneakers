import React, { useEffect, useState } from "react";
import * as Style from "./styles";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import searchStore from "../../store/searchStore";
import { IoMdCloseCircle } from "react-icons/io";
const recommendKeywordArr = ["나이키", "조던", "아디다스", "뉴발란스"];
const Search = ({ setShowSearch }) => {
  const navigate = useNavigate();
  const {} = userInfoStore();
  const {
    searchWord,
    setSearchWord,
    recentKeyword,
    addRecentKeyword,
    setRecentKeyword,
    allDeleteRecentKeyword,
  } = searchStore();
  const [showKeyword, setShowKeyword] = useState(recentKeyword || []);
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
    setShowSearch((prev) => !prev);

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
  useEffect(() => {
    recentKeyword &&
      localStorage.setItem("recentKeyword", JSON.stringify(recentKeyword));
  }, [recentKeyword]);
  return (
    <Style.Container>
      <Style.SearchContainer>
        <Style.SearchContent onSubmit={(e) => submitKeyword(e)}>
          <Style.SearchBar
            type="text"
            value={searchWord}
            placeholder="브랜드명, 모델명"
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
              <Style.KeywordContent keyword={item}>
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
