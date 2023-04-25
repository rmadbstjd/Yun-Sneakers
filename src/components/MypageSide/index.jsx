import React from "react";
import userInfoStore from "../../store/userInfoStore";
import { useNavigate, useLocation } from "react-router-dom";

import * as Style from "./styles";
const itemArr = [
  { id: 0, title: "주문 내역 조회", params: "order" },
  { id: 1, title: "관심 상품", params: "wish" },
  { id: 2, title: "주소록", params: "address" },
  { id: 3, title: "상품 리뷰", params: "review" },
  { id: 4, title: "상품 Q&A 문의 내역", params: "qna" },
];
const MypageSide = () => {
  const { nickName, setIsCheckedID } = userInfoStore();
  const location = useLocation();
  const query = location && location.pathname.split("/")[2];

  const navigate = useNavigate();

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
      case "상품 Q&A 문의 내역":
        navigate("/mypage/qna");
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
            isChecked={item.params === query}
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
