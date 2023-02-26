import React from "react";
import * as Style from "./styles";
import searchStore from "../../store/searchStore";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Toggle = ({ setToggle }) => {
  const navigate = useNavigate();
  const { setSortNew, setSortPopular } = searchStore();
  const [query] = useSearchParams();

  const searchQuery = query.get("keyword") || "null";
  const clickToSort = (sort) => {
    if (sort === "popular") {
      setSortPopular();
      sessionStorage.setItem("sort", "popular");
    } else {
      setSortNew();
      sessionStorage.setItem("sort", "new");
    }
    navigate(`/search?keyword=${searchQuery}&sort=${sort}`);
  };
  return (
    <Style.Container onClick={() => setToggle(false)}>
      <Style.Content onClick={() => clickToSort("popular")}>
        <Style.Title>인기순</Style.Title>
        <Style.Description>
          좋아요 갯수를 기준으로 정렬합니다.
        </Style.Description>
      </Style.Content>
      <Style.Content onClick={() => clickToSort("new")}>
        <Style.Title>최신순</Style.Title>
        <Style.Description>
          상품을 등록한 시간 기준으로 정렬합니다.
        </Style.Description>
      </Style.Content>
    </Style.Container>
  );
};

export default Toggle;
