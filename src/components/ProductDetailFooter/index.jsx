import React from "react";
import * as Style from "./styles";
import HorizonLine from "../common/HorizonLine";

const shipText = [
  "Delivery 브랜드 업체발송은 상품설명에 별도로 기입된 브랜드 알림 배송공지 기준으로 출고되고 브랜드마다 개별 배송비가 부여됩니다.",
  "Yun's Neakers의 자체발송은 오후 2시까지 결제확인된 주문은 당일 출고되고 5만원 이상 주문은 무료배송, 5만원 미만은 3,000원의 배송비가 추가됩니다.",
  "SPECIAL ORDER, PT 등 예약주문은 상세설명의 출고일정을 확인하시기 바랍니다.",
  "제주도를 포함한 도서산간 지역은 추가배송비 입금요청이 있을 수 있습니다.",
];
const exchangeText = [
  "상품 수령일로부터 7일 이내 반품 / 환불 가능합니다.",
  "변심 반품의 경우 왕복배송비를 차감한 금액이 환불되며, 제품 및 포장 상태가 재판매 가능하여야 합니다.",
  "동일상품 또는 동일상품 내 추가금액이 없는 옵션만 교환가능합니다.",
  "상품 불량인 경우는 배송비를 포함한 전액이 환불됩니다.",
  "출고 이후 환불요청 시 상품 회수 후 처리됩니다.",
  "일부 완제품으로 수입된 상품의 경우 A/S가 불가합니다.",
  "상품의 색상과 이미지는 기기의 해상도에 따라 다르게 보일 수 있습니다.",
];
const ProductDetailFooter = () => {
  return (
    <Style.Layout>
      <Style.Title>배송 정보</Style.Title>
      <HorizonLine
        width={"100%"}
        border={"4px"}
        color={"black"}
        margin={"0px 0px 10px 0px"}
      />
      {shipText.map((content) => (
        <Style.Text key={content}>· {content}</Style.Text>
      ))}
      <HorizonLine
        width={"100%"}
        border={"1px"}
        color={"gray"}
        margin={"10px 0px 0px 0px"}
      />
      <Style.Title>교환, 환불 안내</Style.Title>
      <HorizonLine
        width={"100%"}
        border={"4px"}
        color={"black"}
        margin={"0px 0px 10px 0px"}
      />
      {exchangeText.map((content) => (
        <Style.Text key={content}>· {content}</Style.Text>
      ))}
      <HorizonLine
        width={"100%"}
        border={"1px"}
        color={"gray"}
        margin={"20px 0px 0px 0px"}
      />
    </Style.Layout>
  );
};

export default ProductDetailFooter;
