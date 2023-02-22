import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
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
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <form
          className={styles.searchContent}
          onSubmit={(e) => submitKeyword(e)}
        >
          <input
            type="text"
            value={searchWord}
            placeholder="브랜드명, 모델명"
            onChange={(e) => handleChange(e)}
            className={styles.searchBar}
            autoFocus
          />

          <GrClose className={styles.close} onClick={closeSearch} />
        </form>
        <div className={styles.horizonLine}></div>
        <div className={styles.recentSearchContainer}>
          <div className={styles.recentSearch}>최근 검색어</div>
          <div className={styles.delete} onClick={deleteAllRecentKeyword}>
            모두 지우기
            <IoMdCloseCircle />
          </div>
        </div>
        <div className={styles.keywordContainer}>
          {showKeyword &&
            showKeyword.map((item) => (
              <div className={styles.keywordContent} keyword={item}>
                <div
                  className={styles.keyword}
                  onClick={() => goToSearchPage(item)}
                >
                  {item}
                </div>
                <IoMdCloseCircle
                  className={styles.keywordClose}
                  onClick={() => deleteKeyword(item)}
                />{" "}
              </div>
            ))}
        </div>
        <div className={styles.recommendSearch}>추천 검색어</div>
        <div className={styles.recommendContainer}>
          {recommendKeywordArr.map((item) => (
            <div
              className={styles.recommendContent}
              onClick={() => {
                navigate(`/search?keyword=${item}`);
                setShowSearch(false);
              }}
              key={item}
            >
              {item}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
