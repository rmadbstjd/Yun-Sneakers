import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../../store/userInfoStore";
import { getUserCheckedCarts } from "../../../api/cart";
import { validateOrder } from "../../../utils/validateOrder";
import { addOrderProducts } from "../../../api/order";
import { deleteUserCart } from "../../../api/cart";
import Swal from "sweetalert2";
import UIShipmentPage from "./../UIShipmentPage/index";
import useGetUserAddress from "../../../hooks/useGetUserAddress";
import { useTextInputs, useNumberInputs } from "./../../../hooks/useInputs";
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
  const { address } = useGetUserAddress();
  const navigate = useNavigate();
  const { state: place, handleChange: setPlace } = useTextInputs("", 30);
  const { state: receiver, handleChange: setReceiver } = useTextInputs("", 30);
  const { state: firstPhoneNum, handleChange: setFirstPhoneNum } =
    useNumberInputs("", 3);
  const { state: middlePhoneNum, handleChange: setMiddlePhoneNum } =
    useNumberInputs("", 4);
  const { state: lastPhoneNum, handleChange: setLastPhoneNum } =
    useNumberInputs("", 4);
  const { card, setCard } = userInfoStore();
  const postCode = address?.postCode;
  const { data: products } = useQuery(["products"], () =>
    getUserCheckedCarts()
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
    if (
      validateOrder(
        place,
        receiver,
        postCode,
        firstPhoneNum,
        middlePhoneNum,
        lastPhoneNum,
        card,
        checkItems,
        termsArr
      )
    ) {
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
        addOrderProducts(
          products.products[i].productId,
          dates,
          products.products[i].quantity,
          coupon,
          products.products[i].size
        );
        deleteUserCart(
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
    }
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

  useEffect(() => {
    if (address) {
      setPlace(address.place);
      setReceiver(address.receiver);
      setFirstPhoneNum(address.phoneNumber1);
      setMiddlePhoneNum(address.phoneNumber2);
      setLastPhoneNum(address.phoneNumber3);
    }
  }, [address]);
  return (
    <UIShipmentPage
      haveAddress={haveAddress}
      setHaveAddress={setHaveAddress}
      setShowCouponBox={setShowCouponBox}
      coupon={coupon}
      showCouponBox={showCouponBox}
      clickCoupon={clickCoupon}
      showBudget={showBudget}
      card={card}
      showCreditCardBox={showCreditCardBox}
      showBudgetAccount={showBudgetAccount}
      clickCard={clickCard}
      clickBudget={clickBudget}
      setShowBudgetAccountBox={setShowBudgetAccountBox}
      budgetAccount={budgetAccount}
      showBudgetAccountBox={showBudgetAccountBox}
      productsCount={productsCount}
      products={products}
      price={price}
      couponAppliedPrice={couponAppliedPrice}
      checkItems={checkItems}
      handleAllCheck={handleAllCheck}
      handleSingleCheck={handleSingleCheck}
      onValidate={onValidate}
    />
  );
};

export default Shipment;
