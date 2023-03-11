import React, { useState } from "react";
import userInfoStore from "../../store/userInfoStore";
import { useNavigate } from "react-router-dom";
import * as Style from "./styles";
const MypageSide = () => {
  const { nickName, isCheckedID, setIsCheckedID } = userInfoStore();
  const navigate = useNavigate();
  const itemArr = [
    { id: 0, title: "주문 내역 조회" },
    { id: 1, title: "관심 상품" },
    { id: 2, title: "주소록" },
    { id: 3, title: "상품 리뷰" },
  ];

  const goToPage = (title) => {
    switch (title) {
      case "주문 내역 조회":
        navigate("/mypage/order");
        break;
      case "관심 상품":
        navigate("/mypage/wish");
        break;
      case "주소록":
        navigate("/mypage/address");
        break;
      case "상품 리뷰":
        navigate("/mypage/review");
        break;
      default:
        break;
    }
  };

  return (
    <Style.Container>
      <Style.Title>마이 페이지</Style.Title>
      {nickName && (
        <Style.NickName>
          {nickName}
          <Style.Last>님</Style.Last>
        </Style.NickName>
      )}
      {itemArr &&
        itemArr.map((item) => (
          <Style.Item
            isChecked={item.id === isCheckedID}
            key={item.id}
            onClick={() => {
              goToPage(item.title);
              setIsCheckedID(item.id);
            }}
          >
            {item.title}
          </Style.Item>
        ))}
    </Style.Container>
  );
};

export default MypageSide;
