import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userInfoStore from "../../../store/userInfoStore";
import Container from "../UISide";
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
  const query = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const goToPage = (title) => {
    const path = `/mypage/${
      itemArr.find((item) => item.title === title)?.params
    }`;
    navigate(path);
  };

  return (
    <Container
      nickName={nickName}
      setIsCheckedID={setIsCheckedID}
      query={query}
      goToPage={goToPage}
      itemArr={itemArr}
    />
  );
};

export default MypageSide;
