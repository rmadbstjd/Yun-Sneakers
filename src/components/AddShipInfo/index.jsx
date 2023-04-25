import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { IoIosArrowDown } from "react-icons/io";
import PopupPostCode from "../PostPopUp/PopupPostCode";
import PopupDom from "../PostPopUp/PopupDom";
import userInfoStore from "../../store/userInfoStore";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineMinus } from "react-icons/ai";
const AddShip = ({ type, setDefaultAddress }) => {
  const { data: address } = useQuery(["address"], () =>
    myPage.getUserAddress()
  );

  let regex;
  const {
    myPage,
    shipPlaceName,
    setShipPlaceName,
    shipReceiver,
    setShipReceiver,
    shipPostCode,
    setShipPostCode,
    shipAddress,
    setShipAddress,
    phoneNumInput1,
    phoneNumInput2,
    phoneNumInput3,
    setPhoneNumInput1,
    setPhoneNumInput2,
    setPhoneNumInput3,
    defaultAddress,
    shipAddressDetail,
    setShipAddressDetail,
  } = userInfoStore();

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
      setPhoneNumInput1(onlyNumber);
    } else if (place === "second") {
      if (onlyNumber.length >= 5) return;
      setPhoneNumInput2(onlyNumber);
    } else if (place === "last") {
      if (onlyNumber.length >= 5) return;
      setPhoneNumInput3(onlyNumber);
    }
  };
  const checkTextLength = (e) => {
    const { value } = e.target;
    if (value.length >= 51) return;
    setTextArea(value);
  };
  const checkAddress = async () => {
    await myPage.addUserAddress(
      shipPlaceName,
      shipReceiver,
      shipPostCode,
      shipAddress,
      shipAddressDetail,
      phoneNumInput1,
      phoneNumInput2,
      phoneNumInput3
    );
  };

  useEffect(() => {
    if (address) {
      setShipPlaceName(address[0].place);
      setShipReceiver(address[0].receiver);
      setPhoneNumInput1(address[0].phoneNumber1);
      setPhoneNumInput2(address[0].phoneNumber2);
      setPhoneNumInput3(address[0].phoneNumber3);
      setShipAddress(address[0].address);
      setShipAddressDetail(address[0].addressDetail);
      setShipPostCode(address[0].postCode);
    }
  }, [address]);
  return (
    <Style.Container>
      <Style.Content>
        <Style.Item>배송지명</Style.Item>
        <Style.DeliveryAddress
          type="text"
          maxLength={10}
          value={shipPlaceName}
          onChange={(e) => changeText(e, "shipPlaceName")}
        ></Style.DeliveryAddress>
      </Style.Content>
      <Style.Content>
        <Style.Item>수령인</Style.Item>
        <Style.DeliveryAddress
          type="text"
          maxLength={10}
          value={shipReceiver}
          onChange={(e) => changeText(e, "shipReceiver")}
        ></Style.DeliveryAddress>
      </Style.Content>
      <Style.AddressContainer>
        <Style.AddressItem>배송지</Style.AddressItem>
        <Style.SearchContainer>
          <Style.Search>
            <Style.AddressNumber>{shipPostCode}</Style.AddressNumber>
            <Style.SearchBtn onClick={() => setIsPopupOpen((prev) => !prev)}>
              우편 번호 검색
            </Style.SearchBtn>
          </Style.Search>
          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode onClose={closePostCode} type={type} />
              </PopupDom>
            )}
          </div>
          <Style.AddressInfo>{shipAddress}</Style.AddressInfo>
          <Style.MoreInfo
            type="text"
            placeholder="상세 주소 입력"
            value={shipAddressDetail}
            onChange={(e) => setShipAddressDetail(e.target.value)}
          ></Style.MoreInfo>
        </Style.SearchContainer>
      </Style.AddressContainer>
      <Style.PhoneNumberContainer>
        <Style.Item>연락처</Style.Item>

        <Style.Number
          type="text"
          value={phoneNumInput1}
          onChange={(e) => checkNumber(e, "first")}
        />

        <AiOutlineMinus
          style={{ width: "15px", height: "15px", margin: "10px 1px 0px 3px" }}
        />
        <Style.Number
          type="text"
          value={phoneNumInput2}
          onChange={(e) => checkNumber(e, "second")}
        ></Style.Number>
        <AiOutlineMinus
          style={{ width: "15px", height: "15px", margin: "10px 1px 0px 3px" }}
        />
        <Style.Number
          type="text"
          value={phoneNumInput3}
          onChange={(e) => checkNumber(e, "last")}
        ></Style.Number>
      </Style.PhoneNumberContainer>
      {setDefaultAddress && (
        <Style.CheckBoxContainer>
          <Style.CheckBox
            margin={"2 0px"}
            type="checkbox"
            value={defaultAddress}
            onChange={(e) => checkAddress(e)}
          />
          <Style.CheckBoxRight>기본 배송지로 설정</Style.CheckBoxRight>
        </Style.CheckBoxContainer>
      )}
      <Style.RequestBox onClick={showRequestBox}>
        {request} <IoIosArrowDown style={{ margin: "10px 10px 0px 0px" }} />
      </Style.RequestBox>
      <Style.RequestContainer>
        {" "}
        {showRequest &&
          requestArr.map((item) => (
            <Style.Request onClick={() => clickRequest(item)} key={item}>
              {item}
            </Style.Request>
          ))}
      </Style.RequestContainer>
      {showTextArea && (
        <>
          <Style.TextArea
            value={textArea}
            onChange={(e) => checkTextLength(e)}
            placeholder="내용을 입력해주세요.(최대 50자)"
          ></Style.TextArea>
          <Style.LetterCount>{textArea.length}/50</Style.LetterCount>
        </>
      )}

      <div></div>
    </Style.Container>
  );
};

export default AddShip;
