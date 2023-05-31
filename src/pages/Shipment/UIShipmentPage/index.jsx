import React from "react";
import * as Style from "./styles";
import Button from "../../../components/common/button";
import Navbar from "../../../components/common/Navbar/Container";
import HorizonLine from "../../../components/common/HorizonLine";
import ShipAddress from "../../../components/ShipAddress";
import AddUserAddressForm from "../../../components/Form/UserAddressForm/Container";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import convertStringToNumber from "../../../utils/convertStringToNumber";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
const couponArr = [
  "선택안함",
  "Welcome 5% 할인 쿠폰",
  "10만원 이상 구매 시 10% 할인 쿠폰",
  "20만원 이상 구매 시 20% 할인 쿠폰",
];
const paymentArr = [
  "신용/체크카드",
  "네이버페이",
  "카카오페이",
  "토스",
  "삼성페이",
  "페이코",
  "SSG 페이",
  "휴대폰 결제",
  "무통장 입금",
];
const cardArr = [
  "NH카드",
  "수협카드",
  "삼성카드",
  "우체국카드",
  "BC카드",
  "전북카드",
  "우리카드",
  "현대카드",
  "롯데카드",
];
const budgetArr = [
  "일시불",
  "2개월",
  "3개월",
  "4개월",
  "5개월",
  "6개월",
  "7개월",
  "8개월",
  "9개월",
  "10개월",
  "11개월",
  "12개월",
];
const termsArr = [
  {
    id: 0,
    title: "(필수) 개인정보 수집/이용 동의",
  },
  {
    id: 1,
    title: "(필수) 개인정보 제3자 제공 동의",
  },
  {
    id: 2,
    title: "(필수) 결제대행 서비스 이용약관 (주)KG이니시스",
  },
];
const UIShipmentPage = ({
  isLoading,
  haveAddress,
  setHaveAddress,
  setShowCouponBox,
  coupon,
  showCouponBox,
  clickCoupon,
  showBudget,
  card,
  showCreditCardBox,
  showBudgetAccount,
  clickCard,
  clickBudget,
  setShowBudgetAccountBox,
  budgetAccount,
  showBudgetAccountBox,
  productsCount,
  products,
  price,
  couponAppliedPrice,
  checkItems,
  handleAllCheck,
  handleSingleCheck,
  onValidate,
}) => {
  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.LeftContainer>
          <HorizonLine
            width={"750px"}
            border={"4px"}
            color={"black"}
          ></HorizonLine>
          <div>
            <Style.Title>배송 정보</Style.Title>

            <Style.AddressSelectContainer>
              <Style.ExistAddressSelectBox
                haveAddress={haveAddress}
                onClick={() => setHaveAddress(false)}
              >
                기존 배송지
              </Style.ExistAddressSelectBox>
              <Style.AddAddressSelectBox
                haveAddress={haveAddress}
                onClick={() => setHaveAddress(true)}
              >
                신규 입력
              </Style.AddAddressSelectBox>
              <HorizonLine
                width={"750px"}
                border={"0.5px"}
                color={"#bebebe"}
              ></HorizonLine>
            </Style.AddressSelectContainer>
            {!haveAddress ? (
              <ShipAddress />
            ) : (
              <AddUserAddressForm
                setDefaultAddress={true}
                type={"orderPage"}
              ></AddUserAddressForm>
            )}
          </div>

          <div>
            <HorizonLine
              width={"750px"}
              border={"4px"}
              color={"black"}
            ></HorizonLine>
            <Style.Title>쿠폰 / 마일리지</Style.Title>
            <Style.CouponContainer>
              <Style.CouponTitle>보너스 쿠폰</Style.CouponTitle>
              <Style.ShowCouponBox
                onClick={() => {
                  setShowCouponBox((prev) => !prev);
                }}
              >
                <Style.Default>{coupon}</Style.Default>
                <IoIosArrowDown style={{ margin: "10px 10px 0px 0px" }} />
              </Style.ShowCouponBox>
            </Style.CouponContainer>
            <Style.ShowCouponSheet>
              {" "}
              {showCouponBox &&
                couponArr.map((item) => (
                  <Style.Coupon onClick={() => clickCoupon(item)} key={item}>
                    &nbsp;&nbsp;{item}
                  </Style.Coupon>
                ))}
            </Style.ShowCouponSheet>
            <Style.BrandCouponContainer>
              <Style.CouponTitle>브랜드 쿠폰</Style.CouponTitle>
              <Style.BrandCouponBox>
                &nbsp;&nbsp;&nbsp;적용 가능한 쿠폰이 없습니다.
              </Style.BrandCouponBox>
            </Style.BrandCouponContainer>
            <HorizonLine
              width={"750px"}
              border={"4px"}
              color={"black"}
            ></HorizonLine>
          </div>

          <div>
            <Style.Title>결제 방법</Style.Title>
            <HorizonLine
              width={"100%"}
              border={"2px"}
              color={"black"}
            ></HorizonLine>
            <Style.CardContainer>
              {paymentArr.map((item) => (
                <Style.Card item={item} key={item}>
                  {item}
                </Style.Card>
              ))}
            </Style.CardContainer>
            <Style.SelectCard onClick={showBudget}>
              <Style.CardTitle>{card}</Style.CardTitle>
              <IoIosArrowDown
                style={{
                  width: "18px",
                  height: "18px",
                  margin: "10px 0px 0px 500px",
                }}
              />
            </Style.SelectCard>
            <Style.Modal>
              {showCreditCardBox &&
                cardArr.map((item) => (
                  <Style.CardItem key={item} onClick={() => clickCard(item)}>
                    {item}
                  </Style.CardItem>
                ))}
            </Style.Modal>
            {showBudgetAccount && (
              <Style.SelectedBudget
                onClick={() => setShowBudgetAccountBox((prev) => !prev)}
              >
                <Style.CardTitle>{budgetAccount}</Style.CardTitle>
                <IoIosArrowDown
                  style={{
                    width: "18px",
                    height: "18px",
                    margin: "10px 0px 0px 500px",
                  }}
                />
              </Style.SelectedBudget>
            )}
            {showBudgetAccountBox && (
              <Style.Modal>
                {budgetArr.map((item) => (
                  <Style.CardItem key={item} onClick={() => clickBudget(item)}>
                    {item}
                  </Style.CardItem>
                ))}
              </Style.Modal>
            )}
          </div>
        </Style.LeftContainer>
        <Style.RightContainer>
          <Style.OrderTitle>
            주문 상품 정보 / 총 {productsCount}개
          </Style.OrderTitle>
          <Style.ProductsContaier>
            {isLoading && (
              <LoadingSpinner width={"100%"} margin={"70px 0px 0px 0px"}>
                상품을 준비하는 중입니다.
              </LoadingSpinner>
            )}
            {products &&
              products.products.map((item) => (
                <Style.ProductsContent key={item.productId}>
                  <img src={item.image} alt="상품"></img>
                  <div>
                    <Style.Category>{item.category[0]}</Style.Category>
                    <Style.Name>{item.name}</Style.Name>
                    <Style.PriceContainer>
                      <div>{convertStringToNumber(item.price)}원/</div>
                      <div>&nbsp;수량 {item.quantity}개</div>
                    </Style.PriceContainer>
                    <Style.Size>옵션 : [SIZE] {item.size}</Style.Size>
                  </div>
                </Style.ProductsContent>
              ))}
          </Style.ProductsContaier>
          <Style.InfoContainer>
            <Style.InfoContent>
              <div>총 상품금액</div>
              <div>{convertStringToNumber(price)}원</div>
            </Style.InfoContent>
            <Style.InfoContent>
              <div>쿠폰 사용</div>
              <div>- {convertStringToNumber(couponAppliedPrice)}원</div>
            </Style.InfoContent>
            <Style.InfoContent>
              <div>배송비</div>
              <div>+ 0원</div>
            </Style.InfoContent>
            <Style.InfoTotalPriceContainer>
              <div>총 결제금액</div>
              <div>{convertStringToNumber(price - couponAppliedPrice)}원</div>
            </Style.InfoTotalPriceContainer>
            <Style.HorizonLine width={"100%"} border={1}></Style.HorizonLine>
          </Style.InfoContainer>

          <Style.CheckBoxContainer>
            <Style.CheckBoxContent>
              <Style.CheckBox
                htmlFor={"주문 내역을 확인했으며, 아래 내용에 모두 동의합니다."}
                type="checkbox"
                id={"주문 내역을 확인했으며, 아래 내용에 모두 동의합니다."}
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkItems.length === termsArr.length ? true : false}
              ></Style.CheckBox>
              <Style.CheckBoxLetter>
                주문 내역을 확인했으며, 아래 내용에 모두 동의합니다.
              </Style.CheckBoxLetter>
            </Style.CheckBoxContent>

            {termsArr.map((item, index) => (
              <Style.CheckBoxContent key={item.id}>
                <Style.Label htmlfor={item.title}>
                  <Style.CheckBox
                    type="checkbox"
                    id={item.title}
                    name={item.title}
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, termsArr[index].id)
                    }
                    checked={
                      checkItems.includes(termsArr[index].id) ? true : false
                    }
                  ></Style.CheckBox>
                  <Style.CheckBoxLetter>{item.title}</Style.CheckBoxLetter>
                </Style.Label>
              </Style.CheckBoxContent>
            ))}
          </Style.CheckBoxContainer>
          <Button
            style={{
              border: "solid black 0px",
              width: "600px",
              height: "70px",
              background: "black",
              hoverBackground: "black",
              hoverColor: "#a5ba93",
              color: "white",
              fontSize: "25px",
              fontWeight: "bolder",
              margin: "40px 0px 0px 25px",
              lineHeight: "270%",
            }}
            isShow={true}
            onClick={onValidate}
          >
            CHECK OUT
          </Button>
        </Style.RightContainer>
      </Style.Container>
    </>
  );
};

export default UIShipmentPage;
