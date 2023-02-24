import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { IoIosArrowDown } from "react-icons/io";
import AddShip from "../../components/AddShipInfo";
import { useQuery } from "@tanstack/react-query";
import userInfoStore from "../../store/userInfoStore";
import ShipAddress from "../../components/ShipAddress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import convertToPrice from "../../hooks/convertToPrice";
import Navbar from "./../../components/common/Navbar/index";
const Shipment = () => {
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
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["test"], () => cart.getUserCarts());
  const { data: address } = useQuery(["address"], () =>
    myPage.getUserAddress()
  );
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
  const navigate = useNavigate();
  const [showCoupon, setShowCoupon] = useState(false);
  const [newShip, setNewShip] = useState(false);
  const [coupon, setCoupon] = useState("선택안함");
  const [couponPrice, setCouponPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [budgetAccount, setBudgetAccount] = useState("일시불");
  const [showBudgetAccount1, setShowBudgetAccount1] = useState(false);
  const [showBudgetAccount2, setShowBudgetAccount2] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const showCouponBox = () => {
    setShowCoupon((prev) => !prev);
  };

  const clickCard = (item) => {
    setCard(item);
    setShowCard(false);
    setShowBudgetAccount1(true);
  };
  const clickBudget = (item) => {
    setBudgetAccount(item);
    setShowBudgetAccount2(false);
  };
  const clickShip = (state) => {
    if (state === "new") setNewShip(true);
    else setNewShip(false);
  };
  const test = () => {
    setShowCard((prev) => !prev);
    if (showBudgetAccount1) setShowBudgetAccount1(false);
  };
  const check = (some) => {
    if (some === "all") {
      if (checkAll === false) {
        setCheckAll(true);
        setCheck1(true);
        setCheck2(true);
        setCheck3(true);
      } else {
        setCheckAll(false);
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
      }
      return;
    } else if (some === "1") setCheck1((prev) => !prev);
    else if (some === "2") setCheck2((prev) => !prev);
    else if (some === "3") setCheck3((prev) => !prev);
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
      } else if (!checkAll) {
        Swal.fire({
          title: "약관 동의를 모두 선택해주세요.",
          confirmButtonColor: "black",
        });
        return;
      }
    }
    if (card === "카드사를 선택해주세요.") {
      Swal.fire({
        title: "카드사를 선택해주세요.",
        confirmButtonColor: "black",
      });

      return;
    } else if (!checkAll) {
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
        window.location.reload();
      } else {
        navigate("/");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    setCount(0);
    if (products) {
      for (let i = 0; i < products.products.length; i++) {
        let newPrice = Number(
          products.products[i].price * products.products[i].quantity
        );
        setPrice((prev) => prev + newPrice);
        setCount((prev) => prev + products.products[i].quantity);
      }
    }
  }, [products]);

  const clickCoupon = (item) => {
    setCoupon(item);
    setShowCoupon(false);
  };

  useEffect(() => {
    switch (coupon) {
      case "선택안함":
        setCouponPrice(0);
        break;
      case "Welcome 5% 할인 쿠폰":
        setCouponPrice(price / 10 / 2);
        break;
      case "10만원 이상 구매 시 10% 할인 쿠폰":
        if (price < 100000) {
          setCoupon((prev) => prev);
          break;
        }
        setCouponPrice(price / 10);
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
        setCouponPrice(price / 5);
        break;
      default:
        break;
    }
  }, [coupon, price]);

  useEffect(() => {
    if (check1 === true && check2 === true && check3 === true)
      setCheckAll(true);
    else {
      setCheckAll(false);
    }
  }, [check1, check2, check3]);
  return (
    <>
      <Navbar />
      <Style.Container>
        <Style.LeftContainer>
          <Style.HorizonLine
            width={"750px"}
            border={4}
            color={"black"}
          ></Style.HorizonLine>
          <div>
            <Style.Title>배송 정보</Style.Title>

            <Style.InfoSelectContainer>
              <Style.LeftSelectBox
                newShip={newShip}
                onClick={() => clickShip("old")}
              >
                기존 배송지
              </Style.LeftSelectBox>
              <Style.RightSelectBox
                newShip={newShip}
                onClick={() => clickShip("new")}
              >
                신규 입력
              </Style.RightSelectBox>
              <Style.HorizonLine
                width={"750px"}
                border={0.5}
                color={"#bebebe"}
              ></Style.HorizonLine>
            </Style.InfoSelectContainer>
            {newShip === false ? (
              <ShipAddress />
            ) : (
              <AddShip type={"orderPage"}></AddShip>
            )}
          </div>

          <div>
            <Style.HorizonLine
              width={"750px"}
              border={4}
              color={"black"}
            ></Style.HorizonLine>
            <Style.Title>쿠폰 / 마일리지</Style.Title>
            <Style.HorizonLine width={"100%"}></Style.HorizonLine>
            <Style.BonusCouponContainer>
              <Style.CouponLeftBox>보너스 쿠폰</Style.CouponLeftBox>
              <Style.CouponRightBox onClick={showCouponBox}>
                <Style.Default>{coupon}</Style.Default>
                <IoIosArrowDown style={{ margin: "10px 10px 0px 0px" }} />
              </Style.CouponRightBox>
            </Style.BonusCouponContainer>
            <Style.ShowCouponSheet>
              {" "}
              {showCoupon &&
                couponArr.map((item, index) => (
                  <Style.Coupon onClick={() => clickCoupon(item)} key={index}>
                    &nbsp;&nbsp;{item}
                  </Style.Coupon>
                ))}
            </Style.ShowCouponSheet>
            <Style.BrandCouponContainer>
              <Style.CouponLeftBox>브랜드 쿠폰</Style.CouponLeftBox>
              <Style.BrandCouponBox>
                &nbsp;&nbsp;&nbsp;적용 가능한 쿠폰이 없습니다.
              </Style.BrandCouponBox>
            </Style.BrandCouponContainer>
            <Style.HorizonLine
              width={"750px"}
              border={4}
              color={"black"}
            ></Style.HorizonLine>
          </div>

          <div>
            <Style.Title>결제 방법</Style.Title>
            <Style.HorizonLine width={"100%"} border={2}></Style.HorizonLine>
            <Style.CardContainer>
              {paymentArr.map((item, index) => (
                <Style.Card item={item} key={index}>
                  {item}
                </Style.Card>
              ))}
            </Style.CardContainer>
            <Style.SelectCard onClick={test}>
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
              {showCard &&
                cardArr.map((item) => (
                  <Style.CardItem onClick={() => clickCard(item)}>
                    {item}
                  </Style.CardItem>
                ))}
            </Style.Modal>
            {showBudgetAccount1 && (
              <Style.SelectedBudget
                onClick={() => setShowBudgetAccount2((prev) => !prev)}
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
            {showBudgetAccount2 && (
              <Style.Modal>
                {budgetArr.map((item) => (
                  <Style.CardItem onClick={() => clickBudget(item)}>
                    {item}
                  </Style.CardItem>
                ))}
              </Style.Modal>
            )}
          </div>
        </Style.LeftContainer>
        <Style.RightContainer>
          <Style.OrderTitle>주문 상품 정보 / 총 {count}개</Style.OrderTitle>
          <Style.ProductsContaier>
            {products &&
              products.products.map((item) => (
                <Style.ProductsContent>
                  <img src={item.image} alt="이미지"></img>
                  <div>
                    <Style.Category>{item.category}</Style.Category>
                    <Style.Name>{item.name}</Style.Name>
                    <Style.PriceContainer>
                      <div>{convertToPrice(item.price)}원/</div>
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
              <div>{convertToPrice(price)}원</div>
            </Style.InfoContent>
            <Style.InfoContent>
              <div>쿠폰 사용</div>
              <div>- {convertToPrice(couponPrice)}원</div>
            </Style.InfoContent>
            <Style.InfoContent>
              <div>배송비</div>
              <div>+ 0원</div>
            </Style.InfoContent>
            <Style.InfoTotalPriceContainer>
              <div>총 결제금액</div>
              <div>{convertToPrice(price - couponPrice)}원</div>
            </Style.InfoTotalPriceContainer>
            <Style.HorizonLine width={"100%"} border={1}></Style.HorizonLine>
          </Style.InfoContainer>
          <Style.CheckBoxContainer>
            <Style.CheckBoxContent>
              <Style.CheckBox
                type="checkbox"
                onChange={() => check("all")}
                checked={checkAll}
              ></Style.CheckBox>
              <Style.CheckBoxLetter>
                주문 내역을 확인했으며, 아래 내용에 모두 동의합니다.
              </Style.CheckBoxLetter>
            </Style.CheckBoxContent>
            <Style.CheckBoxContent>
              <Style.CheckBox
                type="checkbox"
                onChange={() => check("1")}
                checked={check1}
              ></Style.CheckBox>
              <Style.CheckBoxLetter color={"gray"}>
                (필수) 개인정보 수집/이용 동의
              </Style.CheckBoxLetter>
            </Style.CheckBoxContent>
            <Style.CheckBoxContent>
              <Style.CheckBox
                type="checkbox"
                onChange={() => check("2")}
                checked={check2}
              ></Style.CheckBox>
              <Style.CheckBoxLetter color={"gray"}>
                (필수) 개인정보 제3자 제공 동의
              </Style.CheckBoxLetter>
            </Style.CheckBoxContent>
            <Style.CheckBoxContent>
              <Style.CheckBox
                type="checkbox"
                onChange={() => check("3")}
                checked={check3}
              ></Style.CheckBox>
              <Style.CheckBoxLetter color={"gray"}>
                (필수) 결제대행 서비스 이용약관 (주)KG이니시스
              </Style.CheckBoxLetter>
            </Style.CheckBoxContent>
          </Style.CheckBoxContainer>
          <Style.PaymentBtn onClick={onValidate}>CHECK OUT</Style.PaymentBtn>
        </Style.RightContainer>
      </Style.Container>
    </>
  );
};

export default Shipment;
