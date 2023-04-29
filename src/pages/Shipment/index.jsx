import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import AddShip from "../../components/AddShipInfo";
import { useQuery } from "@tanstack/react-query";
import userInfoStore from "../../store/userInfoStore";
import ShipAddress from "../../components/ShipAddress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import convertStringToNumber from "../../hooks/convertStringToNumber";
import Navbar from "./../../components/common/Navbar/index";
import HorizonLine from "../../components/common/HorizonLine";
import LoadingSpinner from "../../components/common/LoadingSpinner";
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
const Shipment = () => {
  const navigate = useNavigate();
  const {
    cart,
    myPage,
    order,
    shipPlaceName,
    shipReceiver,
    shipPostCode,
    phoneNumInput1,
    phoneNumInput2,
    phoneNumInput3,
    card,
    setCard,
  } = userInfoStore();
  const { isLoading, data: products } = useQuery(["products"], () =>
    cart.getUserCheckedCarts()
  );
  const { data: address } = useQuery(["address"], () =>
    myPage.getUserAddress()
  );
  const [checkItems, setCheckItems] = useState([]);

  const [showCouponBox, setShowCouponBox] = useState(false);
  const [haveAddress, setHaveAddress] = useState(false);
  const [coupon, setCoupon] = useState("선택안함");
  const [couponAppliedPrice, setCouponAppliedPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [showCreditCardBox, setShowCreditCardBox] = useState(false);
  const [budgetAccount, setBudgetAccount] = useState("일시불");
  const [showBudgetAccount, setShowBudgetAccount] = useState(false);
  const [showBudgetAccountBox, setShowBudgetAccountBox] = useState(false);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      termsArr.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const clickCard = (item) => {
    setCard(item);
    setShowCreditCardBox(false);
    setShowBudgetAccount(true);
  };

  const clickBudget = (item) => {
    setBudgetAccount(item);
    setShowBudgetAccountBox(false);
  };

  const showBudget = () => {
    setShowCreditCardBox((prev) => !prev);
    if (showBudgetAccount) setShowBudgetAccount(false);
  };

  const onValidate = () => {
    if (!address) {
      if (!shipPlaceName) {
        Swal.fire({
          title: "배송지를 입력해주세요.",
          confirmButtonColor: "black",
        });
        return;
      } else if (!shipReceiver) {
        Swal.fire({
          title: "수령인을 입력해주세요.",
          confirmButtonColor: "black",
        });
        return;
      } else if (!shipPostCode) {
        Swal.fire({
          title: "우편번호를 입력해주세요.",
          confirmButtonColor: "black",
        });
        return;
      } else if (!phoneNumInput1 || !phoneNumInput2 || !phoneNumInput3) {
        Swal.fire({
          title: "핸드폰번호를 입력해주세요.",
          confirmButtonColor: "black",
        });
        return;
      } else if (phoneNumInput1.length !== 3) {
        Swal.fire({
          title: "핸드폰 번호를 정확하게 입력해주세요.",
          confirmButtonColor: "black",
        });
        return;
      } else if (phoneNumInput2.length !== 4) {
        Swal.fire({
          title: "핸드폰 번호를 정확하게 입력해주세요.",
          confirmButtonColor: "black",
        });
        return;
      } else if (phoneNumInput3.length !== 4) {
        Swal.fire({
          title: "핸드폰 번호를 정확하게 입력해주세요.",
          confirmButtonColor: "black",
        });
        return;
      } else if (card === "카드사를 선택해주세요.") {
        Swal.fire("카드사를 선택해주세요.");

        return;
      }
    }

    if (card === "카드사를 선택해주세요.") {
      Swal.fire({
        title: "카드사를 선택해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }

    if (checkItems.length !== termsArr.length) {
      Swal.fire({
        title: "약관 동의를 모두 선택해주세요.",
        confirmButtonColor: "black",
      });
      return;
    }

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let days2 = now.getDate();

    if (month + 1 < 10) {
      month = "0".concat(String(month + 1));
    }
    if (days2 < 10) {
      days2 = "0".concat(String(days2));
    }

    let dates = `${year}.${month}.${days2}`;

    for (let i = 0; i < products.products.length; i++) {
      order.addOrderProducts(
        products.products[i].productId,
        dates,
        products.products[i].quantity,
        coupon,
        products.products[i].size
      );
      cart.deleteUserCart(
        products.products[i].productId,
        products.products[i].size
      );
    }
    Swal.fire({
      icon: "success",
      title: "성공적으로 주문하였습니다.",
      text: "주문 내역을 확인하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "black",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/mypage/order");
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    setProductsCount(0);
    setPrice(0);
    if (products) {
      for (let i = 0; i < products.products.length; i++) {
        let newPrice = Number(
          products.products[i].price * products.products[i].quantity
        );
        setPrice((prev) => prev + newPrice);
        setProductsCount((prev) => prev + products.products[i].quantity);
      }
    }
  }, [products]);

  const clickCoupon = (item) => {
    setCoupon(item);
    setShowCouponBox(false);
  };

  useEffect(() => {
    switch (coupon) {
      case "선택안함":
        setCouponAppliedPrice(0);
        break;
      case "Welcome 5% 할인 쿠폰":
        setCouponAppliedPrice(price / 10 / 2);
        break;
      case "10만원 이상 구매 시 10% 할인 쿠폰":
        if (price < 100000) {
          setCoupon((prev) => prev);
          break;
        }
        setCouponAppliedPrice(price / 10);
        break;
      case "20만원 이상 구매 시 20% 할인 쿠폰":
        if (price < 200000) {
          Swal.fire({
            title:
              "총 상품의 가격의 합이 200,000원이 넘지 않아 쿠폰 선택이 불가능합니다.",
            confirmButtonColor: "black",
          });
          setCoupon("선택안함");
          break;
        }
        setCouponAppliedPrice(price / 5);
        break;
      default:
        break;
    }
  }, [coupon, price]);

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
            {haveAddress === false ? (
              <ShipAddress />
            ) : (
              <AddShip setDefaultAddress={true} type={"orderPage"}></AddShip>
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
              <LoadingSpinner
                width={"100%"}
                margin={"70px 0px 0px 0px"}
                text={"상품을 준비하는 중입니다."}
              />
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
          <Style.PaymentBtn onClick={onValidate}>CHECK OUT</Style.PaymentBtn>
        </Style.RightContainer>
      </Style.Container>
    </>
  );
};

export default Shipment;
