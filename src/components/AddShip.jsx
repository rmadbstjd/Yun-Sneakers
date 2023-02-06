import React, { useState, useEffect } from "react";
import styles from "./css/AddShip.module.css";
import { IoIosArrowDown } from "react-icons/io";
import PopupPostCode from "./PopupPostCode";
import PopupDom from "./PopupDom";
import useStore from "../store";
import { AiOutlineMinus } from "react-icons/ai";
const AddShip = ({ type }) => {
  console.log("AddShip", type);
  let regex;
  const {
    cart,
    shipPlaceName,
    setShipPlaceName,
    shipReceiver,
    setShipReceiver,
    shipPostCode,
    shipAddress,
    numInput1,
    numInput2,
    numInput3,
    setNumInput1,
    setNumInput2,
    setNumInput3,
    defaultAddress,
    setDefaultAddress,
    shipAddressDetail,
    setShipAddressDetail,
  } = useStore();
  const requestArr = [
    "배송시 요청사항을 선택해 주세요",
    "부재시 문앞에 놓아주세요",
    "부재시 경비실에 맡겨 주세요.",
    "부재시 전화 또는 문자 주세요",
    "택배함에 넣어 주세요.",
    "직접입력",
  ];
  const [showRequest, setShowRequest] = useState(false);
  const [request, setRequest] = useState("배송시 요청사항을 선택해 주세요");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [showTextArea, showSetTextArea] = useState(false);
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  const clickRequest = (item) => {
    setRequest(item);
    setShowRequest(false);
    if (item === "직접입력") showSetTextArea(true);
    else showSetTextArea(false);
  };
  const showRequestBox = () => {
    setShowRequest((prev) => !prev);
  };
  const changeText = (e, keyword) => {
    switch (keyword) {
      case "shipPlaceName":
        regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;
        if (regex.test(e.target.value)) setShipPlaceName(e.target.value);
        break;
      case "shipReceiver":
        regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;
        if (regex.test(e.target.value)) setShipReceiver(e.target.value);
        break;
      default:
        break;
    }
  };
  const checkNumber = (e, place) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    if (place === "first") {
      if (onlyNumber.length >= 4) return;
      setNumInput1(onlyNumber);
    } else if (place === "second") {
      if (onlyNumber.length >= 5) return;
      setNumInput2(onlyNumber);
    } else if (place === "last") {
      if (onlyNumber.length >= 5) return;
      setNumInput3(onlyNumber);
    }
  };
  const checkTextLength = (e) => {
    const { value } = e.target;
    if (value.length >= 51) return;
    setTextArea(value);
  };
  const checkAddress = (e) => {
    setDefaultAddress();
  };
  useEffect(() => {
    if (defaultAddress) {
      cart.addShipAddress(
        shipPlaceName,
        shipReceiver,
        shipPostCode,
        shipAddress,
        shipAddressDetail,
        numInput1,
        numInput2,
        numInput3
      );
    }
  }, [defaultAddress]);
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div className={styles.left}>배송지명</div>
        <input
          type="text"
          className={styles.deliveryAddress}
          maxLength={10}
          value={shipPlaceName}
          onChange={(e) => changeText(e, "shipPlaceName")}
        ></input>
      </div>
      <div className={styles.first}>
        <div className={styles.left}>수령인</div>
        <input
          type="text"
          className={styles.deliveryAddress}
          maxLength={10}
          value={shipReceiver}
          onChange={(e) => changeText(e, "shipReceiver")}
        ></input>
      </div>
      <div className={styles.addressContainer}>
        <div className={styles.addressLeft}>배송지</div>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <div className={styles.addressNumber}>{shipPostCode}</div>
            <div
              className={styles.searchButton}
              onClick={() => setIsPopupOpen((prev) => !prev)}
            >
              우편 번호 검색
            </div>
          </div>
          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode onClose={closePostCode} type={type} />
              </PopupDom>
            )}
          </div>
          <div className={styles.addressInfo}>{shipAddress}</div>
          <input
            type="text"
            placeholder="상세 주소 입력"
            value={shipAddressDetail}
            onChange={(e) => setShipAddressDetail(e.target.value)}
            className={styles.moreInfo}
          ></input>
        </div>
      </div>
      <div className={styles.phoneNumberContainer}>
        <div className={styles.left}>연락처</div>

        <input
          type="text"
          value={numInput1}
          onChange={(e) => checkNumber(e, "first")}
          className={styles.number}
        />

        <AiOutlineMinus className={styles.minus} />
        <input
          type="text"
          value={numInput2}
          onChange={(e) => checkNumber(e, "second")}
          className={styles.number}
        ></input>
        <AiOutlineMinus className={styles.minus} />
        <input
          type="text"
          value={numInput3}
          onChange={(e) => checkNumber(e, "last")}
          className={styles.number}
        ></input>
      </div>
      <div className={styles.checkBoxContainer}>
        <input
          type="checkbox"
          value={defaultAddress}
          className={styles.checkbox}
          onChange={(e) => checkAddress(e)}
        />
        <div className={styles.checkBoxRight}>기본 배송지로 설정</div>
      </div>
      <div className={styles.requestBox} onClick={showRequestBox}>
        {request} <IoIosArrowDown className={styles.down} />
      </div>
      <div className={styles.test}>
        {" "}
        {showRequest &&
          requestArr.map((item, index) => (
            <div
              className={styles.request}
              onClick={() => clickRequest(item)}
              key={index}
            >
              {item}
            </div>
          ))}
      </div>
      {showTextArea && (
        <textarea
          value={textArea}
          onChange={(e) => checkTextLength(e)}
          className={styles.textArea}
          placeholder="내용을 입력해주세요.(최대 50자)"
        ></textarea>
      )}
      <div></div>
    </div>
  );
};

export default AddShip;
