import React from "react";
import userInfoStore from "../../store/userInfoStore";
import { useNavigate } from "react-router-dom";
import * as Style from "./styles";
const MypageSide = () => {
  const { nickName } = userInfoStore();
  const navigate = useNavigate();
  const itemArr = ["주문 내역 조회", "관심 상품", "주소록", "상품 리뷰"];

  const goToPage = (item) => {
    switch (item) {
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
            key={item}
            onClick={() => {
              goToPage(item);
            }}
          >
            {item}
          </Style.Item>
        ))}
    </Style.Container>
  );
};

export default MypageSide;
